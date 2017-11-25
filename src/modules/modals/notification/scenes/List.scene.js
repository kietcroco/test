import React from 'react';
import { View, Text, ListView, RefreshControl, InteractionManager, Linking } from 'react-native';
import { translate, setCurrentLanguage } from '~/utilities/language';
import ListMessage from '../components/ListMessage';
import { NavigationActions } from 'react-navigation';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import RowItem from '../components/RowItem';
import alertUtil from '~/utilities/alert';
import getNavigateActionFromUrl from '~/utilities/getNavigateActionFromUrl';
import { colors, sizes } from '~/configs/styles';
import Registry from '~/library/Registry';
import notificationTracker from '~/services/notification/tracker';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends React.PureComponent {

	static displayName = '@ListNotification';

	constructor( props ) {
		super( props );
	}

	componentWillReceiveProps(nextProps) {

		// if (!nextProps.token || !Registry.get("notificationToken")) {

		// 	return nextProps.navigation.goBack();
		// }

		const { state: { params = {} } } = this.props.navigation;
		const { state: { params: nextParams = {} }, scene: { isActive = true } = {} } = nextProps.navigation;

		const {
			refreshing,
			data
		} = nextProps.reducers;

		// nếu đổi điều kiện search thì init lại
		if( 
			this.props.currentLanguage !== nextProps.currentLanguage ||
			this.props.token !== nextProps.token ||
			(
				isActive && 
				!refreshing && 
				data[ data.length - 1 ] !== "loading" && 
				!recursiveShallowEqual(params, nextParams) 
			)
		) {

			this.props.actions.fetchData(nextParams, "init");
		}

		// nếu có thông báo
		if( nextProps.reducers.message ) {

			alertUtil({
				title: nextProps.reducers.messageTitle || translate("Cảnh báo"),
				message: nextProps.reducers.message,
				actions: [
					{
						text: 'OK', 
						onPress: nextProps.reducers.messageHandle || (() => {}), style: 'cancel'
					}
				]
			});
		}
	}

	_renderRow = (rowData, sectionID, rowID, highlightRow) => {

		// message row
		if( typeof rowData === 'string' ) {

			return (
				<ListMessage messageType={ rowData }/>
			);
		}

		return (
			<RowItem onPress={ async () => {
				if( !rowData ) return;

				if( rowData.onesignal_id ) {

					try {

					 	await notificationTracker.opened( rowData.onesignal_id );
					} catch(e) {}
				}

				try {

					// lấy thông báo
			 		const res = await notificationTracker.get({
			 			notification_id: rowData.onesignal_id
			 		});

			 		// dispatch qua list thông báo
			 		if( res.status == 200 && res.data && res.data.data ) {

				 		this.props.dispatch({
							type: "/notification/list#update",
							payload: {
								data: res.data.data
							}
						});
			 		}
				} catch(e) {}

				if( rowData.link ) {

					this._handleOpenURL( rowData.link );
				}
				// this.props.navigation.navigate(`/List${getDetailRouteName( rowData.exchanges )}`, {
				// 	source: rowData,
				// 	id: rowData.id
				// });
			} } key={`ListNotification-List-${sectionID}-${rowID}`} source={ rowData || {} }/>
		);
	};

	render() {

		return (

			<ListView 
				ref 							= { ref => ( this.listView = ref ) }
				dataSource 						= { dataSource.cloneWithRows( this.props.reducers.data ) }
				renderRow 						= { this._renderRow }
				horizontal 						= { false }
				refreshing 						= { this.props.reducers.refreshing }
				onRefresh 						= { this._onRefresh }
				pageSize 						= { 10 }
				initialListSize 				= { 10 }
				onEndReachedThreshold 			= { 50 }
				onEndReached 					= { this._onEndReached }
				//scrollRenderAheadDistance 		= { 0 }
				enableEmptySections 			= { true }
				keyboardDismissMode 			= "interactive"
				keyboardShouldPersistTaps 		= "always"
				showsHorizontalScrollIndicator 	= { false }
				showsVerticalScrollIndicator 	= { true }
				directionalLockEnabled 			= { true }
				refreshControl 					= { 
					<RefreshControl
						refreshing 		= { this.props.reducers.refreshing }
						onRefresh 		= { this._onRefresh }
						colors 			= { _styles.refreshColor }
					/>
				}
				style 							= { _styles.listView }
			/>
		);
	}

	componentDidMount() {

		// if ( !this.props.token || !Registry.get("notificationToken") ) {

		// 	return this.props.navigation.goBack();
		// }

		if( !Registry.get("notificationPlayerID") ) {

			return this.props.navigation.goBack();
		}

		InteractionManager.runAfterInteractions(() => {
			const { state: { params = {} } } = this.props.navigation;

			this.props.actions.fetchData(params, "init");
			notificationTracker.resetUnread();

			if( !this.props.token ) {

				Registry.delete('unreadNotification');
			}
			//Registry.delete('unreadNotification');
			// setTimeout( () => {

			// 	notificationTracker.getUnread();
			// } );
		});

	}

	componentDidUpdate() {

		const { scene: { isActive = false } = {} } = this.props.navigation;
		if( !isActive ) {

			return;
		}

		const {
			refreshing,
			data = []
		} = this.props.reducers;

		if( !refreshing && data.length && Registry.get('unreadNotification') ) {

			try {

				if( this.requestResetUnread ) {

					this.requestResetUnread.abort();
				}
				this.requestResetUnread = notificationTracker.resetUnread();

			} catch(e) {}
		}

		if( !refreshing && data && typeof data[ data.length - 1 ] === "string" ) {

			setTimeout( () => this.listView && this.listView.scrollToEnd({animated: true}), 0);
		} else if( refreshing ) {

			setTimeout( () => this.listView && this.listView.scrollTo({x: 0, y: 0, animated: false}), 0);
		}
	}

	_onEndReached = (e) => {

		const { scene: { isActive = false } = {} } = this.props.navigation;

		if( !isActive ) {

			return;
		}

		const {
			reducers: {
				refreshing,
				data = []
			},
			navigation: {
				state: {
					params = {}
				} = {}
			}
		} = this.props;

		if( !refreshing && e && data[ data.length - 1 ] !== "loading" ) {

			this.props.actions.fetchData(params, "nextPage");
		}
	};

	_onRefresh = () => {

		const { state: { params = {} } } = this.props.navigation;

		this.props.actions.fetchData(params, "init");
	};

	_handleOpenURL = ( url = "" ) => {

		// set ngôn ngữ
		let matchLang = url.match(/\/(en|vi)\//);
		if( matchLang && matchLang.length == 2 && matchLang[1] ) {

			setCurrentLanguage( matchLang[1] );
		}
		const action = getNavigateActionFromUrl( url );
		if( action ) {

			return this.props.dispatch(NavigationActions.navigate( action ));
		}

		Linking.canOpenURL( url ).then( supported => (supported && Linking.openURL(url)) )
								.catch(() => {})
		;
	};
}

const _styles = {
	wrapper: {
		flex: 1,
		marginBottom: sizes.footerHeight
	},
	listView: {
		backgroundColor: colors.primaryBackgroundColor
	},
	refreshColor: colors.refreshColor
};

export default List;
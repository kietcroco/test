import React from 'react';
import { View, Text, ListView, RefreshControl } from 'react-native';
import SearchBar from '../components/SearchBar';
import RowItem from '~/components/RowItem/Rivers';
import getDetailRouteName from '../utilities/getDetailRouteName';
import ListMessage from '../components/ListMessage';
import _styles from '../assets/listStyles';
import mixins from '../mixins';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import alertUtil from '~/utilities/alert';
import { translate } from '~/utilities/language';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Rivers extends React.PureComponent {

	static displayName = '@ListRivers';

	constructor( props ) {
		super( props );
		mixins(this);

		this._renderRow = this._renderRow.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		const { state: { params = {} } } = this.props.navigation;
		const { state: { params: nextParams = {} }, scene: { isActive = true } = {} } = nextProps.navigation;

		const {
			refreshing,
			data
		} = nextProps.reducers;

		// nếu đổi điều kiện search thì init lại
		if( 
			this.props.currentLanguage !== nextProps.currentLanguage ||
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

	_renderRow(rowData, sectionID, rowID, highlightRow) {
		// message row
		if( typeof rowData === 'string' ) {

			return (
				<ListMessage messageType={ rowData }/>
			);
		}

		return (
			<RowItem onPress={ () => {
				this.props.navigation.navigate(`/rivers${getDetailRouteName( rowData.exchanges )}`, {
					source: rowData,
					id: rowData.id
				});
			} } key={`ListItem-Rivers-${sectionID}-${rowID}`} source={ rowData }/>
		);
	}

	render() {

		return (

			<View style={_styles.wrapper}>
				<SearchBar navigation={ this.props.navigation } />
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
			</View>
		);
	}
}

export default Rivers;
"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { ListView, InteractionManager, RefreshControl } from 'react-native';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import _styles from '../../assets/listStyles';
import alertUtil from '~/utilities/alert';

class ListItem extends React.Component {

	static displayName = "@ListItem";

	static propTypes = {
		exchange: PropTypes.oneOf([
			"rivers",
			"roads",
			"seas"
		])
	};

	static defaultProps = {
		exchange: "rivers"
	};

	constructor( props ) {
		super( props );

		this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		switch ( props.exchange ) {
			case "seas":
				
				this._renderRow = require('./mixins/renderRowSea').default.bind(this);
				break;
			case "roads":

				this._renderRow = require('./mixins/renderRowRoad').default.bind(this);
				break;
			case "rivers":
			default:

				this._renderRow = require('./mixins/renderRowRiver').default.bind(this);
				break;
		}
	}

	componentWillReceiveProps( nextProps ) {

		const { state: { params = {} } } = this.props.navigation;
		const { state: { params: nextParams = {} }, scene: { isActive = true } = {} } = nextProps.navigation;

		const {
			refreshing,
			data
		} = nextProps.reducers;

		// nếu đổi điều kiện search thì init lại
		if (
			this.props.currentLanguage !== nextProps.currentLanguage ||
			(
				isActive &&
				!refreshing &&
				data[data.length - 1] !== "loading" &&
				!recursiveShallowEqual(params, nextParams)
			)
		) {
			this.props.actions.fetchData(JSON.parse(JSON.stringify(nextParams)), "init");
		}

		// nếu có thông báo
		if (nextProps.reducers.message) {

			alertUtil({
				title: nextProps.reducers.messageTitle || (nextProps.exchange == "seas" ? translate("#$seas$#Cảnh báo") : translate("Cảnh báo")),
				message: nextProps.reducers.message,
				actions: [
					{
						text: 'OK',
						onPress: nextProps.reducers.messageHandle || (() => { }), style: 'cancel'
					}
				]
			});
		}
	}

	// shouldComponentUpdate( nextProps, nextState ) {
		
	// 	return true;
	// }

	render() {
		
		return (
			<ListView
				ref                            = {ref => (this.listView = ref)}
				dataSource                     = {this.dataSource.cloneWithRows(this.props.reducers.data)}
				renderRow                      = {this._renderRow}
				horizontal                     = {false}
				refreshing                     = {this.props.reducers.refreshing}
				onRefresh                      = {this._onRefresh}
				pageSize                       = {10}
				initialListSize                = {10}
				onEndReachedThreshold          = {50}
				onEndReached                   = {this._onEndReached}
				scrollRenderAheadDistance      = { 0 }
				enableEmptySections            = {true}
				keyboardDismissMode            = "interactive"
				keyboardShouldPersistTaps      = "always"
				showsHorizontalScrollIndicator = {false}
				showsVerticalScrollIndicator   = {true}
				directionalLockEnabled         = {true}
				refreshControl                 = {
					<RefreshControl
						refreshing = {this.props.reducers.refreshing}
						onRefresh  = {this._onRefresh}
						colors     = {_styles.refreshColor}
					/>
				}
				style                          = {_styles.listView}
			/>
		);
	}

	componentDidMount() {

		InteractionManager.runAfterInteractions(() => {
			const { state: { params = {} } } = this.props.navigation;

			this.props.actions.fetchData(JSON.parse(JSON.stringify(params)), "init");
		});
	}

	componentDidUpdate() {

		const { scene: { isActive = false } = {} } = this.props.navigation;
		if (!isActive) {

			return;
		}

		const {
			refreshing,
			data = []
		} = this.props.reducers;

		if (!refreshing && data && typeof data[data.length - 1] === "string") {

			setTimeout(() => this.listView && this.listView.scrollToEnd({ animated: true }), 0);
		} else if (refreshing) {

			setTimeout(() => this.listView && this.listView.scrollTo({ x: 0, y: 0, animated: false }), 0);
		}
	}

	_onRefresh = () => {

		const { state: { params = {} } } = this.props.navigation;
		this.props.actions.fetchData(JSON.parse(JSON.stringify(params)), "init");
	};

	_onEndReached = e => {

		const { scene: { isActive = false } = {} } = this.props.navigation;

		if (!isActive) {

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

		if (!refreshing && e && data[data.length - 1] !== "loading") {

			this.props.actions.fetchData(JSON.parse(JSON.stringify(params)), "nextPage");
		}
	};
}

export default ListItem;
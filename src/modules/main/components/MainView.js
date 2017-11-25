"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, Text } from 'react-native';
import SearchBar from './SearchBar';
import _styles from '../assets/listStyles';
import { TabViewAnimated } from 'react-native-tab-view';
import ListItem from './ListItem';
import FilterTab from './FilterTab';
import { sizes, hitSlop, colors } from '~/configs/styles';
import { translate } from '~/utilities/language';
import shallowEqual from 'fbjs/lib/shallowEqual';

const activeRouteName = `/member/active`;

class MainView extends React.Component {

    static displayName = "@MainView";

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

        this.state = {
            navigationFilter: {
                index: 0,
                routes: [
                    { key: 'list' },
                    { key: 'filter' },
                ]
            }
        };
    }

    // componentWillReceiveProps( nextProps ) {

    // }

    // shouldComponentUpdate( nextProps, nextState ) {
        
    //     return true;
    // }

    render() {

        return (
            <Animated.View style={{
                flex: 1,
                marginBottom: _styles.footerMarginAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, sizes.footerHeight]
                })
            }}>
                <SearchBar
                    navigation    = {this.props.navigation}
                    //onPressFilter = {this._onPressFilter}
                    filterActive  = {!!this.state.navigationFilter.index || this._isSearching()}
                />

                {
                    !!this.props.authIdentityUnActive &&
                        <TouchableOpacity onPress={this._activeOnPress} style={_styles.activeBanner} hitSlop={hitSlop} activeOpacity={colors.activeOpacity}>
                            <Text style={_styles.activeText}>{translate("Click vào đây để kích hoạt tài khoản")}</Text>
                        </TouchableOpacity>
                }

                <TabViewAnimated
                    {...this.props.reducers}
                    {...this.props.navigation.state}
                    {...this.props.navigation.state.params}
                    ref                = {ref => this.tabViewAnimated = ref }
                    navigationState    = {this.state.navigationFilter}
                    renderScene        = {this._renderScene}
                    //renderHeader     = {this._renderHeader}
                    onIndexChange      = {this._handleIndexChange}
                    onRequestChangeTab = {this._handleIndexChange}
                    lazy
                    useNativeDriver
                    swipeEnabled       = {false}
                />
            </Animated.View>
        );
    }

    componentWillMount() {

        let value = this.state.navigationFilter.index ? 0 : 1;
        _styles.footerMarginAnim.setValue(value);
        _styles.actionButtonScaleAnim.setValue(value);
    }

    componentDidUpdate() {

        setTimeout( () => {

            let value = this.state.navigationFilter.index ? 0 : 1;
            _styles.footerMarginAnim.setValue(value);
            _styles.actionButtonScaleAnim.setValue(value);
        } );
    }

    _isSearching = () => {
        
        const {
            state: {
                params: {
                    Exchange,
                    type,
                    areasArr,
                    ...otherParams
                } = {}
            } = {}
        } = this.props.navigation;

        let otherKeys = Object.keys(otherParams);

        return !!(otherKeys.length && !otherKeys.every( key => {

            return !otherParams[key] && otherParams[key] !== 0;
        } ));
    };

    // sự kiện submit form filter
    _filterOnSubmit = (nextParams) => {

        const {
            state: {
                params: {
                    Exchange,
                    type,
                    areasArr,
                    ...prevParams
                } = {}
            } = {}
        } = this.props.navigation;
        
        this.setState({
            navigationFilter: {
                ...this.state.navigationFilter,
                index: this.state.navigationFilter.index ? 0 : 1
            }
        }, () => {

            if (!shallowEqual(prevParams, nextParams)) {
                //this.props.actions.fetchData(nextParams, "init");

                this.props.navigation.setParams(nextParams);
            }
        });
    };

    // sự kiện nhấn vào nút filter
    _onPressFilter = () => {

        this.setState({
            navigationFilter: {
                ...this.state.navigationFilter,
                index: this.state.navigationFilter.index ? 0 : 1
            }
        });
    };

    // sự kiện đổi tab
    _handleIndexChange = index => this.setState({
        navigationFilter: {
            ...this.state.navigationFilter,
            index
        }
    });

    // render tab list và tab filter
    _renderScene = props => {

        if (props.route.key != "list") {

            return (
                <FilterTab
                    {...this.props}
                    //ref      = {ref => this.filterTab = ref}
                    //exchange = "rivers"
                    onSubmit   = {this._filterOnSubmit}
                    focused    = {props.focused}
                />
            );
        }

        return (
            <ListItem
                {...this.props}
                //ref      = {ref => this.listItem = ref}
                //exchange = "rivers"
                focused    = {props.focused}
            />
        );
    };

    _activeOnPress = () => {

        if (this.props.authIdentityUnActive && this.props.authIdentityUnActive.account_mobile) {

            this.props.navigation.navigate(activeRouteName, {
                account_mobile: this.props.authIdentityUnActive.account_mobile
            });
        }
    };
}



export default MainView;
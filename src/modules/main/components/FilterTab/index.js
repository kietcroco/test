import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import SearchInput from '../SearchInput';
import RiverFilter from './Rivers';
import RoadFilter from './Roads';
import SeasFilter from './Seas';
import { colors, sizes, scale, fontSizes } from '~/configs/styles';
import { translate } from '~/utilities/language';
//import shallowEqual from 'fbjs/lib/shallowEqual';

class FilterTab extends React.Component {

    static displayName = "@FilterTab";

    static propTypes = {
        exchange: PropTypes.oneOf([
            "rivers",
            "roads",
            "seas"
        ]),
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        exchange: "rivers"
    };

    constructor( props ) {
        super( props );

        this.state = {
            q: ""
        };
    }

    getSubmitValue = () => {

        return {
            ...this.formFilter.getSubmitValue(),
            q: this.state.q || undefined
        };
    };

    componentWillReceiveProps(nextProps) {

        const {
            state: {
                params: {
                    q: query,
                    Exchange
                } = {}
            } = {}
        } = this.props.navigation;

        const {
            state: {
                params: {
                    q: nextQuery,
                    Exchange: nextExchange,
                    type,
                    areasArr,
                    ...nextParams
                } = {}
            } = {}
        } = nextProps.navigation;

        if ( Exchange !== nextExchange ) {

            Object.keys(nextParams).forEach(key => {
                
                nextParams[key] = undefined;
            });

            nextProps.navigation.setParams({
                ...nextParams,
                Exchange: nextExchange,
                type,
                areasArr,
                q: undefined
            });
        } else if (query !== nextQuery && this.state.q !== nextQuery) {

            this.setState({
                q: nextQuery
            });
        }
    }

    render() {

        let Component;
        switch ( this.props.exchange ) {
            case "roads":
                
                Component = RoadFilter;
                break;
            case "seas":

                Component = SeasFilter;
                break;
            case "rivers":
            default:
                Component = RiverFilter;
                break;
        }

        return (
            <View style={ _styles.container }>
                <SearchInput
                    placeholder = {this.props.exchange == "seas" ? translate("#$seas$#Nhập từ khoá"): translate("Nhập từ khoá")}
                    value       = {this.state.q}
                    onChangeText= {this._searchOnChangeText}
                />
                <View style={ _styles.content }>
                    <Component 
                        {...this.props}
                        onRef = {ref => (this.formFilter=ref)}
                    />
                </View>
                {
                    !!this.props.token &&
                        <TouchableOpacity onPress={ this._saveOnPress } style={ _styles.btnSave } activeOpacity={colors.activeOpacity}>
                            <Text style={ _styles.lblSave }>{this.props.exchange == "seas" ? translate("#$seas$#Lưu bộ lọc") : translate("Lưu bộ lọc")}</Text>
                        </TouchableOpacity>
                }
                <View style={ _styles.rowAction }>
                    <TouchableOpacity onPress={ this._clearOnPress } activeOpacity={colors.activeOpacity} style={ _styles.btnClear }>
                        <Text style={_styles.lblClear}>{ this.props.exchange == "seas" ? translate("#$seas$#Bỏ chọn") : translate("Bỏ chọn") }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this._applyOnPress } activeOpacity={colors.activeOpacity} style={ _styles.btnApply }>
                        <Text style={_styles.lblApply}>{ this.props.exchange == "seas" ? translate("#$seas$#Bỏ chọn") : translate("Áp dụng")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    componentDidMount() {
        const {
            state: {
                params: {
                    q: query
                } = {}
            } = {}
        } = this.props.navigation;

        if (query !== this.state.q) {

            this.setState({
                q: query
            });
        }
    }

    _searchOnChangeText = (text = "") => {

        this.state.q !== text && this.setState({
            q: text
        });
    };

    _saveOnPress = () => {
        
    };

    _clearOnPress = () => {
        
        if (this.formFilter && this.formFilter.reset) {

            this.formFilter.reset();
        }

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

        this.setState({
            q: undefined
        }, () => {

            Object.keys(otherParams).forEach(key => {

                otherParams[key] = undefined;
            });

            this.props.onSubmit && this.props.onSubmit({
                ...otherParams,
                Exchange,
                type,
                areasArr,
                q: undefined
            });
        });
    };

    _applyOnPress = () => {

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

        const nextParams = this.getSubmitValue();

        //if (!shallowEqual(prevParams, nextParams)) {

            this.props.onSubmit && this.props.onSubmit({
                ...nextParams,
                Exchange,
                type,
                areasArr,
                q: this.state.q
            });
        //}
    };
}

const _styles = {
    container: {
        flex: 1,
        // paddingHorizontal: sizes.margin,
        // paddingVertical: sizes.margin,
        padding: sizes.margin
    },
    rowAction: {
        flexDirection: "row",
        height: 40 * scale
    },
    content: {
        flex: 1,
        marginVertical: sizes.margin
    },
    btnClear: {
        flex: 1,
        backgroundColor: colors.secondBackgroundColor,
        alignItems: "center",
        justifyContent: "center"
    },
    btnApply: {
        flex: 1,
        backgroundColor: colors.activeColor,
        alignItems: "center",
        justifyContent: "center"
    },
    lblClear: {
        fontSize: fontSizes.normal,
        color: colors.boldColor
    },
    lblApply: {
        color: colors.secondColor,
        fontSize: fontSizes.normal 
    },
    btnSave: {
        width: "50%",
        height: 40 * scale,
        backgroundColor: colors.primaryColor,
        borderRadius: 20 * scale,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15 * scale,
        marginVertical: sizes.spacing,
        alignSelf: "center"
    },
    lblSave: {
        color: colors.secondColor,
        fontSize: fontSizes.normal
    }
};

export default FilterTab;
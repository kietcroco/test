"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import SliderFilter from '../components/Slider';
import PriceFilter from '../components/Price';
import PurchaseScope from '../components/PurchaseScope';
import YearBuiltFilter from '../components/YearBuilt';
import shallowEqual from 'fbjs/lib/shallowEqual';
import moment from 'moment/min/moment-with-locales';

class PurchaseFilter extends React.Component {

    static displayName = "@PurchaseFilter";

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            weight: undefined,
            year_built: undefined,
            price: undefined,
            price_discuss: undefined,
            scope: undefined
        };
    }

    reset = () => {

        this.setState({
            weight: undefined,
            year_built: undefined,
            price: undefined,
            price_discuss: undefined,
            scope: undefined
        });
    };

    getSubmitValue = () => {

        return {
            ...this.state,
            weight: this.state.weight || undefined,
            price: this.state.price || undefined,
            price_discuss: this.state.price_discuss || undefined
        };
    };

    componentWillReceiveProps(nextProps) {

        const {
            state: {
                params: {
                    Exchange: ex,
                    areasArr: ar,
                    type: t,
                    ...params
                } = {}
            } = {}
        } = this.props.navigation;

        const {
            state: {
                params: {
                    Exchange: exN,
                    areasArr: arN,
                    type: tN,
                    ...nextParams
                } = {}
            } = {}
        } = nextProps.navigation;

        if (!shallowEqual(params, nextParams)) {

            this.setState({
                ...nextParams
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return (
            !shallowEqual(this.state, nextState)
        );
    }

    render() {

        return (
            <ScrollView
                keyboardDismissMode            = "interactive"
                keyboardShouldPersistTaps      = "always"
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator   = {true}
                directionalLockEnabled         = {true}
                style                          = {_styles.scrollView}
            >
                <PurchaseScope
                    label         = {`${translate("Mua/ Bán")}: `}
                    sellLabel     = {translate("Bán")}
                    buyLabel      = {translate("Mua")}
                    value         = {this.state.scope}
                    onValueChange = {this._scopeOnValueChange}
                />

                <SliderFilter
                    label         = {`${translate("Trọng tải")}: `}
                    step          = {1}
                    maximumValue  = {1000}
                    value         = {this.state.weight}
                    onValueChange = {this._weightOnValueChange}
                    unit          = {translate("tấn")}
                />

                <YearBuiltFilter
                    label         = {`${translate("Năm đóng")}: `}
                    step          = {1}
                    //maximumValue  = {1000}
                    value         = {this.state.year_built}
                    onValueChange = {this._yearBuiltOnValueChange}
                    unit          = ""
                />

                <PriceFilter
                    label={`${translate("Giá cước")}: `}
                    step={100000}
                    maximumValue={900000000000}
                    value={this.state.price}
                    onValueChange={this._priceOnValueChange}
                    unit={translate("vnd")}
                    discuss={this.state.price_discuss == 1}
                    discussLabel={translate("Thoả thuận")}
                    onCheckChange={this._priceOnCheckChange}
                />

            </ScrollView>
        );
    }

    componentDidMount() {

        const {
            state: {
                params: {
                    Exchange: exN,
                    areasArr: arN,
                    type: tN,
                    ...nextParams
                } = {}
            } = {}
        } = this.props.navigation;

        this.setState({
            ...nextParams
        });
    }

    // sự kiện thay đổi loại mua, bán
    _scopeOnValueChange = (value) => {

        this.state.scope !== value && this.setState({
            scope: value
        });
    };

    // sự kiện thay đổi khối lượng
    _weightOnValueChange = (value) => {

        this.state.weight !== value && this.setState({
            weight: value
        });
    };

    _yearBuiltOnValueChange = (value) => {

        this.state.year_built !== value && this.setState({
            year_built: value
        });
    };

    // sự kiện giá
    _priceOnValueChange = (value) => {

        this.state.price !== value && this.setState({
            price: value
        });
    };

    // sự kiện chọn giá thoả thuận
    _priceOnCheckChange = (checked) => {

        this.setState({
            price_discuss: checked ? 1 : 0
        });
    };
}

const _styles = {
    scrollView: {
        flex: 1
    }
};

export default PurchaseFilter;
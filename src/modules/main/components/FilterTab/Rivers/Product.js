"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import SliderFilter from '../components/Slider';
import DateTimeFromTo from '../components/DateTimeFromTo';
import PriceFilter from '../components/Price';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import shallowEqual from 'fbjs/lib/shallowEqual';
import moment from 'moment/min/moment-with-locales';
import escapeNumberFormat from '~/utilities/escapeNumberFormat';

class ProductFilter extends React.Component {

    static displayName = "@ProductFilter";

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor( props ) {
        super( props );

        this.state = {
            weight: undefined,
            time_from: undefined,
            time_to: undefined,
            price: undefined,
            price_discuss: undefined
        };
    }

    reset = () => {
        
        this.setState({
            weight: undefined,
            time_from: undefined,
            time_to: undefined,
            price: undefined,
            price_discuss: undefined
        });
    };

    getSubmitValue = () => {

        let time_from = this.state.time_from && dateTimeFormat(this.state.time_from);
        let time_to = this.state.time_to && dateTimeFormat(this.state.time_to);

        return {
            ...this.state,
            time_from,
            time_to,
            price: this.state.price || undefined,
            weight: this.state.weight || undefined,
            price_discuss: this.state.price_discuss || undefined
        };
    };

    componentWillReceiveProps( nextProps ) {

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

            const {
                time_from,
                time_to
            } = nextParams;

            this.setState({
                ...nextParams,
                time_from: time_from ? moment(time_from, "DD/MM/YYYY").toDate() : undefined,
                time_to: time_to ? moment(time_to, "DD/MM/YYYY").toDate() : undefined
            });
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        
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
                style                          = { _styles.scrollView }
            >
                <SliderFilter
                    label         = {`${translate("Khối lượng hàng")}: `}
                    step          = {1}
                    maximumValue  = {1000}
                    value         = {this.state.weight}
                    onValueChange = {this._weightOnValueChange}
                    unit          = {translate("tấn")}
                />

                <DateTimeFromTo 
                    label            = {`${translate("Thời gian xếp hàng")}: `}
                    fromValue        = {this.state.time_from}
                    toValue          = {this.state.time_to}
                    fromOnDateChange = {this._timeFromOnDateChange}
                    toOnDateChange   = {this._timeToOnDateChange}
                />

                <PriceFilter
                    label         = {`${translate("Giá cước")}: `}
                    step          = {100000}
                    maximumValue  = {900000000000}
                    value         = {this.state.price}
                    onValueChange = {this._priceOnValueChange}
                    unit          = {translate("vnd")}
                    discuss       = {this.state.price_discuss == 1 }
                    discussLabel  = {translate("Thoả thuận")}
                    onCheckChange = {this._priceOnCheckChange}
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

        const {
            time_from,
            time_to
        } = nextParams;

        this.setState({
            ...nextParams,
            time_from: time_from ? moment(time_from, "DD/MM/YYYY").toDate() : undefined,
            time_to: time_to ? moment(time_to, "DD/MM/YYYY").toDate() : undefined
        });
    }

    // sự kiện thay đổi khối lượng
    _weightOnValueChange = (value) => {

        this.state.weight !== value && this.setState({
            weight: value
        });
    };

    // sự kiện thay đổi ngày xếp hàng từ
    _timeFromOnDateChange = ( value ) => { 
        
        this.state.time_from !== value && this.setState({
            time_from: value
        });
    };

    // sự kiện thay đổi ngày xếp hàng đến
    _timeToOnDateChange = ( value ) => {

        this.state.time_to !== value && this.setState({
            time_to: value
        });
    };

    // sự kiện giá
    _priceOnValueChange = ( value ) => {

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

export default ProductFilter;
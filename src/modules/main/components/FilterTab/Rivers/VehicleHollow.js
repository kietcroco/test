"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import SliderFilter from '../components/Slider';
import DateTimeFromTo from '../components/DateTimeFromTo';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import shallowEqual from 'fbjs/lib/shallowEqual';
import moment from 'moment/min/moment-with-locales';

class VehicleHollowFilter extends React.Component {

    static displayName = "@VehicleHollowFilter";

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            weight: undefined,
            time_from: undefined,
            time_to: undefined
        };
    }

    reset = () => {

        this.setState({
            weight: undefined,
            time_from: undefined,
            time_to: undefined
        });
    };

    getSubmitValue = () => {

        let time_from = this.state.time_from && dateTimeFormat(this.state.time_from);
        let time_to = this.state.time_to && dateTimeFormat(this.state.time_to);

        return {
            ...this.state,
            time_from,
            time_to,
            weight: this.state.weight || undefined
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
                
                <SliderFilter
                    label         = {`${translate("Trọng tải")}: `}
                    step          = {1}
                    maximumValue  = {1000}
                    value         = {this.state.weight}
                    onValueChange = {this._weightOnValueChange}
                    unit          = {translate("tấn")}
                />

                <DateTimeFromTo
                    label            = {`${translate("Thời gian xuất phát")}: `}
                    fromValue        = {this.state.time_from}
                    toValue          = {this.state.time_to}
                    fromOnDateChange = {this._timeFromOnDateChange}
                    toOnDateChange   = {this._timeToOnDateChange}
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

    // khối lượng
    _weightOnValueChange = (value) => {

        this.state.weight !== value && this.setState({
            weight: value
        });
    };

    // sự kiện thay đổi ngày xuất phát
    _timeFromOnDateChange = (value) => {

        this.state.time_from !== value && this.setState({
            time_from: value
        });
    };

    // sự kiện thay đổi ngày xuất phát
    _timeToOnDateChange = (value) => {

        this.state.time_to !== value && this.setState({
            time_to: value
        });
    };
}

const _styles = {
    scrollView: {
        flex: 1
    }
};

export default VehicleHollowFilter;
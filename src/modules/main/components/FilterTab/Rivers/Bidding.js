"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import DateTimeFromTo from '../components/DateTimeFromTo';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import shallowEqual from 'fbjs/lib/shallowEqual';
import moment from 'moment/min/moment-with-locales';

class BiddingFilter extends React.Component {

    static displayName = "@BiddingFilter";

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            time_from: undefined,
            time_to: undefined
        };
    }

    reset = () => {

        this.setState({
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
            time_to
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

                <DateTimeFromTo
                    label            = {`${translate("Ngày bắt đầu thuê")}: `}
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

    // sự kiện thay đổi ngày xếp hàng từ
    _timeFromOnDateChange = (value) => {

        this.state.time_from !== value && this.setState({
            time_from: value
        });
    };

    // sự kiện thay đổi ngày xếp hàng đến
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

export default BiddingFilter;
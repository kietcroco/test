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

class EnterpriseFilter extends React.Component {

    static displayName = "@EnterpriseFilter";

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            vehicle_counter: undefined
        };
    }

    reset = () => {

        this.setState({
            vehicle_counter: undefined
        });
    };

    getSubmitValue = () => {

        return {
            ...this.state,
            vehicle_counter: this.state.vehicle_counter || undefined
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
                <SliderFilter
                    label         = {`${translate("Số phương tiện")}: `}
                    step          = {1}
                    maximumValue  = {1000}
                    value         = {this.state.vehicle_counter}
                    onValueChange = {this._vehicleCounterOnValueChange}
                    unit          = {translate("sà lan")}
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

    // sự kiện thay đổi khối lượng
    _vehicleCounterOnValueChange = (value) => {

        this.state.vehicle_counter !== value && this.setState({
            vehicle_counter: value
        });
    };
}

const _styles = {
    scrollView: {
        flex: 1
    }
};

export default EnterpriseFilter;
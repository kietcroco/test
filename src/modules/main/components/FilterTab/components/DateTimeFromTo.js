"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import TextInput from '~/components/TextInput';
import DatePicker from '~/components/DatePicker';
import { translate } from '~/utilities/language';
import _styles from './styles';
import dateTimeFormat from '~/utilities/dateTimeFormat';
import shallowEqual from 'fbjs/lib/shallowEqual';

const now = new Date();

class DateTimeFilter extends React.Component {

    static displayName = "@DateTimeFilter";

    static propTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        labelFrom: PropTypes.string,
        labelTo: PropTypes.string,
        descriptionFrom: PropTypes.string,
        descriptionTo: PropTypes.string,
        minDate: PropTypes.instanceOf(Date),
        maxDate: PropTypes.instanceOf(Date),
        fromValue: PropTypes.instanceOf(Date),
        toValue: PropTypes.instanceOf(Date),
        fromOnDateChange: PropTypes.func,
        toOnDateChange: PropTypes.func
    };

    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.state = {
            fromVisible: false,
            toVisible: false
        };
    }

    shouldComponentUpdate( nextProps, nextState ) {
        
        return (
            this.state.fromVisible != nextState.fromVisible ||
            this.state.toVisible != nextState.toVisible ||
            !shallowEqual(this.props, nextProps)
        );
    }

    render() {

        const {
            style,
            label,
            labelFrom,
            labelTo,
            placeholderFrom = translate("Chọn"),
            placeholderTo = translate("Chọn"),
            descriptionFrom = translate("Từ"),
            descriptionTo = translate("Đến"),
            fromValue,
            toValue,
            minDate,
            maxDate,
            // fromOnDateChange,
            // toOnDateChange
        } = this.props;

        return (
            <View style={[_styles.container, style]}>
                <Text style={_styles.label}>{label}</Text>
                <View style={_styles.row}>
                    <Text style={_styles.description}>{descriptionFrom}</Text>
                    <TextInput
                        //ref           = "time_earliest"
                        label         = {labelFrom}
                        placeholder   = {placeholderFrom}
                        type          = "select"
                        style         = {_styles.input}
                        returnKeyType = "next"
                        value         = {fromValue && dateTimeFormat(fromValue) || ""}
                        onPress       = {this._fromOnPress}
                    />
                    <DatePicker
                        visible      = {this.state.fromVisible}
                        date         = {fromValue}
                        minDate      = {minDate}
                        maxDate      = {toValue != now ? toValue: maxDate}
                        onDateChange = {this._fromOnnDateChange}
                        onCancel     = {this._onCancel}
                        onError      = {this._onCancel}
                    />
                </View>
                <View style={_styles.row}>
                    <Text style={_styles.description}>{descriptionTo}</Text>
                    <TextInput
                        //ref           = "time_latest"
                        label         = {labelTo}
                        placeholder   = {placeholderTo}
                        type          = "select"
                        style         = {_styles.input}
                        returnKeyType = "next"
                        value         = {toValue && dateTimeFormat(toValue) || ""}
                        onPress       = {this._toOnPress}
                    />
                    <DatePicker
                        visible      = {this.state.toVisible}
                        date         = {toValue}
                        minDate      = {fromValue || undefined}
                        maxDate      = {maxDate}
                        onDateChange = {this._toOnnDateChange}
                        onCancel     = {this._onCancel}
                        onError      = {this._onCancel}
                    />
                </View>
            </View>
        );
    }

    _fromOnnDateChange = (value) => {

        this.setState({
            fromVisible: false
        });
        this.props.fromOnDateChange && this.props.fromOnDateChange(value);
    };

    _toOnnDateChange = (value) => {

        this.setState({
            toVisible: false
        });
        this.props.toOnDateChange && this.props.toOnDateChange(value);
    };

    _fromOnPress = () => {

        !this.state.fromVisible && this.setState({
            fromVisible: true
        });
    };

    _toOnPress = () => {

        !this.state.toVisible && this.setState({
            toVisible: true
        });
    };

    _onCancel = () => {

        this.setState({
            toVisible: false,
            fromVisible: false
        });
    };
}

export default DateTimeFilter;
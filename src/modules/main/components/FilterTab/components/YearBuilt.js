"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native';
import numberFormat from '~/utilities/numberFormat';
import { translate } from '~/utilities/language';
import _styles from './styles';

const yearNow = (new Date()).getFullYear();

class YearBuiltFilter extends React.PureComponent {

    static displayName = "@YearBuiltFilter";

    static propTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        step: PropTypes.number,
        maximumValue: PropTypes.number,
        minimumValue: PropTypes.number,
        value: PropTypes.number,
        unit: PropTypes.string,
        onValueChange: PropTypes.func,
        minimumUnit: PropTypes.string
    };

    static defaultProps = {
        step: 1,
        maximumValue: yearNow + 1,
        value: yearNow + 1,
        minimumValue: 1979
    };

    render() {

        const {
            style,
            label,
            value,
            unit,
            minimumUnit = translate("Trước năm"),
            minimumValue,
            maximumValue,
            //onValueChange,
            ...otherProps
        } = this.props;

        return (
            <View style={[_styles.container, style]}>
                <Text style={_styles.label}>{label} {!!value && value < maximumValue && <Text style={_styles.value}>{value <= minimumValue ? `${minimumUnit} ${minimumValue + 1}` : Math.abs(value)} {unit}</Text>}</Text>
                <Slider
                    {...otherProps}
                    value         = {-(value || maximumValue) }
                    minimumValue  = {-(maximumValue)}
                    maximumValue  = {-(minimumValue)}
                    onValueChange = {this._onValueChange}
                />
            </View>
        );
    }

    _onValueChange = (value) => {

        value = Math.abs(value);
        value = value >= this.props.maximumValue ? undefined : value;
        this.props.onValueChange && this.props.onValueChange(value);
    };
}

export default YearBuiltFilter;
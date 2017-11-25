"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native';
import numberFormat from '~/utilities/numberFormat';
import _styles from './styles';

class SliderFilter extends React.PureComponent {

    static displayName = "@SliderFilter";

    static propTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        step: PropTypes.number,
        maximumValue: PropTypes.number,
        minimumValue: PropTypes.number,
        value: PropTypes.number,
        unit: PropTypes.string,
        onValueChange: PropTypes.func,
        formatNumber: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        minimumFormat: PropTypes.number
    };

    static defaultProps = {
        step: 1,
        maximumValue: 100,
        value: 0,
        formatNumber: "0,0.[00000000000] a",
        minimumFormat: 1000000
    };

    render() {

        const {
            style,
            label,
            value,
            unit,
            formatNumber,
            minimumFormat,
            minimumValue,
            ...otherProps
        } = this.props;

        return (
            <View style={[_styles.container, style]}>
                <Text style={_styles.label}>{label} {!!value && <Text style={_styles.value}>{(formatNumber && value >= minimumFormat) ? numberFormat(value, formatNumber): value} {unit}</Text>}</Text>
                <Slider
                    {...otherProps}
                    value           = {value <= minimumValue ? minimumValue: value}
                    minimumValue    = {minimumValue}
                    // step         = {1}
                    // maximumValue = {100}
                    //onValueChange = {this.change.bind(this)}
                />
            </View>
        );
    }
}

export default SliderFilter;
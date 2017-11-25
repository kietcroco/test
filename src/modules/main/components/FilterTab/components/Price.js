"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider, TouchableOpacity } from 'react-native';
import numberFormat from '~/utilities/numberFormat';
import _styles from './styles';
import CheckBox from '~/components/CheckBox';
import { translate } from '~/utilities/language';

class PriceFilter extends React.PureComponent {

    static displayName = "@PriceFilter";

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
        minimumFormat: PropTypes.number,
        discussLabel: PropTypes.string,
        onCheckChange: PropTypes.func,
        discuss: PropTypes.bool
    };

    static defaultProps = {
        step: 1,
        maximumValue: 1000000000000,
        value: 0,
        formatNumber: "0,0.[0] a",
        minimumFormat: 1000000,
        discuss: false
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
            discussLabel = translate("Thoả thuận"),
            onCheckChange,
            discuss,
            ...otherProps
        } = this.props;

        return (
            <View style={[_styles.container, style]}>
                <Text style={_styles.label}>{label} {!!value && <Text style={_styles.value}>{(formatNumber && value >= minimumFormat) ? numberFormat(value, formatNumber) : value} {unit}</Text>}</Text>
                <Slider
                    {...otherProps}
                    value           = {value <= minimumValue ? minimumValue: value}
                    minimumValue    = {minimumValue}
                    // step         = {1}
                    // maximumValue = {100}
                    //onValueChange = {this.change.bind(this)}
                />
                <TouchableOpacity
                    style   = {_styles.checkboxRow}
                    onPress = {this._discussOnPress}
                >
                    <CheckBox 
                        checked = {discuss}
                    />
                    <Text style={_styles.checkboxLabel}>{discussLabel}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _discussOnPress = () => {

        this.props.onCheckChange && this.props.onCheckChange(!this.props.discuss);
    };
}

export default PriceFilter;
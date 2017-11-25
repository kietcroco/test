"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import TextInput from '~/components/TextInput';
import formatNumberInput from '~/utilities/formatNumberInput';
import { translate } from '~/utilities/language';
import _styles from './styles';

class PriceFilter extends React.PureComponent {

    static displayName = "@PriceFilter";

    static propTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        labelFrom: PropTypes.string,
        labelTo: PropTypes.string,
        descriptionFrom: PropTypes.string,
        descriptionTo: PropTypes.string,
        fromOnChange: PropTypes.func,
        toOnChange: PropTypes.func,
        fromOnChangeText: PropTypes.func,
        toOnChangeText: PropTypes.func,
        fromValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        toValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        maxLength: PropTypes.number
    };

    static defaultProps = {
        fromValue: "",
        toValue: "",
        maxLength: 27
    };

    render() {

        const {
            style,
            label,
            labelFrom,
            labelTo,
            placeholderFrom = translate("(chỉ nhập số nguyên dương)"),
            placeholderTo = translate("(chỉ nhập số nguyên dương)"),
            descriptionFrom = translate("Từ"),
            descriptionTo = translate("Đến"),
            fromValue,
            toValue,
            // fromOnChange,
            // toOnChange,
            // fromOnChangeText,
            // toOnChangeText,
            maxLength
        } = this.props;

        return (
            <View style={[ _styles.container, style ]}>
                <Text style={_styles.label}>{label}</Text>
                <View style={_styles.row}>
                    <Text style={_styles.description}>{descriptionFrom}</Text>
                    <TextInput
                        //ref           = "price_from"
                        label         = {labelFrom}
                        placeholder   = {placeholderFrom}
                        type          = "input"
                        style         = {_styles.input}
                        returnKeyType = "next"
                        value         = {fromValue}
                        onChangeText  = {this._fromOnChangeText}
                        maxLength     = { maxLength }
                    />
                </View>
                <View style={_styles.row}>
                    <Text style={_styles.description}>{descriptionTo}</Text>
                    <TextInput
                        //ref           = "price_to"
                        label         = {labelTo}
                        placeholder   = {placeholderTo}
                        type          = "input"
                        style         = {_styles.input}
                        returnKeyType = "next"
                        value         = {toValue}
                        onChangeText  = {this._toOnChangeText}
                        maxLength     = {maxLength}
                    />
                </View>
            </View>
        );
    }

    _fromOnChangeText = (text = "") => {

        this.props.fromOnChangeText && this.props.fromOnChangeText(text);
        !text.includes("-") && this.props.fromOnChange && this.props.fromOnChange(formatNumberInput(text, "0,0"));
    };

    _toOnChangeText = (text = "") => {

        this.props.toOnChangeText && this.props.toOnChangeText(text);
        !text.includes("-") && this.props.toOnChange && this.props.toOnChange(formatNumberInput(text, "0,0"));
    };
}

export default PriceFilter;
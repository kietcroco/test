"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '~/components/CheckBox';
import { translate } from '~/utilities/language';
import _styles from './styles';

class PurchaseScope extends React.PureComponent {

    static displayName = "@PurchaseScope";

    static propTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        value: PropTypes.oneOf([
            "SELL",
            "BUY",
            null,
            false,
            ""
        ]),
        sellLabel: PropTypes.string,
        buyLabel: PropTypes.string,
        onValueChange: PropTypes.func
    };

    static defaultProps = {
        
    };

    render() {

        const {
            style,
            label = translate("Mua/ Bán"),
            sellLabel = translate("Bán"),
            buyLabel = translate("Mua"),
            value
        } = this.props;

        return (
            <View style={[_styles.container, style]}>
                <Text style={_styles.label}>{label}</Text>
                <TouchableOpacity
                    style   = {_styles.checkboxRow}
                    onPress = {this._sellOnPress}
                >
                    <CheckBox
                        checked = {value == "SELL" || !value}
                    />
                    <Text style={_styles.checkboxLabel}>{sellLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style   = {_styles.checkboxRow}
                    onPress = {this._buyOnPress}
                >
                    <CheckBox
                        checked = {value == "BUY" || !value}
                    />
                    <Text style={_styles.checkboxLabel}>{buyLabel}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _sellOnPress = () => {

        let value = undefined;

        if (!this.props.value || this.props.value == "SELL") {

            value = "BUY";
        }
        this.props.onValueChange && this.props.onValueChange(value);
    };

    _buyOnPress = () => {

        let value = undefined;

        if (!this.props.value || this.props.value == "BUY") {

            value = "SELL";
        }
        this.props.onValueChange && this.props.onValueChange(value);
    };
}

export default PurchaseScope;
"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { scale } from '~/configs/styles';
import { translate } from '~/utilities/language';

class SwitchOptions extends React.Component {

    static displayName = "@switch-options";

    static propTypes = {
        // children: PropTypes.oneOfType([
        //     PropTypes.element,
        //     PropTypes.arrayOf(PropTypes.element)
        // ]),
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        value: PropTypes.bool,
        onChange : PropTypes.func,
        labelLeft: PropTypes.string,
        labelRight: PropTypes.string
    };

    static defaultProps = {
        labelLeft: translate("Bán"),
        labelRight: translate("Mua")
    };

    shouldComponentUpdate(nextProps) {

		return (
            this.props.value !== nextProps.value ||
            this.props.labelLeft !== nextProps.labelLeft ||
            this.props.labelRight !== nextProps.labelRight ||
            this.props.onChange != nextProps.onChange
        );
	}

    render() {

        const {
           // children,
            style,
            value,
            onChange,
            labelLeft,
            labelRight
		} = this.props;

        let valueOpt = !!value;

        //valueOpt = this.state.value ? this.state.value : valueOpt;

        let subOptionStyle = {
            backgroundColor: 'rgba(199, 198, 198, 0.3)'
        };

        // TRUE IN THE `RIGHT` `MUA`
        // FALSE IN THE `LEFT` `BÁN`

        return (
            <View style={_styles.wrapper}>

                <View style={[_styles.statusWrapper, !valueOpt ? { backgroundColor: 'rgb(255, 23, 68)'} : subOptionStyle]}>
                    <Text style={_styles.textOption}>{labelLeft}</Text>
                </View>

                <View style={_styles.switchWrapper}>
                    <Switch
                        onValueChange = { (value) => { onChange && onChange(value ? 'BUY' : 'SELL') }  }
                        value={valueOpt}
                        thumbTintColor = {valueOpt ? 'rgb(0, 230, 118)' : 'rgb(255, 23, 68)'}
                        onTintColor = {'rgba(0, 230, 118, 0.24)'}
                        tintColor = {'rgba(255, 23, 68, 0.3)'}
                    />
                </View>

                <View style={[_styles.statusWrapper, valueOpt ? { backgroundColor: 'rgb(0, 230, 118)'} : subOptionStyle]}>
                    <Text style={_styles.textOption}>{labelRight}</Text>
                </View>

            </View>
        );
    }
}

const _styles = {
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        
    },
    statusWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius : 90 * scale
    },
    switchWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textOption: {

    }
};

export default SwitchOptions;
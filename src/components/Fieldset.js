import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

class Fieldset extends React.Component {

    static displayName = '@Fieldset';

    static propTypes = {
        style: PropTypes.object,
        legend: PropTypes.string,
        children: PropTypes.node,
        required: PropTypes.bool
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return (
            this.props.legend !== nextProps.legend ||
            this.props.required !== nextProps.required ||
            this.props.children != nextProps.children ||
            this.props.style != nextProps.style
        );
    }

    render() {

        const {
            style,
            legend,
            children,
            required
        } = this.props;

        return (
            <View style={ style ? [style, _styles.wrapper] : _styles.wrapper }>
                <View style={ _styles.container }>
                    { children }
                </View>
                {
                    !!legend && 
                        <Text numberOfLines={1} style={ _styles.textLegend }>{ legend }{
                            required && 
                                <Text style={ _styles.textRequired }> *</Text>
                        }</Text>
                }
            </View>
        );
    }
}

const _styles = {
    wrapper: {
        position: "relative",
        paddingTop: 10 * scale
    },
    container: {
        borderWidth: sizes.borderWidth,
        borderColor: colors.primaryBorderColor,
        padding: sizes.spacing,
        paddingTop: 12 * scale
        //borderRadius: 5
    },
    textLegend: {
        position: "absolute",
        top: 0,
        fontSize: fontSizes.normal,
        fontWeight: "bold",
        height: fontSizes.normal + (4 *scale),
        backgroundColor: colors.primaryBackgroundColor,
        marginLeft: sizes.spacing,
        paddingHorizontal: sizes.spacing,
        color: colors.boldColor,
    },
    textRequired: {
        fontSize: fontSizes.normal,
        color: colors.required
    }
};

export default Fieldset;
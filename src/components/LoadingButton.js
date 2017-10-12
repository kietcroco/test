"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { sizes, colors, fontSizes } from '~/configs/styles';

class LoadingButton extends React.Component {

    static displayName = "LoadingButton";

    static propTypes = {
        style: PropTypes.object,
        loading: PropTypes.bool,
        onPress: PropTypes.func,
        activeOpacity: PropTypes.number,
        children: PropTypes.string.isRequired
    };

    static defaultProps = {
        loading: false,
        activeOpacity: colors.activeOpacity
    };

    shouldComponentUpdate( nextProps ) {
        
        return (
            this.props.loading !== nextProps.loading ||
            this.props.label !== nextProps.label ||
            this.props.activeOpacity !== nextProps.activeOpacity
        );
    }

    render() {

        const { style, loading, onPress, activeOpacity, children, ...otherProps } = this.props;

        return (
            <TouchableOpacity 
                { ...otherProps }
                onPress         = { !loading ? onPress : undefined } 
                activeOpacity   = { loading ? 1 : activeOpacity } 
                style           = { [_styles.container, style, loading && _styles.containerLoading] }
            >
                {
                    loading &&
                        <ActivityIndicator color={ colors.secondColor } />
                }
                <Text style={ loading ? _styles.lblLoading : _styles.label }>{ children }</Text>
            </TouchableOpacity>
        )
    }
}

const _styles = {
    container: {
        height: sizes.submitButton,
		backgroundColor: colors.buttonSubmitColor,
		borderWidth: sizes.borderWidth,
		borderColor: colors.buttonSubmitBorder,
		borderRadius: sizes.borderRadius,
		justifyContent: "center",
		alignItems: "center",
		marginTop: sizes.margin,
		flexDirection: "row"
    },
    containerLoading: {
		backgroundColor: colors.buttonDisableColor,
		borderColor: colors.buttonDisableColorBorderColor
	},
    label: {
        fontWeight: "bold",
        color: colors.secondColor,
        fontSize: fontSizes.normal
    },
    lblLoading: {
        fontSize: fontSizes.normal,
        color: colors.secondColor,
        fontWeight: "bold",
		marginLeft: sizes.spacing
    }
};

export default LoadingButton;
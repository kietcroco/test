"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, fontSizes, scale, hitSlop } from '~/configs/styles';
import shallowEqual from 'fbjs/lib/shallowEqual';

class BoxInput extends React.Component {

    static displayName = "@BoxInput";

    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object,
        cursorColor: PropTypes.string,
        cursorInterval: PropTypes.number,
        focused: PropTypes.bool,
        cursor: PropTypes.bool,
        children: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        cursorInterval: 600,
        cursor: true,
        children: " ",
        focused: false
    };

    constructor( props ) {
        super( props );

        this._cursorID = undefined;
        this.state = {
            flicking: false
        };
    }

    componentWillReceiveProps( nextProps ) {
        
        if (
            this.props.focused !== nextProps.focused 
            || this.props.cursor !== nextProps.cursor
        ) {

            if (nextProps.focused && nextProps.cursor) {
                
                this.focused();
            } else {

                this.blur();
            }
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        
        return (
            this.state.flicking !== nextState.flicking ||
            !shallowEqual(this.props, nextProps)
        );
    }

    render() {

        const {
            cursorColor,
            style,
            textStyle,
            children,
            focused,
            onPress
        } = this.props;

        return (
            <TouchableOpacity onPress={onPress} activeOpacity={colors.activeOpacity} hitSlop={hitSlop} style={[_styles.container, style]}>
                <Text style={[
                    _styles.text, 
                    textStyle,
                    focused && this.state.flicking && _styles.cursor, 
                    focused && this.state.flicking && cursorColor && {
                        borderRightColor: cursorColor
                    }
                ]}>{children}</Text>
            </TouchableOpacity>
        );
    }

    focused() {

        //if (!this.props.focused) {

            if( this._cursorID ) {
                clearInterval(this._cursorID);
            }

            this._cursorID = setInterval( () => {

                this.setState({
                    flicking: !this.state.flicking
                });
            }, this.props.cursorInterval );
        //}
    }

    blur() {

        if (this._cursorID) {
            clearInterval(this._cursorID);
        }
        this._cursorID = undefined;
    }

    componentDidMount() {

        if( this.props.focused && this.props.cursor ) {

            this.focused();
        }
    }

    componentWillUnmount() {

        this.blur();
    }
}

const _styles = {
    container: {
        margin: 5 * scale,
        borderWidth: 1 * scale,
        borderColor: colors.primaryBorderColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        fontSize: fontSizes.normal,
        paddingRight: 2 * scale
    },
    cursor: {
        borderRightWidth: 1,
        //borderRightColor: "red",
        //paddingRight: 2 * scale
    }
};

export default BoxInput;
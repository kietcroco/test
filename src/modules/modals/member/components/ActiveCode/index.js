"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';
import BoxInput from './BoxInput';

class ActiveCode extends React.Component {

    static displayName = "@ActiveCode";

    static propTypes = {
        maxLength: PropTypes.number
    };

    static defaultProps = {
        maxLength: 4
    };

    constructor( props ) {
        super( props );

        this.state = {
            value: "",
            focused: false,
            isClear: false,
            cursorIndex: 0
        };
    }

    componentWillReceiveProps( nextProps ) {

    }

    // shouldComponentUpdate( nextProps, nextState ) {
        
    //     return true;
    // }

    render() {

        return (
            <TouchableOpacity style={_styles.container}>
                {
                    this._renderBoxInput()
                }
                <TextInput
                    ref                   = {ref => (this.input = ref)}
                    keyboardType          = "numeric"
                    maxLength             = {this.props.maxLength+1}
                    returnKeyType         = "done"
                    underlineColorAndroid = "transparent"
                    style                 = {_styles.textInput}
                    pointerEvents         = "none"
                    autoFocus             = {true}
                    onFocus               = { this._inputOnFocus }
                    onBlur                = { this._inputOnBlur }
                    // onEndEditing          = {this._inputOnBlur}
                    // onSubmitEditing       = {this._inputOnBlur}
                    value                 = { this.state.value }
                    selection             = {{
                        start: this.state.cursorIndex,
                        end: this.state.cursorIndex
                    }}
                    onChange={this._inputOnChange}
                ></TextInput>
            </TouchableOpacity>
        );
    }

    componentDidMount() {

        if(!this.input.isFocused()) {

            this.input.focus();
        }
    }

    _renderBoxInput = () => {

        const Box = [];

        for(let i = 1; i <= this.props.maxLength; i++) {

            let focused = false;
            if( this.state.isClear || this.state.cursorIndex < this.state.value.length ) {

                focused = Math.max(this.state.cursorIndex, 1) == i;
            } else {

                focused = Math.min(this.state.cursorIndex + 1, this.props.maxLength) == i;
            }
   
            Box.push(
                <BoxInput
                    key={`active-code-${i}`}
                    cursor={this.state.focused}
                    focused={focused}
                    onPress={() => {
                        this.setState({
                            cursorIndex: Math.min(i, this.state.value.length),
                            isClear: true
                        });
                    }}
                >{this.state.value[i-1]}</BoxInput>
            );
        }
        return Box;
    };

    _inputOnChange = e => {

        let value = e.nativeEvent.text || "";
        if( value.length > this.props.maxLength ) {

            if( this.state.cursorIndex < value.length ) {

                value = `${value.substr(0, this.state.cursorIndex - 1)}${value.substr(this.state.cursorIndex)}`;
                value !== this.state.value && this.setState({
                    value
                });
            }
            return;
        }

        if (this.state.value !== value) {

            let isClear = this.state.value.length > value.length;
            if (this.state.value.length == value.length) {

                isClear = this.state.isClear;
            }

            //let cursorIndex = isClear ? value.length : value.length;

            let cursorIndex = isClear ? Math.max(this.state.cursorIndex - 1, Math.min(value.length, 1)) : Math.min(this.state.cursorIndex + 1, this.props.maxLength);     

            this.setState({
                value, 
                isClear, 
                cursorIndex
            });
        }
    };

    _inputOnFocus = () => {
        !this.state.focused && this.setState({
            focused: true
        });
    };

    _inputOnBlur = () => {

        this.state.focused && this.setState({
            focused: false
        });
    };
}

const _styles = {
    container: {
        position: "relative",
        flex: 1,
        flexDirection: "row",
        height: 50 * scale,
        justifyContent: "space-between"
    },
    textInput: {
        color: "transparent",
        fontSize: 1,
        position: "absolute",
        zIndex: 0
    }
};

export default ActiveCode;
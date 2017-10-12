"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import defaultAvatar from '~/assets/images/user2.png';
import { scale, hitSlop } from '~/configs/styles';

class CircleAvatar extends React.Component {

    static displayName = "@circle-avatar";

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        source: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.string
        ]),
        size: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        onPress : PropTypes.func
    };

    constructor(props) {
        super(props);

        const source = typeof props.source === "string" ? { uri: props.source } : (props.source || defaultAvatar);

        this.state = {
            source
        };

        this._onError = this._onError.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.source != nextProps.source && this.state.source != nextProps.source) {

            let source = defaultAvatar;
            if (typeof nextProps.source === "string") {

                source = { uri: nextProps.source };
            } else if (nextProps.source) {

                source = nextProps.source;
            }

            this.setState({
                source
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return (
            this.state.source != nextState.source ||
            this.props.onPress != nextProps.onPress
        );
    }

    _onError() {

        this.setState({
            source: defaultAvatar
        });
    }

    calcSize(size) {
        return {
            width: size * scale,
            height: size * scale,
            borderRadius: (size * scale) / 2
        };
    }

    render() {

        const {
            style,
            source,
            size,
            onPress
		} = this.props;

        var sizeStyle = size ? this.calcSize(size) : {};
        return (
            <TouchableOpacity hitSlop={hitSlop} style={[_styles.wrapper]} onPress={onPress || undefined}>
                <Image onError={this._onError} source={this.state.source} style={[sizeStyle, _styles.image]} />
            </TouchableOpacity>
        );
    }
}

const _styles = {
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "cover",
    },
};

export default CircleAvatar;
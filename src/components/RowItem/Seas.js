"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Avatar from '~/components/Avatar';
import RowContent from '~/components/RowContent/Seas';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';

class RowItemSeas extends React.Component {

    static displayName = "@RowItemSeas";

    static propTypes = {
        onPress: PropTypes.func,
        source: PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps) {

        return (
            !recursiveShallowEqual(this.props.source, nextProps.source)
        );
    }

    render() {

        const {
            avatar,
            code,
            ticket
        } = this.props.source;
        return (
            <TouchableOpacity style={_styles.container} onPress={this.props.onPress}>
                <Avatar ticket={ticket} source={avatar ? avatar[0] : undefined}>{code}</Avatar>
                <RowContent source={this.props.source} />
            </TouchableOpacity>
        );
    }

}

const _styles = {
    container: {
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    }
};

export default RowItemSeas;
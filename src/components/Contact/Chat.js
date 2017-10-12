import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from '~/components/IconContact/Chat';
import launchURL from '~/utilities/launchURL';
import _styles from './styles';
import { hitSlop } from '~/configs/styles';

class Chat extends React.Component {

	static displayName = "@contact-chat";

	static propTypes = {
		style: PropTypes.object,
		labelStyle: PropTypes.object,
		label: PropTypes.string,
		users: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]).isRequired,
		type: PropTypes.oneOf([
			"chat",
			"call",
			"videoCall"
		]),
		topic: PropTypes.string,
		onPress: PropTypes.func
	};

	static defaultProps = {
		topic: "IZIFIX",
		type: "chat",
		label: "Chat"
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.type !== nextProps.type ||
			this.props.topic !== nextProps.topic ||
			this.props.label !== nextProps.label ||
			this.props.users != nextProps.users ||
			this.props.style != nextProps.style ||
			this.props.labelStyle != nextProps.labelStyle
		);
	}

	render() {

		const { style, labelStyle, users, type, topic, onPress, label } = this.props;

		let url = "skype:";

		url += Array.isArray(users) ? users.join(';') : users;

		if (type === "videoCall") {

			url += "?call&video=true";
		} else {

			url += "?" + type;
			if (topic && Array.isArray(users)) {

				url += "&topic=" + topic;
			}
		}

		url = encodeURI(url);

		return (

			<TouchableOpacity onPress={ e => {

				users && url && launchURL(url);
				onPress && onPress(e);
			} } style={ _styles.container } hitSlop={ hitSlop }>
				<Icon style={ [_styles.icon, style] }/>
				{ 
					!!label && 
						<Text style={ labelStyle ? [_styles.label, labelStyle] : _styles.label }>{ label }</Text>
				}
			</TouchableOpacity>
		);
	}
}

export default Chat;
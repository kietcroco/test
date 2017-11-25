import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import { colors, fontSizes, scale, sizes } from '~/configs/styles';
import Image from '~/components/Image';
import timeAgo from '~/utilities/timeAgo';

class ListMessage extends React.Component {

	static displayName = '@ListMessage';

	static propTypes = {
		source: PropTypes.object,
		onPress: PropTypes.func
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.source != nextProps.source
		);
	}

	render() {

		const {
			title,
			content,
			avatar,
			create_time,
			fullname,
			is_admin,
			sender_phone,
			sender_code,
			sender_email,
			seen_time
		} = this.props.source;

		let name = `${is_admin ? 'admin ' : ''}${(fullname || sender_phone || sender_code || sender_email || '')}`;

		return (
			<TouchableOpacity onPress={ this.props.onPress } style={ [_styles.container, seen_time && {
				backgroundColor: colors.primaryBackgroundColor
			}] }>
				{
					avatar &&
						<View style={ _styles.avatarWrapper }>
							<Image source={{uri: avatar}} style={ _styles.avatar }/>
						</View>
				}
				<View style={ _styles.content }>
					<Text style={ _styles.title }>{ title }</Text>
					<Text style={ _styles.message }>{ content }</Text>
					<View style={ _styles.rowInfo }>
						{
							!!name &&
								<Text style={ _styles.italic }>{ translate('từ') } <Text style={ _styles.senderName }>{ name }</Text></Text>
						}
						{
							!!create_time && <Text style={ _styles.italic }>{ timeAgo( create_time * 1000 ) }</Text>
						}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		flexDirection: "row",
		flex: 1,
		borderBottomWidth: sizes.borderWidth,
		borderBottomColor: colors.primaryBorderColor,
		paddingHorizontal: 10 * scale,
		paddingVertical: 5 * scale,
		backgroundColor: "#f0f9ff"
	},
	avatarWrapper: {
		marginRight: 5 * scale,
		width: 60 * scale,
		height: 60 * scale,
		justifyContent: "center",
		alignItems: "center"
	},
	avatar: {
		width: 60 * scale,
		height: 60 * scale,
		resizeMode: "contain"
	},
	title: {
		fontSize: fontSizes.normal,
		color: colors.normalColor,
		fontWeight: "bold"
	},
	message: {
		fontSize: fontSizes.small,
		color: colors.normalColor,
	},
	italic: {
		fontSize: fontSizes.small,
		color: colors.italicColor,
		fontStyle: "italic"
	},
	senderName: {
		fontSize: fontSizes.small,
		color: colors.normalColor,
		fontStyle: "normal"
	},
	content: {
		flex: 1
	},
	rowInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 5 * scale
	}
};

export default ListMessage;
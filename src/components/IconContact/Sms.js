import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { colors, scale } from '~/configs/styles';
import mergeStyle from '~/library/mergeStyle';

class SMS extends React.Component {

	static displayName = "@icon-sms";

	static propTypes = {
		style: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		])
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.style != nextProps.style
		);
	}

	render() {

		const {
			style
		} = this.props;

		// style =  Array.isArray( style ) ? mergeStyle(...style) : style;
		
		// style = mergeStyle(_styles.icon, style);

		//style.fontSize = style.fontSize - (10 * scale);

		return (
			<View style={ _styles.container }>
				<Text style={ [ _styles.icon, Array.isArray( style ) ? mergeStyle(...style) : style ] }>SMS</Text>
			</View>
		);
	}
}

const _styles = {
	container: {
		borderRadius: 4 * scale,
		paddingHorizontal: 4 * scale,
		paddingVertical: 4 * scale,
		backgroundColor: colors.primaryColor,
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		color: colors.secondColor,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 10 * scale
	}
};

export default SMS;
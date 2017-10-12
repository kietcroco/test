import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { translate } from '~/utilities/language';
import { shadow, sizes, colors, fontSizes, scale } from '~/configs/styles';

class Button extends React.Component {

	static displayName = "@action-button";

	static propTypes = {
		style: PropTypes.object,
		onPress: PropTypes.func.isRequired,
		offset: PropTypes.shape({
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			left: PropTypes.number
		}),
		label: PropTypes.string
	};

	static defaultProps = {
		offset: {}
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.onPress != nextProps.onPress ||
			this.props.label !== nextProps.label ||
			this.props.style != nextProps.style ||
			this.props.offset != nextProps.offset
		);
	}

	render() {

		const { style, onPress, offset: {
			top: marginTop,
			right: marginRight,
			bottom: marginBottom,
			left: marginLeft
		}, label = translate('Đ.tin') } = this.props;

		return (
			<TouchableOpacity activeOpacity={1} onPress={ onPress } style={[_styles.container, style, {
				marginTop,
				marginRight,
				marginBottom,
				marginLeft
			}]}>
				<Text style={ _styles.icon }>{`${ label }\n+` }</Text>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		width: sizes.actionButton,
		height: sizes.actionButton,
		backgroundColor: colors.activeColor,
		borderRadius: sizes.actionButtonRadius,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 4 * scale,
		...shadow
	},
	icon: {
		color: colors.secondColor,
		fontSize: fontSizes.small,
		textAlign: "center",
		textAlignVertical: "center"
	}
};

export default Button;
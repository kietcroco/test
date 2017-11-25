import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
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
		label: PropTypes.string,
		scaleValueAnim: PropTypes.object
	};

	static defaultProps = {
		offset: {}
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.onPress != nextProps.onPress ||
			this.props.label !== nextProps.label ||
			this.props.scaleValueAnim !== nextProps.scaleValueAnim ||
			this.props.style != nextProps.style ||
			this.props.offset != nextProps.offset
		);
	}

	render() {

		const { style, scaleValueAnim, onPress, offset: {
			top: marginTop,
			right: marginRight,
			bottom: marginBottom,
			left: marginLeft
		}, label = translate('Đ.tin') } = this.props;

		let Component = TouchableOpacity;
		let transformScale = 1;
		let shadows = shadow;

		if ( scaleValueAnim ) {
			Component = Animated.createAnimatedComponent(TouchableOpacity);
			transformScale = scaleValueAnim.interpolate({
				inputRange: [0, 1],
				outputRange: [0.01, 1]
			});
			shadows = {
				...shadow,
				shadowOpacity: scaleValueAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0.01, 1]
				}),
				shadowOffset: {
					width: scaleValueAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, shadow.shadowOffset.width]
					}),
					height: scaleValueAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, shadow.shadowOffset.height]
					})
				},
				shadowRadius: scaleValueAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, shadow.shadowRadius]
				}),
				elevation: scaleValueAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, shadow.elevation]
				})
			};
		}
	
		return (
			<Component activeOpacity={1} onPress={ onPress } style={[_styles.container, style, {
				marginTop,
				marginRight,
				marginBottom,
				marginLeft,
				transform: [
					{ scale: transformScale }
				],
				...shadows
			}]}>
				<Text style={ _styles.icon }>{`${ label }\n+` }</Text>
			</Component>
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
		//...shadow
	},
	icon: {
		color: colors.secondColor,
		fontSize: fontSizes.small,
		textAlign: "center",
		textAlignVertical: "center"
	}
};

export default Button;
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { shadow, sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class CategoryButton extends React.Component {

	static displayName = "@CategoryButton";

	static propTypes = {
		style: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array
		]),
		children: PropTypes.string.isRequired,
		active: PropTypes.bool
	};

	static defaultProps = {
		active: false
	};

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.active !== nextProps.active ||
			this.props.children !== nextProps.children
		);
	}

	render() {

		const { onPress, children, active, style } = this.props;

		return (
			<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={[_styles.container, style, active && {
				backgroundColor: colors.activeColor
			}]} onPress={ !active ? onPress : undefined }>
				<Text style={ _styles.label }>{ children }</Text>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		backgroundColor: colors.primaryBackgroundColor,
		paddingTop: 2 * scale,
		paddingBottom: 2 * scale,
		paddingLeft: sizes.spacing,
		paddingRight: sizes.spacing,
		borderRadius: 10 * scale,
		...shadow,
		marginLeft: sizes.spacing,
		marginRight: sizes.spacing,
		justifyContent: "center",
		alignItems: "center"
	},
	label: {
		fontSize: fontSizes.small,
		textAlignVertical: "center",
		textAlign: "center",
		color: colors.normalColor
	}
};
export default CategoryButton;
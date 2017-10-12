import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { shadow, sizes, colors, fontSizes, scale } from '~/configs/styles';

class MainButton extends React.Component {

	static displayName = "@row-action-button";

	static propTypes = {
		style: PropTypes.object,
		active: PropTypes.bool,
		children: PropTypes.string.isRequired, // label
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
		offset: {},
		active: false
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.active !== nextProps.active ||
			this.props.label !== nextProps.label ||
			this.props.children !== nextProps.children
		);
	}
	
	render() {

		const { label, style, onPress, children, active, offset: {
			top: marginTop,
			right: marginRight,
			bottom: marginBottom,
			left: marginLeft
		} } = this.props;

		return (
			<View style={ [_styles.container, {
				marginTop,
				marginRight,
				marginBottom,
				marginLeft
			}, !active && {
				justifyContent: "flex-end",
			}] } pointerEvents="box-none">
				{
					active && <View style={ _styles.label }><Text style={ _styles.labelText }>{ children }</Text></View>
				}
				<Button style={ style } onPress={ onPress } label={ label }/>
			</View>
		);
	}
}

const _styles = {
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 46 * scale,
		width: 260 * scale
	},
	label: {
		backgroundColor: colors.activeColor,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		marginHorizontal: sizes.margin,
		marginVertical: 7 * scale,
		borderRadius: sizes.borderRadius,
		height: 30 * scale,
		...shadow
	},
	labelText: {
		backgroundColor: "transparent",
		textAlign: "center",
		textAlignVertical: "center",
		color: colors.secondColor,
		fontSize: fontSizes.normal
	}
};

export default MainButton;
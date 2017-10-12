import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

import mapCurrentLanguage from '~/utilities/mapCurrentLanguageToProps';

class CategorySelect extends React.Component {

	static displayName = "@CategorySelect";

	static propTypes = {
		style: PropTypes.object,
		children: PropTypes.string,
		onPress: PropTypes.func
	};

	// static defaultProps = {
	// 	children: translate("- Chọn -")
	// };

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.children !== nextProps.children ||
			this.props.style != nextProps.style ||
			this.props.currentLanguage !== nextProps.currentLanguage ||
			this.props.onPress != nextProps.onPress
		);
	}

	render() {

		const { children = translate("- Chọn -"), onPress, style } = this.props;

		return (
			<TouchableOpacity activeOpacity={ colors.activeOpacity } style={ [_styles.container, style] } onPress={ onPress }>
				<Text numberOfLines={1} style={ _styles.label }>{ children }</Text>
				<FAIcon name="angle-down" style={ _styles.icon }/>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: sizes.rowItemHeight,
		borderWidth: sizes.borderWidth,
		borderColor: colors.secondBorderColor,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		paddingLeft: 5 * scale,
		paddingRight: 18 * scale
	},
	label: {
		color: colors.secondColor,
		fontSize: fontSizes.small
	},
	icon: {
		color: colors.secondColor,
		position: "absolute",
		right: 5 * scale,
		fontSize: fontSizes.large
	}
};

export default mapCurrentLanguage(CategorySelect);
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

class AgreementButton extends React.Component {

	static displayName = '@AgreementButton';

	static propTypes = {
		style: PropTypes.object,
		onPress: PropTypes.func,
		checked: PropTypes.bool,
		label: PropTypes.string
	};

	static defaultProps = {
		checked: false,
		label: translate("Thoả thuận")
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.checked !== nextProps.checked ||
			this.props.label !== nextProps.label
		);
	}

	render() {

		const { style, onPress, checked, label } = this.props;

		return (
			<TouchableOpacity activeOpacity={ colors.activeOpacity } style={ style ? [_styles.container, style] : _styles.container } onPress={ onPress }>
				<Text style={ _styles.label }>{ label }</Text>
				{
					checked &&
						<FAIcon name="check" style={ _styles.iconChecked }/>
				}
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		width: "26%",
		height: 47 * scale,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.secondBackgroundColor,
		borderRadius: sizes.borderRadius,
		position: "relative"
	},
	label: {
		fontSize: fontSizes.small,
		fontWeight: "bold",
		color: colors.normalColor
	},
	iconChecked: {
		fontSize: 14 * scale,
		position: "absolute",
		right: 5 * scale,
		top: 5 * scale,
		color: colors.successColor
	}
};

export default AgreementButton;
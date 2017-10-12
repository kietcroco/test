import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { translate } from '~/utilities/language';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

class SubmitButton extends React.Component {

	static displayName = '@SubmitButton';

	static propTypes = {
		onPress: PropTypes.func,
		disable: PropTypes.bool,
		loading: PropTypes.bool,
		isUpdate : PropTypes.bool,
		label: PropTypes.string
	};

	static defaultProps = {
		disable: false,
		loading: false
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.disable !== nextProps.disable ||
			this.props.loading !== nextProps.loading ||
			this.props.label !== nextProps.label
		);
	}

	render() {

		const { onPress, disable, loading , isUpdate, label } = this.props;

		return (
			<TouchableOpacity activeOpacity={ (loading || disable) ? 1 : colors.activeOpacity } onPress={ !disable && !loading ? onPress : undefined } style={ (disable || loading) ? [_styles.container, _styles.containerDisable] : _styles.container }>
				{
					loading ?
						<ActivityIndicator color={ colors.secondColor } />
					: <FAIcon name={isUpdate ? "floppy-o"  :"plus-circle"} style={ _styles.icon }/>
				}
				<Text style={ _styles.label }>{ label ? label : (isUpdate ? translate("Lưu tin") : translate("Đăng ngay")) }</Text>
			</TouchableOpacity>
		);
	}
}

const _styles = { 
	container: {
		height: sizes.submitButton,
		backgroundColor: colors.buttonSubmitColor,
		borderWidth: sizes.borderWidth,
		borderColor: colors.buttonSubmitBorder,
		borderRadius: sizes.borderRadius,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row"
	},
	containerDisable: {
		backgroundColor: colors.buttonDisableColor,
		borderColor: colors.buttonDisableColorBorderColor
	},
	label: {
		color: colors.secondColor,
		fontSize: fontSizes.normal,
		fontWeight: "bold",
		marginLeft: 6 * scale
	},
	icon: {
		fontSize: fontSizes.normal,
		color: colors.secondColor
	}
};

export default SubmitButton;
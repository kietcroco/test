import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { translate } from '~/utilities/language';

class Footer extends React.PureComponent {

	static displayName = '@ModalCollapseFooter';

	static propTypes = {
		clearHandle: React.PropTypes.func.isRequired,
		applyHandle: React.PropTypes.func
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.clearHandle != nextProps.clearHandle ||
			this.props.applyHandle != nextProps.applyHandle
		);
	}

	render() {

		const { clearHandle, applyHandle } = this.props;

		return (

			<View style={ _styles.container }>
				{
					clearHandle && <TouchableOpacity style={ _styles.btnClear } onPress={ clearHandle }>
						<Text>{ translate("Bỏ chọn") }</Text>
					</TouchableOpacity>
				}
				{

					applyHandle && <TouchableOpacity style={ _styles.btnApply } onPress={ applyHandle }>
						<Text style={ _styles.labelApply }>{ translate("Áp dụng") }</Text>
					</TouchableOpacity>
				}
			</View>
		);
	}
}

const _styles = {
	container: {
		height: 40,
		flexDirection: "row"
	},
	btnClear: {
		flex: 1,
		backgroundColor: "#dddddd",
		alignItems: "center",
		justifyContent: "center"
	},
	btnApply: {
		flex: 1,
		backgroundColor: "#fe9400",
		alignItems: "center",
		justifyContent: "center"
	},
	labelApply: {
		color: "white"
	}
};

export default Footer;
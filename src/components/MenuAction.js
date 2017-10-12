import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MlIcon from 'react-native-vector-icons/MaterialIcons';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import { translate } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

class MenuAction extends React.PureComponent {

	static propTypes = {
		onDelete: PropTypes.func,
		onEdit: PropTypes.func,
		delMessageTitle: PropTypes.string,
		delMessage: PropTypes.string,
		delCancelLabel: PropTypes.string,
		delOkLabel: PropTypes.string,
		labelEdit: PropTypes.string,
		labelDelete: PropTypes.string
	};

	render() {
		const { 
			onDelete, 
			onEdit,
			delMessageTitle = translate("Cảnh báo"),
			delMessage = `${translate("Bạn có thật sự muốn xoá")}?`,
			delOkLabel = "OK",
			delCancelLabel = translate('Hủy'),
			labelDelete = translate('Xoá'),
			labelEdit = translate('Sửa tin')
		} = this.props;
		return (
			<Menu>
				<MenuTrigger customStyles={_styles.MenuTrigger}>
					<MlIcon name="more-vert" style={_styles.iconMenu} />
				</MenuTrigger>
				<MenuOptions optionsContainerStyle={_styles.optionsContainerStyle}>
					<MenuOption customStyles={_styles.MenuOption} onSelect={() => {
						!!onEdit && onEdit()
					}} ><Text style={_styles.labelUpdate}>{ labelEdit }</Text>
					</MenuOption>

					<MenuOption customStyles={_styles.MenuOption} onSelect={() => {

						alertUtil({
							title: delMessageTitle,
							message: delMessage,
							actions: [
								{
									text: delOkLabel, 
									onPress: (() => {
										!!onDelete && onDelete()
									}),
								},
								{
									text: delCancelLabel, 
									onPress: (() => {
										return false;
									}), style: 'cancel'
								}
							]
						});
					}}>
						<Text style={_styles.labelDelete}>{ labelDelete }</Text>
					</MenuOption>
				</MenuOptions>
			</Menu>
		);
	}
}

const _styles = {
	MenuTrigger: {
		triggerOuterWrapper: {
			width: 30 * scale,
			height: "100%",
			alignItems: "center",
			justifyContent: "center"
		}
	},
	iconMenu: {
		color: colors.secondColor,
		fontSize: 20 * scale
	},
	optionsContainerStyle: {
		width: 150 * scale,
		padding: 0
	},
	MenuOption: {
		optionWrapper: {
			height: 50 * scale,
			alignItems: "center",
			justifyContent: "center",
			borderBottomWidth: sizes.borderWidth,
			borderBottomColor: colors.primaryBorderColor
		}
	},
	labelDelete: {
		color: colors.highlightColor,
		fontSize: fontSizes.normal + 5
	},
	labelUpdate :{
		color: colors.boldColor,
		fontSize: fontSizes.normal + 5
	}
};

export default MenuAction;
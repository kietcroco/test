"use strict";
// màn hình nhập số điện thoại
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import TextInput from '~/components/TextInput';
import shallowEqual from 'fbjs/lib/shallowEqual';
import passwordService from '~/services/member/password';
import LoadingButton from '~/components/LoadingButton';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes } from '~/configs/styles';

import { namespace } from '../constants';
const routeForgotName = `${ namespace }/forgot-password`;

class ForgetPassword extends React.Component {

	static displayName = "ForgetPassword";

	constructor( props ) {
		super( props );

		const { state: {params: {
			account_mobile = ""
		} = {}} = {} } = props.navigation;

		this.state = {
			account_mobile_forget: {
				value: account_mobile,
				messageType: null,
				message: ""
			},
			loading: false
		};

		this._onSubmit = this._onSubmit.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			!shallowEqual( this.state, nextState )
		);
	}

	async _onSubmit() {

		if( !this.state.account_mobile_forget.value || this.state.account_mobile_forget.value.length < 10 ) {

			return this.setState({
				account_mobile_forget: {
					...this.state.account_mobile_forget,
					messageType: "error",
					message: translate("Bạn vui lòng nhập số điện thoại")
				},
				loading: false
			});
		}

		this.setState({
			account_mobile_forget: {
				...this.state.account_mobile_forget,
				messageType: null,
				message: ""
			},
			loading: true
		});

		try {
			
			const res = await passwordService.forgetPassword( this.state.account_mobile_forget.value );
			this.setState({
				loading: false
			});

			if( res.status === 200 && res.data ){

				if( res.data.STATUS === "OK" ) {

					alertUtil({
						messageTitle: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Đã gửi yêu cầu thay đổi mật khẩu")
					});
					return this.props.navigation.replace(routeForgotName, {
						account_mobile: this.state.account_mobile_forget.value
					});
				}
			}

			return alertUtil({
				messageTitle: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu thay đổi mật khẩu không thành công")
			});
		} catch (error) {
			
			alertUtil({
				messageTitle: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu thay đổi mật khẩu không thành công")
			});
		}
		this.setState({
			loading: false
		});
	}

	render() {

		return (
			<ScrollView 
				style 							= { _styles.wrapper } 
				contentContainerStyle 			= { _styles.container }
				horizontal 						= { false }
				keyboardDismissMode 			= "interactive"	
				keyboardShouldPersistTaps 		= "always"	
				showsHorizontalScrollIndicator 	= { false }
				directionalLockEnabled 			= { true }
			>
				<Text style={ _styles.title }>{ translate("Nếu bạn quên username/password vui lòng nhập số điện thoại, IZIFIX sẽ tự động cung cấp lại thông tin.") }</Text>

				<TextInput
					ref 			= "account_mobile_forget"
					label 			= { translate("Nhập số điện thoại") }
					placeholder 	= { translate("Để nhận lại username/password") }
					type 			= "input"
					returnKeyType 	= "done"
					keyboardType 	= "phone-pad"
					maxLength 		= { 15 }
					//autoFocus 		= { true }
					style 			= { _styles.input }
					value 			= { this.state.account_mobile_forget.value }
					messageType 	= { this.state.account_mobile_forget.messageType }
					placeholderTextColor={ colors.placeholderColor }
					onChangeText    = { value => this.setState({
						account_mobile_forget: {
							...this.state.account_mobile_forget,
							value
						}
					}) }
					required
					onSubmitEditing = { !this.state.loading ? this._onSubmit : undefined }
				>{ this.state.account_mobile_forget.message }</TextInput>

				<LoadingButton
					onPress 	= { this._onSubmit }
					loading 	= { this.state.loading }
				>{ translate("Lấy lại thông tin") }</LoadingButton>
			</ScrollView>
		)
	}
}

const _styles = {
	wrapper: {
		flex: 1,backgroundColor: colors.secondColor,
	},
	container: {
		paddingTop: sizes.margin,
		paddingLeft: sizes.margin,
		paddingRight: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	title: {
		fontSize: fontSizes.normal,
		color: colors.boldColor,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		padding: sizes.spacing,
		backgroundColor: colors.descriptionBackground
	},
	input: {
		marginTop: sizes.margin
	}
};

export default ForgetPassword;
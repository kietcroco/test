"use strict";
// màn hình xác nhận
import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import TextInput from '~/components/TextInput';
import shallowEqual from 'fbjs/lib/shallowEqual';
import passwordService from '~/services/member/password';
import SmsListener from 'react-native-android-sms-listener';
import LoadingButton from '~/components/LoadingButton';
import { sizes, colors, fontSizes } from '~/configs/styles';
import alertUtil  from '~/utilities/alert';

import { namespace } from '../constants';
const routeChangePasswordName = `${ namespace }/change-password`;

class ForgotPassword extends React.Component {

	static displayName = "ForgotPassword";

	constructor( props ) {
		super( props );

		const { state: {params: {
			account_mobile
		} = {}} = {} } = props.navigation;

		if( !account_mobile ) {

			props.navigation.goBack();
		}

		this.state = {
			account_mobile_forgot: {
				account_mobile,
				value: "",
				messageType: null,
				message: ""
			},
			loadingSubmit: false,
			loadingResend: false
		};

		this._onSubmit = this._onSubmit.bind(this);
		this._onResend = this._onResend.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			!shallowEqual( this.state, nextState )
		);
	}

	async _onSubmit() {

		if( !this.state.account_mobile_forgot.account_mobile ) {
			alertUtil({
				title : translate("Cảnh báo"), 
				message: translate("Không tìm thấy số điện thoại") 
			});
		}

		if( !this.state.account_mobile_forgot.value || this.state.account_mobile_forgot.value.length < 4 ) {

			return this.setState({
				account_mobile_forgot: {
					...this.state.account_mobile_forgot,
					messageType: "error",
					message: translate("Bạn vui lòng nhập mã xác nhận")
				},
				loadingSubmit: false
			});
		}

		this.setState({
			account_mobile_forgot: {
				...this.state.account_mobile_forgot,
				messageType: null,
				message: ""
			},
			loadingSubmit: true
		});

		try {
			
			const res = await passwordService.forgotPassword( this.state.account_mobile_forgot.account_mobile, this.state.account_mobile_forgot.value );

			this.setState({
				loadingSubmit: false
			});

			if( res.status === 200 && res.data ) {

				if( res.data.STATUS === "OK" ) {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Xác nhận thành công")
					});

					// chuyển đến đổi mật khẩu
					return this.props.navigation.replace(routeChangePasswordName, {
						//account_password: this.state.account_mobile_forget.value
					});
				}
			}
			
			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Xác nhận không thành công")
			});
		} catch (error) {
			alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Xác nhận không thành công")
			});
		}
		this.setState({
			loadingSubmit: false
		});
	}

	async _onResend() {
		
		if( !this.state.account_mobile_forgot.account_mobile ) {
			return;
		}

		this.setState({
			account_mobile_forgot: {
				...this.state.account_mobile_forgot,
				messageType: null,
				message: ""
			},
			loadingSubmit: false,
			loadingResend: true
		});

		try {
			
			const res = await passwordService.forgetPassword( this.state.account_mobile_forgot.account_mobile );

			this.setState({
				loadingResend: false
			});
			
			if( res.status === 200 && res.data ){


				if( res.data.STATUS === "OK" ) {

					return alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Yêu cầu thay đổi mật khẩu thành công")
					});
				}
			}

			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu thay đổi mật khẩu không thành công")
			});
		} catch (error) {
			 alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu thay đổi mật khẩu không thành công")
			});
		}
		this.setState({
			loadingResend: false
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
				<Text style={ _styles.title }>{ translate("Xác minh số điện thoại") }</Text>
				<Text style={ _styles.titleMessage }>{ `${translate("IZIFIX sẽ gửi mã code 4 ký tự đến số điện thoại")} ${ this.state.account_mobile_forgot.account_mobile }.
${ translate("Bạn nhập 4 ký tự vào ứng dụng để xác nhận thay đổi password. Mã code chỉ có hiệu lực trong vòng 30 phút.") }` }</Text>

				<TextInput
					ref 			= "account_mobile_forgot"
					label 			= { translate("Mã xác nhận") }
					type 			= "input"
					returnKeyType 	= "done"
					maxLength 		= { 4 }
					//autoFocus 		= { true }
					style 			= { _styles.input }
					value 			= { this.state.account_mobile_forgot.value }
					messageType 	= { this.state.account_mobile_forgot.messageType }
					onChangeText    = { value => this.setState({
						account_mobile_forgot: {
							...this.state.account_mobile_forgot,
							value
						}
					}) }
					required
					onSubmitEditing = { !this.state.loadingSubmit ? this._onSubmit : undefined }
				>{ this.state.account_mobile_forgot.message }</TextInput>

				<LoadingButton
					loading 		= { this.state.loadingSubmit }
					onPress 		= { this._onSubmit }
				>{ translate("Xác nhận") }</LoadingButton>
				<TouchableOpacity
					activeOpacity 	= { this.state.loadingResend ? 1 : 0.5 }
					style 			= { _styles.btnResend } 
					onPress 		= { !this.state.loadingResend ? this._onResend : undefined }
				>
					<Text style={ _styles.lblResend }>{ translate("Gửi lại mã code") }</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}

	componentDidMount() {
		this._subscription = SmsListener.addListener( message => {

			if( message && message.body ) {

				let matchCode = message.body.match(regexResetCode);
				let verificationCode = matchCode ? matchCode[1] : this.state.account_mobile_forgot.value;
				this.state.account_mobile_forgot.value !== verificationCode && this.setState({
					account_mobile_forgot: {
						...this.state.account_mobile_forgot,
						value: verificationCode
					}
				});
			}
		} );
	}

	componentWillUnmount() {

		if( this._subscription ) {

			this._subscription.remove();
		}
	}
}

const regexResetCode = /\s(\d{4})/;

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		paddingTop: sizes.margin,
		paddingLeft: sizes.margin,
		paddingRight: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	title: {
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontWeight: "bold",
		color: colors.boldColor,
		fontSize: fontSizes.normal
	},
	titleMessage: {
		fontSize: fontSizes.normal,
		color: colors.boldColor,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		padding: sizes.spacing,
		backgroundColor: colors.descriptionBackground,
		marginTop: sizes.spacing
	},
	input: {
		marginTop: sizes.margin
	},
	btnResend: {
		justifyContent: "center",
		alignItems: "center"
	},
	lblResend: {
		color: colors.primaryColor,
		fontSize: fontSizes.normal,
		textDecorationLine: "underline"
	}
};

export default ForgotPassword;
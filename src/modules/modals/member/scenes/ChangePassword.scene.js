"use strict";
import React from 'react';
import { Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import TextInput from '~/components/TextInput';
import shallowEqual from 'fbjs/lib/shallowEqual';
import passwordService from '~/services/member/password';
import LoadingButton from '~/components/LoadingButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class ChangePassword extends React.Component {

	static displayName = "ChangePassword";

	constructor( props ) {
		super( props );

		this.state = {
			account_password: {
				value: "",
				messageType: null,
				message: "",
				secureTextEntry: true
			},
			account_password_retype: {
				value: "",
				messageType: null,
				message: "",
				secureTextEntry: true
			}
		};

		this._onSubmit = this._onSubmit.bind(this);
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			!shallowEqual( this.state, nextState )
		);
	}

	async _onSubmit() {

		if( !this.state.account_password.value ){

			return this.setState({
				account_password: {
					...this.state.account_password,
					messageType: "error",
					message: translate("Bạn vui lòng đặt mật khẩu mới")
				},
				account_password_retype: {
					...this.state.account_password_retype,
					messageType: null,
					message: ""
				},
				submitLoading: false
			});
		}

		if( this.state.account_password.value.length < 4 ){

			return this.setState({
				account_password: {
					...this.state.account_password,
					messageType: "error",
					message: translate("Mật khẩu tối thiểu 4 ký tự")
				},
				account_password_retype: {
					...this.state.account_password_retype,
					messageType: null,
					message: ""
				}
			});
		}

		if( !this.state.account_password_retype ){

			return this.setState({
				account_password: {
					...this.state.account_password,
					messageType: null,
					message: ""
				},
				account_password_retype: {
					...this.state.account_password_retype,
					messageType: "error",
					message: translate("Vui lòng nhập lại mật khẩu")
				}
			});
		}

		if( this.state.account_password_retype.value !== this.state.account_password.value ){

			return this.setState({
				account_password: {
					...this.state.account_password,
					messageType: null,
					message: ""
				},
				account_password_retype: {
					...this.state.account_password_retype,
					messageType: "error",
					message: translate("Mật khẩu không trùng khớp")
				}
			});
		}

		this.setState({
			account_password: {
				...this.state.account_password,
				messageType: null,
				message: ""
			},
			account_password_retype: {
				...this.state.account_password_retype,
				messageType: null,
				message: ""
			},
			submitLoading: true
		});

		try {
			
			const res = await passwordService.changePassword( this.state.account_password.value, this.state.account_password_retype.value );
			this.setState({
				submitLoading: false
			});
			
			if( res.status === 200 && res.data ){
				
				if( res.data.STATUS === "OK" ){

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Đổi mật khẩu thành công")
					});
					return this.props.navigation.goBack();
				}
			}

			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Đổi mật khẩu không thành công")
			});
		} catch (error) {
			
			alertUtil({
				title: translate("Lỗi"),
				message: translate("Đổi mật khẩu không thành công")
			});
		}
		this.setState({
			submitLoading: false
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
				<Text style={ _styles.title }>{ translate("Đổi mật khẩu") }</Text>

				<TextInput
					ref 			= "account_password"
					label 			= { translate("Password mới") }
					placeholder 	= { translate("Tối thiểu 4 ký tự") }
					type 			= "input"
					returnKeyType 	= "next"
					maxLength 		= { 50 }
					//autoFocus 		= { true }
					secureTextEntry = { this.state.account_password.secureTextEntry }
					style 			= { _styles.input }
					value 			= { this.state.account_password.value }
					messageType 	= { this.state.account_password.messageType }
					onChangeText    = { value => this.setState({
						account_password: {
							...this.state.account_password,
							value
						}
					}) }
					addon 			= { (
						<TouchableOpacity hitSlop={ hitSlop } style={ _styles.addon } onPress={ () => this.setState({
							account_password: {
								...this.state.account_password,
								secureTextEntry: !this.state.account_password.secureTextEntry
							}
						}) }>
							<FAIcon name={ this.state.account_password.secureTextEntry ? "eye-slash" : "eye" } style={ _styles.addonIcon }/>
						</TouchableOpacity>
					) }
					required
				>{ this.state.account_password.message }</TextInput>

				<TextInput
					ref 			= "account_password_retype"
					label 			= { translate("Nhập lại mật khẩu") }
					placeholder 	= { translate("Tối thiểu 4 ký tự") }
					type 			= "input"
					returnKeyType 	= "done"
					maxLength 		= { 50 }
					secureTextEntry = { this.state.account_password_retype.secureTextEntry }
					style 			= { _styles.input }
					value 			= { this.state.account_password_retype.value }
					messageType 	= { this.state.account_password_retype.messageType }
					onChangeText    = { value => this.setState({
						account_password_retype: {
							...this.state.account_password_retype,
							value
						}
					}) }
					addon 			= { (
						<TouchableOpacity hitSlop={ hitSlop } style={ _styles.addon } onPress={ () => this.setState({
							account_password_retype: {
								...this.state.account_password_retype,
								secureTextEntry: !this.state.account_password_retype.secureTextEntry
							}
						}) }>
							<FAIcon name={ this.state.account_password_retype.secureTextEntry ? "eye-slash" : "eye" } style={ _styles.addonIcon }/>
						</TouchableOpacity>
					) }
					required
					onSubmitEditing = { !this.state.submitLoading ? this._onSubmit : undefined }
				>{ this.state.account_password_retype.message }</TextInput>

				<LoadingButton
					onPress 	= { this._onSubmit }
					loading 	= { this.state.loading }
				>{ translate("Cập nhật") }</LoadingButton>
			</ScrollView>
		)
	}
}

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
	input: {
		marginTop: sizes.margin
	},
	addon: {
		backgroundColor: colors.secondBackgroundColor,
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	addonIcon: {
		color: colors.boldColor,
		fontSize: 14 * scale,
		backgroundColor: "transparent"
	}
};

export default ChangePassword;
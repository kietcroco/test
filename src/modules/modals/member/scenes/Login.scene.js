import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import TextInput from '~/components/TextInput';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import LoadingButton from '~/components/LoadingButton';
import loginService from '~/services/member/login';
import passwordService from '~/services/member/password';
import shallowEqual from 'fbjs/lib/shallowEqual';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

import { namespace } from '../constants';
const routeForgotName = `${ namespace }/forgot-password`;
const routeRegisterName = `${ namespace }/register`;

class Login extends React.Component {
	
	static displayName = "Login";
	
	constructor( props ) {
		super( props );

		const {
			params: {
				username = "",
				password = ""
			} = {}
		} = props.navigation.state || {};

		this.state = {
			username: {
				value: username,
				messageType: null,
				message: ""
			},
			password: {
				value: password,
				messageType: null,
				secureTextEntry: true,
				message: ""
			},
			loginMessage: "",
			forgot: {
				value: "",
				messageType: null,
				message: ""
			},
			loading: false
		};

		this._onSubmit = this._onSubmit.bind( this );
		this._forgotOnSubmit = this._forgotOnSubmit.bind( this );
	}

	componentWillReceiveProps(nextProps) {

        if( this.props.token !== nextProps.token && nextProps.token ) {

			nextProps.navigation.goBack();
		}

		const { params } = this.props.navigation.state || {};
		const { params: nextParams } = nextProps.navigation.state || {};

		if( !shallowEqual( params, nextParams ) ) {

			
			const {
				params: {
					username,
					password
				} = {}
			} = nextProps.navigation.state || {};

			this.setState({
				username: {
					value: username,
					messageType: null,
					message: ""
				},
				password: {
					value: password,
					messageType: null,
					message: ""
				}
			});
		}
    }

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.loading !== nextState.loading ||
			!shallowEqual( this.state, nextState )
		);
	}

	async _onSubmit() {

		if( !this.state.username.value || !this.state.password.value ){

			return this.setState({
				username: {
					...this.state.username,
					messageType: this.state.username.value ? null : "error",
					message: !this.state.username.value ? translate("Bạn chưa nhập username") : ""
				},
				password: {
					...this.state.password,
					messageType: this.state.password.value ? null : "error",
					message: !this.state.password.value ? translate("Bạn chưa nhập mật khẩu") : ""	
				}
			});
		}

		this.setState({
			username: {
				...this.state.username,
				messageType: null,
				message: ""
			},
			password: {
				...this.state.password,
				messageType: null,
				message: ""
			},
			loginMessage: "",
			loading: true
		});

		try {

			let res = await loginService.login( this.state.username.value, this.state.password.value );
			this.setState({
				loading: false
			});
			
			if( res.status === 200 && res.data ) {

				if( res.data.STATUS === "OK" ) {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Đăng nhập thành công")
					});

					return this.props.navigation.goBack();
				}
			}

			alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Đăng nhập không thành công")
			});
		} catch( e ) {

			alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Đăng nhập không thành công")
			});
		}

		this.setState({
			username: {
				...this.state.username,
				messageType: "error"
			},
			password: {
				...this.state.password,
				messageType: "error"
			},
			loginMessage: translate("Đăng nhập không thành công"),
			loading: false
		});
	}

	async _forgotOnSubmit() {

		if( !this.state.forgot.value || this.state.forgot.value.length < 10 ) {

			return this.setState({
				forgot: {
					...this.state.forgot,
					messageType: "error",
					message: translate("Bạn vui lòng nhập số điện thoại")
				},
				loading: false
			});
		}

		this.setState({
			forgot: {
				...this.state.forgot,
				messageType: null,
				message: ""
			},
			loading: true
		});

		try {
			
			const res = await passwordService.forgetPassword( this.state.forgot.value );

			this.setState({
				loading: false
			});
			if( res.status === 200 && res.data ){
				
				if( res.data.STATUS === "OK" ) {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Đã gửi yêu cầu lấy lại mật khẩu")
					});
					return this.props.navigation.replace(routeForgotName, {
						account_mobile: this.state.forgot.value
					});
				}
			}

			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu lấy lại mật khẩu không thành công")
			});
		} catch (error) {
			alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Yêu cầu lấy lại mật khẩu không thành công")
			});
		}
		this.setState({
			loading: false
		});
	}

	render() {

		const { navigation } = this.props;

		return (
			<ScrollView
				style 							= { _styles.wrapper }
				horizontal 						= { false }
				keyboardDismissMode 			= "interactive"	
				keyboardShouldPersistTaps 		= "always"	
				showsHorizontalScrollIndicator 	= { false }
				contentContainerStyle 			= { _styles.container }
			>
				<View style={ _styles.blockTitle }>
					<Text style={ _styles.text }>{ `${translate("Bạn đã là thành viên IZIFIX chưa")}?` }</Text>
					<Text style={ _styles.text }>{ `${translate("Nếu là thành viên vui lòng đăng nhập")}:` }</Text>
				</View>
				<View style={ _styles.block }>
					<TextInput
						ref 			= "username"
						label 			= { translate("Bạn vui lòng nhập username hoặc số điện thoại") }
						placeholder 	= "Username"
						type 			= "input"
						returnKeyType 	= "next"
						maxLength 		= { 30 }
						style 			= { _styles.input }
						//autoFocus 		= { true }
						messageType 	= { this.state.username.messageType }
						value 			= { this.state.username.value }
						placeholderTextColor={ colors.placeholderColor }
						onChangeText 	= { (value: String = "") => this.setState({
							username: {
								...this.state.username,
								value
							}
						}) }
						onSubmitEditing = { () => this.refs.password.focus() }
						onEndEditing 	= { () => {

							this.setState({
								username: {
									...this.state.username,
									value: this.state.username.value ? this.state.username.value.toUpperCase() : ""
								}
							});
						} }
						required
					>{ this.state.username.message }</TextInput>
					<TextInput
						ref 			= "password"
						label 			= { translate("Vui lòng nhập mật khẩu") }
						placeholder 	= "Password"
						type 			= "input"
						returnKeyType 	= "done"
						maxLength 		= { 50 }
						//caretHidden 	= { true }
						secureTextEntry = { this.state.password.secureTextEntry }
						style 			= { _styles.input }
						messageType 	= { this.state.password.messageType }
						value 			= { this.state.password.value }
						placeholderTextColor={ colors.placeholderColor }
						onChangeText 	= { value => this.setState({
							password: {
								...this.state.password,
								value
							}
						}) }
						addon 			= { 
							<TouchableOpacity hitSlop={ hitSlop } style={ _styles.addon } onPress={ () => this.setState({
								password: {
									...this.state.password,
									secureTextEntry: !this.state.password.secureTextEntry
								}
							}) }>
								<FAIcon name={ this.state.password.secureTextEntry ? "eye" : "eye-slash" } style={ _styles.iconAddon }/>
							</TouchableOpacity>
						}
						onSubmitEditing = { this._onSubmit }
						required
					>{ this.state.password.message }</TextInput>
					{
						!!this.state.loginMessage &&
							<Text style={ _styles.serverMessage }>{ this.state.loginMessage }</Text>
					}
					<LoadingButton
						loading 	= { this.state.loading }
						onPress 	= { this._onSubmit }
					>{ translate("Đăng nhập") }</LoadingButton>
				</View>
				<View style={ _styles.block }>
					<Text style={ _styles.description }>{ `${translate("Nếu bạn chưa là thành viên")} IZIFIX ${translate("vui lòng đăng ký thành viên")} IZIFIX.` }</Text>
				</View>
				<View style={ _styles.block }>
					<LoadingButton
						loading 	= { this.state.loading }
						onPress 	= { () => navigation.navigate(routeRegisterName, {
							account_code: this.state.username.value,
							account_password: this.state.password.value
						}) }
					>{ translate("Đăng ký") }</LoadingButton>
				</View>
				<View style={ _styles.block }>
					<Text style={ _styles.description }>{ `${translate("Bạn quên username/ password")}? ${translate("Vui lòng nhập số điện thoại")} IZIFIX ${translate("sẽ tự cấp lại thông tin")}.` }</Text>
				</View>
				<View style={ _styles.block }>
					<TextInput
						ref 			= "forgot"
						label 			= { translate("Nhập số điện thoại") }
						placeholder 	= { translate("Để nhận lại username/ password") }
						type 			= "input"
						returnKeyType 	= "done"
						maxLength 		= { 15 }
						style 			= { _styles.input }
						messageType 	= { this.state.forgot.messageType }
						value 			= { this.state.forgot.value }
						placeholderTextColor={ colors.placeholderColor }
						onChangeText 	= { value => this.setState({
							forgot: {
								...this.state.forgot,
								value
							}
						}) }
						onSubmitEditing = { this._forgotOnSubmit }
					>{ this.state.forgot.message }</TextInput>
					<LoadingButton
						loading 		= { this.state.loading }
						onPress 		= { this._forgotOnSubmit }
					>{ translate("Lấy lại thông tin") }</LoadingButton>
				</View>
			</ScrollView>
		);
	}

	componentDidMount() {

		this.props.token && this.props.navigation.goBack();
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		marginHorizontal: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	block: {
		marginVertical: sizes.spacing
	},
	blockTitle: {
		marginVertical: sizes.spacing,
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing
	},
	input: {
		marginBottom: sizes.margin
	},
	text: {
		fontSize: fontSizes.normal,
		color: colors.boldColor,
		fontWeight: "bold"
	},
	addon: {
		flex: 1,
		width: "100%",
		justifyContent: 'center',
		alignItems: "center",
		backgroundColor: colors.secondBackgroundColor
	},
	iconAddon: {
		fontSize: 16 * scale,
		color: colors.boldColor,
		backgroundColor: "transparent"
	},
	serverMessage: {
		textAlign: "center",
		marginBottom: sizes.spacing,
		color: colors.errorColor
	},
	description: {
		backgroundColor: colors.descriptionBackground,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default Login;
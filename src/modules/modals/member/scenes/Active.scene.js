"use strict";
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { translate } from '~/utilities/language';
//import TextInput from '~/components/TextInput';
import SmsListener from 'react-native-android-sms-listener';
import LoadingButton from '~/components/LoadingButton';
import activeService from '~/services/member/active';
import shallowEqual from 'fbjs/lib/shallowEqual';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';
import ActiveCode from '../components/ActiveCode';

import { namespace } from '../constants';
const changePasswordRouteName = `${namespace}/change-password`;

class Active extends React.Component {

	static displayName = "Active";

	constructor(props) {
		super(props);

		this.state = {
			comfirm_code: {
				value: "",
				messageType: null,
				message: ""
			}
		};
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
				{/*
					<Text style={_styles.title}>{translate("Xác minh số điện thoại")}</Text>
				*/}
				<Text style={_styles.title}>{translate("Số điện thoại kích hoạt")}</Text>
				{/*

					<Text style={_styles.message}>{`${translate("IZIFIX sẽ gửi mã code 4 ký tự đến số điện thoại")}`}</Text>
				*/}
				<Text style={{
					paddingVertical: 20,
					fontSize: 18,
					fontWeight: "bold",
					textAlign: "center"
				}}>{`0965544750`}</Text>
				<ActiveCode 
					
				/>
				<LoadingButton
					loading = {this.state.loadingSubmit}
					onPress = {this._onSubmit}
				>{translate("Kích hoạt")}</LoadingButton>
				<TouchableOpacity hitSlop={ hitSlop } style={_styles.resend} onPress={!this.state.loadingResend && !this.state.loadingSubmit ? this._onResend : undefined}>
					<Text style={_styles.resendLabel}>{translate("Gửi lại mã code")}</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}

	componentDidMount() {

		const {
			state: {
				params: {
					account_mobile
				} = {}
			} = {}
		} = this.props.navigation;

		if (!account_mobile) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Không tìm thấy thông tin tài khoản")
			});
			return this.props.navigation.goBack();
		}
		this._subscription = SmsListener.addListener(message => {

			if (message && message.body) {

				let matchCode = message.body.match(regexActiveCode);
				let verificationCode = matchCode ? matchCode[1] : this.state.text;

				this.state.comfirm_code.value !== verificationCode && this.setState({
					...this.state.comfirm_code,
					value: verificationCode
				});
			}
		});
	}

	componentWillUnmount() {

		if (this._subscription) {

			this._subscription.remove();
		}
	}

	_onChangeText = (value: String = "") => {

		this.setState({
			comfirm_code: {
				value,
				messageType: null,
				message: ""
			},
			loadingSubmit: false,
			loadingResend: false
		});
	};

	_onSubmit = async () => {

		if (!this.state.comfirm_code.value) {

			return this.setState({
				comfirm_code: {
					...this.state.comfirm_code,
					messageType: "error",
					message: translate("Bạn vui lòng nhập mã xác nhận")
				}
			});
		}

		if (this.state.comfirm_code.value.length < 4) {

			return this.setState({
				comfirm_code: {
					...this.state.comfirm_code,
					messageType: "error",
					message: translate("Mã xác nhận không chính xác")
				}
			});
		}

		!this.state.loadingSubmit && this.setState({
			loadingSubmit: true
		});

		try {

			const {
				state: {
					params: {
						account_mobile
					} = {}
				} = {}
			} = this.props.navigation;

			const res = await activeService.active(account_mobile, this.state.comfirm_code.value);

			this.state.loadingSubmit && this.setState({
				loadingSubmit: false
			});

			if (res.status === 200 && res.data) {

				if (res.data.STATUS === "OK") {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Kích hoạt thành công")
					});

					let news = res.data.news;

					if (news) {

						let newsRivers = [];
						let newsRoads = [];
						let newsSeas = [];

						if (!Array.isArray(news)) {

							news = [news];
						}

						news.forEach(item => {

							if (item && item.exchanges) {

								let exchange = item.exchanges.split("_");
								exchange = exchange ? exchange[0] : "";
								exchange = exchange.toLowerCase();

								switch (exchange) {
									case "rivers":

										newsRivers.push(item);
										break;
									case "roads":

										newsRoads.push(item);
										break;
									case "seas":

										newsSeas.push(item);
										break;
								}
							}
						});

						if (newsRivers.length) {

							this.props.dispatch({
								type: "/rivers/list#newOffers",
								payload: {
									data: newsRivers
								}
							});
						}

						if (newsRoads.length) {

							this.props.dispatch({
								type: "/roads/list#newOffers",
								payload: {
									data: newsRoads
								}
							});
						}

						if (newsSeas.length) {

							this.props.dispatch({
								type: "/seas/list#newOffers",
								payload: {
									data: newsSeas
								}
							});
						}

					}

					return this.props.navigation.replace(changePasswordRouteName, {});
				}

			}

			return alertUtil({
				messageTitle: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Kích hoạt không thành công")
			});
		} catch (error) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Kích hoạt không thành công")
			});
		}
		this.setState({
			loadingSubmit: false
		});
	};

	_onResend = async () => {

		this.setState({
			loadingResend: true
		});

		try {
			const {
				state: {
					params: {
						account_mobile
					} = {}
				} = {}
			} = this.props.navigation;

			const res = await activeService.reSendActiveCode(account_mobile);
			this.setState({
				loadingResend: false
			});

			if (res.status === 200 && res.data) {

				return alertUtil({
					title: res.data.messageTitle || translate("Thông báo"),
					message: res.data.message || translate("Gửi lại mã thành công")
				});
			}
			alertUtil({
				title: translate("Thông báo"),
				message: translate("Gửi lại mã không thành công")
			});
		} catch (error) {

			alertUtil({
				title: translate("Thông báo"),
				message: translate("Gửi lại mã không thành công")
			});
		}

		this.setState({
			loadingResend: false
		});
	};
}

const regexActiveCode = /\s(\d{4})/;

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		paddingHorizontal: sizes.margin,
		paddingTop: sizes.margin,
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
	message: {
		backgroundColor: colors.descriptionBackground,
		width: "100%",
		padding: 2 * scale,
		marginVertical: sizes.margin,
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	resend: {
		marginTop: sizes.margin,
		justifyContent: "center",
		alignItems: "center"
	},
	resendLabel: {
		color: colors.primaryColor,
		fontSize: fontSizes.normal,
		textDecorationLine: "underline"
	},
	input: {
		marginBottom: sizes.margin
	}
};

export default Active;
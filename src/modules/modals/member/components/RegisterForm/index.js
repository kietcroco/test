"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TextInput from '~/components/TextInput';
import { translate } from '~/utilities/language';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '~/components/CheckBox';
import Collapsible from '~/components/Collapsible';
import AddImage from '~/components/AddImage';
import ModalAgreement from '~/components/ModalAgreement';
import shallowEqual from 'fbjs/lib/shallowEqual';
import generateState from './utilities/generateState';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import showImagePicker from '~/utilities/showImagePicker';
import LoadingButton from '~/components/LoadingButton';
import { namespace } from '../../constants';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';
import { rulesLink } from '~/configs/application';

import {
	account_company_name as companyName,
	account_code as accountCode,
	account_password as accountPassword,
	account_mobile as accountMobile,
	account_email as accountMail,
	account_company_address as companyAddress,
	account_tax_code as companyTaxCode,
	account_contact as accountContact,
	account_company_introduce as companyIntro,
	account_legal_paper as accountPaper,
	submit
} from './mixins';

const forgetPasswordRouteName = `${namespace}/forget-password`;

class RegisterForm extends React.Component {

	static displayName = "RegisterForm";

	static propTypes = {
		source: PropTypes.object,
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool
	};

	static defaultProps = {
		loading: false
	};

	constructor(props) {
		super(props);

		this.state = generateState(props.source || {});
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.loading !== nextProps.loading && this.props.source != nextProps.source) {

			this.setState(generateState(nextProps.source, this.state));
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.props.loading !== nextProps.loading ||
			!shallowEqual(this.state, nextState)
			//!shallowEqual( this.props.source, nextState.source )
		);
	}

	render() {

		return (
			<View>
				<TextInput
					ref                  = "account_company_name"
					label                = {translate("Nhập tên công ty theo giấy phép ĐKKD")}
					type                 = "input"
					returnKeyType        = "next"
					//autoFocus            = {true}
					style                = {_styles.input}
					value                = {this.state.account_company_name.value}
					//messageType          = {this.state.account_company_name.messageType}
					onChangeText         = {companyName.inputOnChangeText.bind(this)}
					placeholderTextColor = { colors.placeholderColor }
					maxLength 			 = {100}
					required
				>{/*this.state.account_company_name.message*/}</TextInput>

				<TextInput
					ref                  = "account_code"
					label                = {translate("Nhập mã c.ty làm Username đăng nhập")}
					type                 = "input"
					returnKeyType        = "next"
					style                = {_styles.input}
					maxLength            = {5}
					value                = {this.state.account_code.value}
					messageType          = {this.state.account_code.messageType}
					onChangeText         = {accountCode.inputOnChangeText.bind(this)}
					onEndEditing         = {accountCode.inputOnEndEditing.bind(this)}
					placeholderTextColor = { colors.placeholderColor }
					required
				>{
					!this.state.account_code.isDuplicate ?
						this.state.account_code.message :
						<View>
							<Text style={_styles.duplicateMessageTitle}><Text style={_styles.duplication}>{this.state.account_code.value}</Text> {translate("Đã được đăng ký trên IZIFIX")}.</Text>
							<Text style={_styles.duplicateMessage}>{translate("Bạn chắc rằng bạn đã đăng ký thành viên IZIFIX")}?</Text>
							<Text style={_styles.duplicateMessage}>{translate("Nếu bạn quên tài khoản")}, <Text style={_styles.duplicateForget} onPress={() => this.props.navigation.navigate(forgetPasswordRouteName, {
								account_mobile: this.state.account_mobile.value || ""
							})}>{translate("click vào đây")}</Text> {translate("để lấy thông tin truy cập")}</Text>
							<Text style={_styles.duplicateMessage}>{translate("Bạn không chắc đã đăng ký thành viên trên IZIFIX hoặc bạn muốn đăng ký lại")}.</Text>
							<Text style={_styles.duplicateMessage}>{translate("Bạn có thể chọn các mã sau")}:</Text>
							{
								this.state.account_code.suggestion &&
								<View style={_styles.suggestRow}>
									<Text style={_styles.duplicateSuggestLabel}>{translate("Mã gợi ý")}:</Text>
									{
										this.state.account_code.suggestion.map((s, i) => {

											return (
												<Text style={_styles.suggestion} onPress={() => this.setState({
													account_code: {
														...this.state.account_code,
														value: s,
														messageType: "success",
														message: "",
														suggestion: [],
														isDuplicate: false
													}
												})} key={`suggestion-${i}`}>{s}</Text>
											);
										})
									}
								</View>
							}
						</View>
				}</TextInput>

				<TextInput
					ref                        = "account_password"
					label                      = {translate("Password")}
					type                       = "input"
					returnKeyType              = "next"
					style                      = {_styles.input}
					maxLength                  = {50}
					value                      = {this.state.account_password.value}
					messageType                = {this.state.account_password.messageType}
					secureTextEntry            = {this.state.account_password.secureTextEntry}
					onChangeText               = {accountPassword.inputOnChangeText.bind(this)}
					onEndEditing               = {accountPassword.inputOnEndEditing.bind(this)}
					placeholderTextColor       = { colors.placeholderColor }
					required
					addon                      = {(
						<TouchableOpacity hitSlop = { hitSlop } style                                         = {_styles.addon} onPress = {accountPassword.secureOnPress.bind(this)}>
							<FAIcon name             = {this.state.account_password.secureTextEntry ? "eye-slash": "eye"} style            = {_styles.addonIcon} />
						</TouchableOpacity>
					)}
				>{this.state.account_password.message}</TextInput>

				<TextInput
					ref                  = "account_mobile"
					label                = {translate("Nhập số điện thoại di động")}
					type                 = "input"
					returnKeyType        = "next"
					keyboardType         = "phone-pad"
					maxLength            = {15}
					style                = {_styles.input}
					value                = {this.state.account_mobile.value}
					messageType          = {this.state.account_mobile.messageType}
					onChangeText         = {accountMobile.inputOnChangeText.bind(this)}
					onEndEditing         = {accountMobile.inputOnEndEditing.bind(this)}
					placeholderTextColor = { colors.placeholderColor }
					required
				>{
						!this.state.account_mobile.isDuplicate ?
							this.state.account_mobile.message :
							<View>
								<Text style={_styles.duplicateMessageTitle}>{translate("Số điện thoại")} <Text style={_styles.duplication}>{this.state.account_mobile.value}</Text> {translate("Đã được đăng ký trên IZIFIX")}.</Text>
								<Text style={_styles.duplicateMessage}>{translate("Bạn chắc rằng bạn đã đăng ký thành viên IZIFIX")}?</Text>
								<Text style={_styles.duplicateMessage}>{translate("Nếu bạn quên tài khoản")}, <Text style={_styles.duplicateForget} onPress={() => this.props.navigation.navigate(forgetPasswordRouteName, {
									account_mobile: this.state.account_mobile.value || ""
								})}>{translate("click vào đây")}</Text> {translate("để lấy thông tin truy cập")}</Text>
							</View>
					}</TextInput>

				<TextInput
					ref                  = "account_email"
					label                = {translate("Nhập Email liên hệ")}
					type                 = "input"
					returnKeyType        = {this.state.moreInfoHidden ? "done": "next"}
					keyboardType         = "email-address"
					maxLength            = {254}
					style                = {_styles.input}
					value                = {this.state.account_email.value}
					messageType          = {this.state.account_email.messageType}
					onChangeText         = {accountMail.inputOnChangeText.bind(this)}
					onEndEditing         = {accountMail.inputOnEndEditing.bind(this)}
					placeholderTextColor = { colors.placeholderColor }
					required
				>{
						!this.state.account_email.isDuplicate ?
							this.state.account_email.message :
							<View>
								<Text style={_styles.duplicateMessageTitle}>{translate("Email")} <Text style={_styles.duplication}>{this.state.account_email.value}</Text> {translate("Đã được đăng ký trên IZIFIX")}.</Text>
								<Text style={_styles.duplicateMessage}>{translate("Bạn chắc rằng bạn đã đăng ký thành viên IZIFIX")}?</Text>
								<Text style={_styles.duplicateMessage}>{translate("Nếu bạn quên tài khoản")}, <Text style={_styles.duplicateForget} onPress={() => this.props.navigation.navigate(forgetPasswordRouteName, {
									account_mobile: this.state.account_mobile.value || ""
								})}>{translate("click vào đây")}</Text> {translate("để lấy thông tin truy cập")}</Text>
							</View>
					}</TextInput>

				<Collapsible
					collapsed={this.state.moreInfoHidden}
					style={_styles.collapse}
				>
					<View style={_styles.moreWrapper}>
						<View style={_styles.moreContainer}>
							<TextInput
								ref                  = "account_company_address"
								label                = {translate("Nhập địa chỉ công ty")}
								placeholder          = {translate("Để tăng uy tín hơn")}
								type                 = "input"
								returnKeyType        = "next"
								style                = {_styles.input}
								maxLength 			 = {100}
								value                = {this.state.account_company_address}
								onChangeText         = {companyAddress.inputOnChangeText.bind(this)}
								placeholderTextColor = { colors.placeholderColor }
							></TextInput>

							<TextInput
								ref                  = "account_tax_code"
								label                = {translate("Nhập mã số thuế")}
								placeholder          = {translate("Để tăng uy tín hơn")}
								type                 = "input"
								returnKeyType        = "next"
								keyboardType         = "numeric"
								maxLength            = {10}
								style                = {_styles.input}
								value                = {this.state.account_tax_code.value}
								messageType          = {this.state.account_tax_code.messageType}
								onChangeText         = {companyTaxCode.inputOnChangeText.bind(this)}
								onEndEditing         = {companyTaxCode.inputOnEndEditing.bind(this)}
								placeholderTextColor = { colors.placeholderColor }
							>{
									!this.state.account_tax_code.isDuplicate ?
										this.state.account_tax_code.message :
										<Text style={_styles.duplicateMessageTitle}>{translate("Mã số thuế")} <Text style={_styles.duplication}>{this.state.account_tax_code.value}</Text> {translate("Đã được đăng ký trên IZIFIX")}.</Text>
								}</TextInput>

							<TextInput
								ref                         = "account_legal_paper"
								label                       = {translate("Chụp hình giấy phép kinh doanh")}
								placeholder                 = {translate("Để tăng uy tín hơn")}
								type                        = "input"
								returnKeyType               = "next"
								style                       = {_styles.input}
								editable                    = {false}
								value                       = {this.state.account_legal_paper}
								placeholderTextColor        = { colors.placeholderColor }
								addon                       = {(
									<TouchableOpacity  hitSlop = { hitSlop } style   = {_styles.addon} onPress = {accountPaper.addonOnPress.bind(this)}>
										<MTIcon name              = "add-a-photo" style = {_styles.addonIcon} />
									</TouchableOpacity>
								)}
							></TextInput>

							<TextInput
								ref                  = "account_contact"
								label                = {translate("Nhập người phụ trách")}
								placeholder          = {translate("Để tăng uy tín hơn")}
								type                 = "input"
								returnKeyType        = "next"
								maxLength 			 = {100}
								style                = {_styles.input}
								value                = {this.state.account_contact}
								onChangeText         = {accountContact.inputOnChangeText.bind(this)}
								placeholderTextColor = { colors.placeholderColor }
							></TextInput>

							<TextInput
								ref                  = "account_company_introduce"
								label                = {translate("Nhập thông tin ghi chú")}
								type                 = "textarea"
								rows                 = {2}
								returnKeyType        = "done"
								maxLength 			 = {2000}
								style                = {_styles.input}
								value                = {this.state.account_company_introduce}
								onChangeText         = {companyIntro.inputOnChangeText.bind(this)}
								placeholderTextColor = { colors.placeholderColor }
							></TextInput>

							<View style={_styles.rowImages}>
								{
									this.state.account_images.map(({ source = null, info = {} }, index) => {

										const onRemove = () => {

											const account_images = this.state.account_images.slice();
											account_images.splice(index, 1);

											this.setState({
												account_images
											});
										};

										return (
											<AddImage
												key      = {`account_images-${index}`}
												source   = {source}
												onError  = {onRemove}
												onRemove = {onRemove}
												onPress  = {async () => {
													try {

														const res = await showImagePicker();

														if (!res.didCancel && res.data) {

															const account_images = this.state.account_images.slice();

															account_images[index] = {
																source: { uri: `data:${res.type};base64,${res.data}` },
																info: {
																	name: res.fileName,
																	size: res.fileSize,
																	type: res.type,
																	width: res.width,
																	height: res.height,
																	isVertical: res.isVertical,
																	originalRotation: res.originalRotation
																}
															};

															this.setState({
																account_images
															});
														}
													} catch (e) {
														alertUtil({
															title: translate("Lỗi"),
															message: translate("Chọn hình không thành công")
														});
													}
												}}
											/>
										);
									})
								}
								<AddImage
									onPress={async () => {

										try {

											const res = await showImagePicker();

											if (!res.didCancel && res.data) {

												const account_images = this.state.account_images.slice();

												account_images.push({
													source: { uri: `data:${res.type};base64,${res.data}` },
													info: {
														name: res.fileName,
														size: res.fileSize,
														type: res.type,
														width: res.width,
														height: res.height,
														isVertical: res.isVertical,
														originalRotation: res.originalRotation
													}
												});

												this.setState({
													account_images
												})
											}
										} catch (e) {

											alertUtil({
												title: translate("Lỗi"),
												message: translate("Chọn hình không thành công")
											});
										}
									}}
								>
								</AddImage>
							</View>
						</View>

						<TouchableOpacity  hitSlop={ hitSlop } activeOpacity={1} style={_styles.btnCompact} onPress={() => this.setState({
							moreInfoHidden: true
						})}>
							<Text style={_styles.lblCompact}>{translate("Rút gọn")}</Text>
							<FAIcon name="times" style={_styles.iconCompact} />
						</TouchableOpacity>
					</View>
				</Collapsible>

				<TouchableOpacity style={_styles.agreementWrapper} onPress={() => this.setState({
					agreement: !this.state.agreement
				})}>
					<CheckBox
						checked={this.state.agreement}
						style={_styles.agreementCheckBox}
					/>
					<View style={_styles.agreement}>
						<Text style={_styles.agreementText}>{translate("Tôi đồng ý với các")} </Text>
						<TouchableOpacity onPress={() => this.setState({
							modalVisible: true
						})}>
							<Text style={_styles.rulesText}>{translate("điều khoản và điều lệ")}</Text>
						</TouchableOpacity>
						<Text style={_styles.agreementText}> {translate("trên IZIFIX")}</Text>
					</View>
					{
						this.state.agreement !== null && <FAIcon name={this.state.agreement ? "check" : "times"} style={[_styles.agreementFeedbackIcon, {
							color: this.state.agreement ? colors.successColor : colors.errorColor
						}]} />
					}
				</TouchableOpacity>

				<LoadingButton
					loading={this.props.loading}
					onPress={submit.bind(this)}
				>{translate("Đăng ký ngay")}</LoadingButton>
				{
					this.state.moreInfoHidden &&
					<Text style={_styles.description}>{translate("Hoặc thêm thông tin đầy đủ để góp phần làm tin đăng của bạn uy tín hơn")}</Text>
				}
				{
					this.state.moreInfoHidden &&
					<TouchableOpacity style={_styles.btnMore} onPress={() => this.setState({
						moreInfoHidden: false
					}, () => this.refs.account_company_address.focus())}>
						<Text style={_styles.lblMore}>{translate("Hoặc thêm thông tin")}</Text>
					</TouchableOpacity>
				}

				<ModalAgreement
					source         = {sourceRules}
					visible        = {this.state.modalVisible}
					onRequestClose = {() => this.setState({
						modalVisible  : false
					})}
					onAgree        = {() => this.setState({
						modalVisible  : false,
						agreement     : true
					})}
				/>
			</View>
		)
	}
}

const sourceRules = {uri: rulesLink};

const _styles = {
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
	},
	agreementWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: sizes.margin
	},
	agreement: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		flex: 1
	},
	agreementCheckBox: {
		marginRight: sizes.margin
	},
	agreementText: {
		color: colors.primaryColor,
		fontSize: fontSizes.normal
	},
	rulesText: {
		color: colors.primaryColor,
		fontWeight: "bold",
		textDecorationLine: "underline",
		fontSize: fontSizes.normal
	},
	agreementFeedbackIcon: {
		fontSize: 16 * scale,
		marginLeft: sizes.margin,
		color: colors.boldColor
	},
	description: {
		backgroundColor: colors.descriptionBackground,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		marginTop: sizes.margin,
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	btnMore: {
		backgroundColor: colors.buttonMoreColor,
		borderWidth: sizes.borderWidth,
		borderColor: colors.buttonMoreBorder,
		borderRadius: sizes.borderRadius,
		marginTop: sizes.margin,
		justifyContent: "center",
		alignItems: "center",
		height: sizes.submitButton
	},
	lblMore: {
		color: colors.secondColor,
		fontWeight: "bold",
		fontSize: fontSizes.normal
	},
	collapse: {
		marginTop: sizes.margin
	},
	moreWrapper: {
		position: "relative",
		paddingBottom: sizes.margin * 2
	},
	moreContainer: {
		borderWidth: sizes.borderWidth,
		borderColor: "silver",
		borderRadius: sizes.borderRadius,
		padding: sizes.spacing
	},
	rowImages: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: sizes.margin
	},
	btnCompact: {
		flexDirection: "row",
		position: "absolute",
		bottom: sizes.margin,
		right: sizes.margin,
		backgroundColor: colors.secondColor,
		paddingHorizontal: sizes.spacing,
		justifyContent: "center",
		alignItems: "center"
	},
	lblCompact: {
		fontSize: fontSizes.large,
		color: colors.boldColor
	},
	iconCompact: {
		fontSize: 18 * scale,
		color: colors.boldColor,
		marginLeft: sizes.spacing
	},
	duplicateMessage: {
		color: colors.errorColor,
		fontSize: fontSizes.normal
	},
	duplicateMessageTitle: {
		color: colors.errorColor,
		fontWeight: "bold",
		fontSize: fontSizes.normal
	},
	duplicateForget: {
		color: colors.primaryColor,
		fontSize: fontSizes.normal
	},
	duplicateSuggestLabel: {
		color: colors.normalColor,
		fontSize: fontSizes.normal
	},
	suggestRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center"
	},
	suggestion: {
		backgroundColor: colors.secondBackgroundColor,
		color: colors.primaryColor,
		margin: sizes.spacing,
		padding: sizes.spacing,
		borderRadius: sizes.borderRadius,
		fontSize: fontSizes.normal
	},
	duplication: {
		color: colors.primaryColor,
		fontWeight: "bold",
		fontSize: fontSizes.normal
	}
};

export default RegisterForm;
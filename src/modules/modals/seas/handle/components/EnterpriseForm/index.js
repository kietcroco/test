import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Avatar from '~/components/Avatar';
import TextInput from '~/components/TextInput';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import TagsInput from '~/components/TagsInput';

import careerJSON from './data/career';
import { translate, getCurrentLanguage } from '~/utilities/language';
import { regex } from '~/utilities/isEmail';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';

import {
	account_company_name as mixinsAccountCompanyName, // tên công ty
	account_company_name_acronym as mixinsAccountCompanyNameAcronym, // tên viết tắt
	enterprise_seas_career as mixinsCareer, // ngành nghề
	enterprise_seas_vehicle_counter as mixinsVehicleCounter, // tổng số phương tiện
	account_company_address as mixinsAccountCompanyAddress, // địa chỉ công ty
	account_phone as mixinsAccountPhone, // điện thoại cố định
	account_mobile as mixinsAccountMobile, // điện thoại di động
	account_email as mixinsAccountEmail, // email
	account_website as mixinsAccountWebsite, // website
	account_tax_code as mixinsAccountTaxCode, // mã số thuế
	account_company_introduce as mixinsAccountCompanyIntroduce, // giới thiệu
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import _styles from '../../assets/formStyles';

class EnterpriseForm extends React.Component {

	static displayName = '@EnterpriseForm';

	static propTypes = {
		source: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		isUpdate : PropTypes.bool
	};

	static defaultProps = {
		loading: false
	};

	constructor(props) {
		super(props);

		this.state = generateState(props.source);
		this._onPressAvatar = this._onPressAvatar.bind(this);
		this._addImage = this._addImage.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.source != nextProps.source) {

			this.setState(generateState(nextProps.source, this.state));
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.props.loading !== nextProps.loading ||
			!shallowEqual(this.state, nextState)
		);
	}

	async _onPressAvatar() {

		try {

			const res = await showImagePicker();

			if (!res.didCancel && res.data) {

				this.setState({
					account_company_logo: {
						...this.state.account_company_logo,
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
					}
				});
			}
		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Chọn hình không thành công")
			});
		}
	}

	async _addImage() {
		try {

			const res = await showImagePicker();

			if (!res.didCancel && res.data) {

				const account_images_information = this.state.account_images_information.slice();

				account_images_information.push({
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
					account_images_information
				});
			}
		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Chọn hình không thành công")
			});
		}
	}

	render() {

		const language = getCurrentLanguage();

		return (
			<View>

				{ /**Hình đại diện */}
				<Avatar
					isHandle
					source 				= { this.state.account_company_logo.source }
					onPress 			= { this._onPressAvatar }
				>{ this.state.account_company_logo.code }</Avatar>

				<TextInput
					ref 				= "account_company_name"
					label 				= {translate("#$seas$#Tên công ty")}
					placeholder 		= {translate("#$seas$#Nhập tên công ty")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					maxLength 			= { 100 }
					//messageType 		= {this.state.account_company_name.messageType}
					value 				= {this.state.account_company_name.value}
					onChangeText 		= {mixinsAccountCompanyName.inputOnChangeText.bind(this)}
					required
				>{ /*this.state.account_company_name.message*/ }</TextInput>

				<TextInput
					ref 				= "account_company_name_acronym"
					label 				= {translate("#$seas$#Tên công ty viết tắt")}
					placeholder 		= {translate("#$seas$#Nhập tên công ty viết tắt")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					maxLength 			= { 50 }
					//messageType 		= {this.state.account_company_name_acronym.messageType}
					onChangeText 		= {mixinsAccountCompanyNameAcronym.inputOnChangeText.bind(this)}
					value 				= {this.state.account_company_name_acronym.value}
				>{ /*this.state.account_company_name_acronym.message*/ }</TextInput>

				<TextInput
					ref 				= "enterprise_seas_career"
					label 				= {translate("#$seas$#Ngành nghề chính")}
					placeholder 		= {translate("#$seas$#Chọn")}
					type 				= "select"
					style 				= {_styles.input}
					//messageType 		= {this.state.enterprise_seas_career.messageType}
					value 				= {this.state.enterprise_seas_career.label}
					onPress 			= {mixinsCareer.inputOnPress.bind(this)}
					required
				>{/*this.state.enterprise_seas_career.message*/}</TextInput>
				<ModalCollapse
					visible 			= {this.state.enterprise_seas_career.modalVisible}
					value 				= {this.state.enterprise_seas_career.value}
					defaultValue 		= {[]}
					source 				= {careerJSON}
					title 				= {translate("#$seas$#Ngành nghề chính")}
					backHandle 			= {mixinsCareer.modalBackHandle.bind(this)}
					onRequestClose 		= {mixinsCareer.modalBackHandle.bind(this)}
					onInit 				= {mixinsCareer.modalOnInit.bind(this)}
					onChange 			= {mixinsCareer.modalOnChange.bind(this)}
					multiple
					placeholder 		= {translate("#$seas$#Tìm")}
					maxLength 			= { 50 }
					otherPlaceholder 	= { translate("#$seas$#Nhập ngành nghề khác") }
					language 			= { language }
					labelApply 			= { translate("#$seas$#Áp dụng") }
					labelClear 			= { translate("#$seas$#Bỏ chọn") }
					//showParent
					//keepInput
				></ModalCollapse>

				<TextInput
					ref 				= "enterprise_seas_vehicle_counter"
					label 				= {translate("#$seas$#Số lượng phương tiện")}
					placeholder 		= {translate("#$seas$#Nhập (vd: 16)")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					keyboardType 		= "numeric"
					maxLength 			= {19}
					//messageType 		= {this.state.enterprise_seas_vehicle_counter.messageType}
					value 				= {this.state.enterprise_seas_vehicle_counter.value}
					onChangeText 		= {mixinsVehicleCounter.inputOnChangeText.bind(this)}
				>{/*this.state.enterprise_seas_vehicle_counter.message*/}</TextInput>

				<TextInput
					ref 				= "account_company_address"
					label 				= {translate("#$seas$#Địa chỉ")}
					placeholder 		= {translate("#$seas$#Nhập địa chỉ")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					maxLength 			= { 255 }
					//messageType 		= {this.state.account_company_address.messageType}
					value 				= {this.state.account_company_address.value}
					onChangeText 		= {mixinsAccountCompanyAddress.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_company_address.message*/}</TextInput>

				<TextInput
					ref 				= "account_phone"
					label 				= {translate("#$seas$#Điện thoại cố định")}
					placeholder 		= {translate("#$seas$#Nhập")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					keyboardType 		= "phone-pad"
					maxLength 			= {15}
					//messageType 		= {this.state.account_phone.messageType}
					value 				= {this.state.account_phone.value}
					onChangeText 		= {mixinsAccountPhone.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_phone.message*/}</TextInput>

				<TextInput
					ref 				= "account_mobile"
					label 				= {translate("#$seas$#Điện thoại di động người liên hệ")}
					placeholder 		= {translate("#$seas$#Nhập")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					keyboardType 		= "phone-pad"
					maxLength 			= {15}
					//messageType 		= {this.state.account_mobile.messageType}
					onChangeText 		= {mixinsAccountMobile.inputOnChangeText.bind(this)}
					value 				= {this.state.account_mobile.value}
					required
				>{/*this.state.account_mobile.message*/}</TextInput>

				<TagsInput
					ref 			= "account_email"
					style 			= { _styles.input }
					regex 			= { regex }
					returnKeyType 	= "next"
					keyboardType 	= "email-address"
					maxLength 		= { 254 }
					label 			= {translate("Email")}
					placeholder 	= { translate("#$seas$#Nhập email") }
					//messageType 	= { this.state.account_email.messageType }
					value 			= { this.state.account_email.value }
					onChange 		= { mixinsAccountEmail.inputOnChange.bind(this) }
					required
				>{ /*this.state.account_email.message*/ }</TagsInput>

				<TextInput
					ref 				= "account_website"
					label 				= {translate("Website")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					keyboardType 		= "url"
					placeholder 		= "http://"
					maxLength 			= { 255 }
					//messageType 		= {this.state.account_website.messageType}
					onChangeText 		= {mixinsAccountWebsite.inputOnChangeText.bind(this)}
					value 				= {this.state.account_website.value}
				>{/*this.state.account_website.message*/}</TextInput>

				<TextInput
					ref 				= "account_tax_code"
					label 				= {translate("#$seas$#Mã số thuế")}
					type 				= "input"
					style 				= {_styles.input}
					returnKeyType 		= "next"
					keyboardType 		= "numeric"
					maxLength 			= {10}
					//messageType 		= {this.state.account_tax_code.messageType}
					value 				= {this.state.account_tax_code.value}
					onChangeText 		= {mixinsAccountTaxCode.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_tax_code.message*/}</TextInput>

				<TextInput
					ref 				= "account_company_introduce"
					label 				= {`${translate("#$seas$#Giới thiệu về công ty")} (${translate("#$seas$#không bắt buộc")})`}
					type 				= "textarea"
					style 				= {_styles.input}
					rows 				= {2}
					returnKeyType 		= "done"
					maxLength 			= { 2000 }
					value 				= {this.state.account_company_introduce}
					onChangeText 		= { mixinsAccountCompanyIntroduce.inputOnChangeText.bind(this) }
				></TextInput>
				
				<View style={_styles.imageRow}>
					{
						this.state.account_images_information.map(({ source = null, info = {} }, index) => {

							const onRemove = () => {

								const account_images_information = this.state.account_images_information.slice();
								account_images_information.splice(index, 1);

								this.setState({
									account_images_information
								});
							};

							return (
								<AddImage
									key 			= {`account_images_information-${index}`}
									source 			= {source}
									onError 		= {onRemove}
									onRemove 		= {onRemove}
									onPress 		= {async () => {
										try {

											const res = await showImagePicker();

											if (!res.didCancel && res.data) {

												const account_images_information = this.state.account_images_information.slice();

												account_images_information[index] = {
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
													account_images_information
												});
											}
										} catch (e) {

											alertUtil({
												title: translate("#$seas$#Lỗi"),
												message: translate("#$seas$#Chọn hình không thành công")
											});
										}
									}}
								/>
							);
						})
					}
					<AddImage
						onPress 			= {this._addImage}
					/>

				</View>

				<SubmitButton
					disable  = {false}
					onPress  = {submit.bind(this)}
					loading  = {this.props.loading}
					isUpdate = {this.props.isUpdate}
					label 	 = { this.props.isUpdate ? translate("#$seas$#Lưu tin"): translate("#$seas$#Đăng ngay") }
				/>
			</View>
		);
	}
}

export default EnterpriseForm;
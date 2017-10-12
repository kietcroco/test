import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Avatar from '~/components/Avatar';
import TextInput from '~/components/TextInput';
import Fieldset from '~/components/Fieldset';
import CheckBox from '~/components/CheckBox';
import IconSms from '~/components/IconContact/Sms';
import IconPhone from '~/components/IconContact/Phone';
import IconEmail from '~/components/IconContact/Email';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';

import careerJSON from './data/career';
import { translate } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';

/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	account_company_name as mixinsAccountCompanyName,
	account_company_name_acronym as mixinsAccountCompanyNameAcronym,
	enterprise_roads_career as mixinsCareer,
	enterprise_roads_vehicle_counter as mixinsVehicleCounter,
	account_company_address as mixinsAccountCompanyAddress,
	account_phone as mixinsAccountPhone,
	account_mobile as mixinsAccountMobile,
	account_email as mixinsAccountEmail,
	account_website as mixinsAccountWebsite,
	account_tax_code as mixinsAccountTaxCode,
	account_company_introduce as mixinsAccountCompanyIntroduce,
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
				title: translate("Lỗi"),
				message: translate("Chọn hình không thành công")
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
				title: translate("Lỗi"),
				message: translate("Chọn hình không thành công")
			});
		}
	}

	render() {

		return (
			<View>
				{ /**Hình đại diện */}
				<Avatar
					isHandle
					source  = {this.state.account_company_logo.source}
					onPress = {this._onPressAvatar}
				>{this.state.account_company_logo.code}</Avatar>

				{ /** [TEXT]Tên công ty */}
				<TextInput
					ref           = "account_company_name"
					label         = {translate("Tên công ty")}
					placeholder   = {translate("Nhập tên công ty")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = {100}
					//messageType   = {this.state.account_company_name.messageType}
					value         = {this.state.account_company_name.value}
					onChangeText  = {mixinsAccountCompanyName.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_company_name.message*/}</TextInput>

				{ /** [TEXT]Tên công ty viết tắt */}
				<TextInput
					ref           = "account_company_name_acronym"
					label         = {translate("Tên công ty viết tắt")}
					placeholder   = {translate("Nhập tên công ty viết tắt")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = {50}
					//messageType   = {this.state.account_company_name_acronym.messageType}
					onChangeText  = {mixinsAccountCompanyNameAcronym.inputOnChangeText.bind(this)}
					value         = {this.state.account_company_name_acronym.value}
				>{/*this.state.account_company_name_acronym.message*/}</TextInput>

				{ /** [SELECT] Ngành nghề chính */}
				<TextInput
					ref           = "enterprise_roads_career"
					label         = {translate("Ngành nghề chính")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.enterprise_roads_career.messageType}
					value         = {this.state.enterprise_roads_career.label}
					onPress       = {mixinsCareer.inputOnPress.bind(this)}
					required
				>{/*this.state.enterprise_roads_career.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.enterprise_roads_career.modalVisible}
					value          = {this.state.enterprise_roads_career.value}
					defaultValue   = {[]}
					source         = {careerJSON}
					title          = {translate("Ngành nghề chính")}
					backHandle     = {mixinsCareer.modalBackHandle.bind(this)}
					onRequestClose = {mixinsCareer.modalBackHandle.bind(this)}
					onInit         = {mixinsCareer.modalOnInit.bind(this)}
					onChange       = {mixinsCareer.modalOnChange.bind(this)}
					maxLength 	   = {100}
					multiple
					placeholder    = {translate("Tìm")}
					//showParent
					keepInput
				></ModalCollapse>

				{ /** [TEXT]Số lượng phương tiện */}
				<TextInput
					ref           = "enterprise_roads_vehicle_counter"
					label         = {translate("Số lượng phương tiện")}
					placeholder   = {translate("Nhập (vd: 16)")}
					type          = "input"
					style         = {_styles.input}
					maxLength 	  = {10}
					keyboardType  = "numeric"
					returnKeyType = "next"
					//messageType   = {this.state.enterprise_roads_vehicle_counter.messageType}
					value         = {this.state.enterprise_roads_vehicle_counter.value}
					onChangeText  = {mixinsVehicleCounter.inputOnChangeText.bind(this)}
				>{/*this.state.enterprise_roads_vehicle_counter.message*/}</TextInput>

				{ /** [TEXT]Địa chỉ */}
				<TextInput
					ref           = "account_company_address"
					label         = {translate("Địa chỉ")}
					placeholder   = {translate("Nhập địa chỉ")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = {100}
					//messageType   = {this.state.account_company_address.messageType}
					value         = {this.state.account_company_address.value}
					onChangeText  = {mixinsAccountCompanyAddress.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_company_address.message*/}</TextInput>

				{ /** [TEXT]Điện thoại cố định */}
				<TextInput
					ref           = "account_phone"
					label         = {translate("Điện thoại cố định")}
					placeholder   = {translate("Nhập")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = {15}
					keyboardType  = "phone-pad"
					//messageType   = {this.state.account_phone.messageType}
					value         = {this.state.account_phone.value}
					onChangeText  = {mixinsAccountPhone.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_phone.message*/}</TextInput>

				{ /** [TEXT] Điện thoại di động người liên hệ*/}
				<TextInput
					ref           = "account_mobile"
					label         = {translate("Điện thoại di động người liên hệ")}
					placeholder   = {translate("Nhập")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = {15}
					keyboardType  = "phone-pad"
					//messageType   = {this.state.account_mobile.messageType}
					onChangeText  = {mixinsAccountMobile.inputOnChangeText.bind(this)}
					value         = {this.state.account_mobile.value}
					required
				>{/*this.state.account_mobile.message*/}</TextInput>

				{ /** [TEXT] Email */}
				<TextInput
					ref           = "account_email"
					label         = {translate("Email")}
					placeholder   = {translate("Nhập")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "email-address"
					maxLength 	  = {254}
					//messageType   = {this.state.account_email.messageType}
					value         = {this.state.account_email.value}
					onChangeText  = {mixinsAccountEmail.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_email.message*/}</TextInput>

				{ /** [TEXT] Website */}
				<TextInput
					ref           = "account_website"
					label         = {translate("Website")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "url"
					maxLength 	  = {255}
					//messageType   = {this.state.account_website.messageType}
					onChangeText  = {mixinsAccountWebsite.inputOnChangeText.bind(this)}
					value         = {this.state.account_website.value}
				>{/*this.state.account_website.message*/}</TextInput>

				{ /** [TEXT] Mã số thuế */}
				<TextInput
					ref           = "account_tax_code"
					label         = {translate("Mã số thuế")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = {10}
					//messageType   = {this.state.account_tax_code.messageType}
					value         = {this.state.account_tax_code.value}
					onChangeText  = {mixinsAccountTaxCode.inputOnChangeText.bind(this)}
					required
				>{/*this.state.account_tax_code.message*/}</TextInput>

				{ /** ghi chú */}
				<TextInput
					ref           = "account_company_introduce"
					label         = {`${translate("Giới thiệu về công ty")} (${translate("không bắt buộc")})`}
					type          = "textarea"
					style         = {_styles.input}
					rows          = {2}
					maxLength     = {2000}
					returnKeyType = "done"
					value         = {this.state.account_company_introduce}
					onChangeText  = {text => this.setState({
						account_company_introduce: text
					})}
				></TextInput>
				
				{ /**[image]  hình ghi chú */}
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
									key      = {`account_images_information-${index}`}
									source   = {source}
									onError  = {onRemove}
									onRemove = {onRemove}
									onPress  = {async () => {
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
												})
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
						onPress={this._addImage}
					/>

				</View>

				{/** END */}
				<SubmitButton
					disable = {false}
					onPress = {submit.bind(this)}
					loading = {this.props.loading}
					isUpdate = {this.props.isUpdate}
				/>
			</View>
		);
	}
}



export default EnterpriseForm;
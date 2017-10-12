import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Avatar from '~/components/Avatar';
import TextInput from '~/components/TextInput';
import Fieldset from '~/components/Fieldset';
import CheckBox from '~/components/CheckBox';
import IconSms from '~/components/IconContact/Sms';
import IconPhone from '~/components/IconContact/Phone';
import IconEmail from '~/components/IconContact/Email';
import IconChat from '~/components/IconContact/Chat';
import AutoComplete from '~/components/AutoComplete';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import DatePicker from '~/components/DatePicker';
import TagsInput from '~/components/TagsInput';

import regionsSeasSource from '~/data/regions/handleSeas';
import vehicleType from './data/vehicleType';
import vehicleClass from './data/vehicleClass';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';
import { regex } from '~/utilities/isEmail';
import { translate, getCurrentLanguage } from '~/utilities/language';
import { sizes, colors, fontSizes, hitSlop } from '~/configs/styles';

/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	vehicle_open_seas_vsl_type as mixinsSeasType,
	vehicle_open_seas_vsl_name as mixinsSeasVslName,
	vehicle_open_seas_dwt as mixinsSeasDWT,
	vehicle_open_seas_open_place as mixinsOpenPlace,
	vehicle_open_seas_open_time_from as mixinsOpenTime,
	vehicle_open_seas_contact_phone as mixinsContactPhone,
	vehicle_open_seas_contact_sms as mixinsContactSms,
	vehicle_open_seas_contact_email as mixinsContactMail,
	vehicle_open_seas_contact_skype as mixinsContactSkype,
	vehicle_open_seas_information as mixinsInfomation,
	vehicle_open_seas_class as mixinsClass,
	vehicle_open_seas_operator as mixinsOperator,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import now from './data/now';
import _styles from '../../assets/formStyles';

class VehicleOpenForm extends React.Component {

	static displayName = '@VehicleOpenForm';

	static propTypes = {
		source: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		isUpdate : PropTypes.bool
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
			//!shallowEqual( this.props.source, nextState.source )
		);
	}

	async _onPressAvatar() {

		try {

			const res = await showImagePicker();

			if (!res.didCancel && res.data) {

				this.setState({
					vehicle_open_seas_avatar: {
						...this.state.vehicle_open_seas_avatar,
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

				const vehicle_open_seas_images = this.state.vehicle_open_seas_images.slice();

				vehicle_open_seas_images.push({
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
					vehicle_open_seas_images
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
				<Avatar
					isHandle
					source={this.state.vehicle_open_seas_avatar.source}
					onPress={this._onPressAvatar}
				>{this.state.vehicle_open_seas_avatar.code}</Avatar>

				<TextInput
					ref           = "vehicle_open_seas_vsl_type"
					label         = {translate("#$seas$#Loại tàu")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					messageType   = {this.state.vehicle_open_seas_vsl_type.messageType}
					value         = {this.state.vehicle_open_seas_vsl_type.label}
					onPress       = {mixinsSeasType.inputOnPress.bind(this)}
					required
				>{/*this.state.vehicle_open_seas_vsl_type.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.vehicle_open_seas_vsl_type.modalVisible}
					value          = {this.state.vehicle_open_seas_vsl_type.value}
					defaultValue   = {[]}
					source         = {vehicleType}
					title          = {translate("#$seas$#Loại tàu")}
					backHandle     = {mixinsSeasType.modalBackHandle.bind(this)}
					onRequestClose = {mixinsSeasType.modalBackHandle.bind(this)}
					onInit         = {mixinsSeasType.modalOnInit.bind(this)}
					onChange       = {mixinsSeasType.modalOnChange.bind(this)}
					searchBar      = {false}
					maxLength 	   = { 50 }
					//placeholder 		= { translate("#$seas$#Tìm tên cảng hoặc khu vực") }
					otherPlaceholder 	= { translate("#$seas$#Nhập loại tàu khác") }
					language 			= { language }
					labelApply 			= { translate("#$seas$#Áp dụng") }
					labelClear 			= { translate("#$seas$#Bỏ chọn") }
					//multiple
					//showParent
					//geolocation
					searchToOther
					//keepInput
				></ModalCollapse>

				<TextInput
					ref           = "vehicle_open_seas_vsl_name"
					label         = {translate("#$seas$#Tên tàu")}
					placeholder   = {translate("#$seas$#Nhập tên của tàu")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					messageType   = {this.state.vehicle_open_seas_vsl_name.messageType}
					value         = {this.state.vehicle_open_seas_vsl_name.label}
					onPress       = {mixinsSeasVslName.inputOnPress.bind(this)}
					required
				>{this.state.vehicle_open_seas_vsl_name.message}</TextInput>
				<AutoComplete
					visible        = {this.state.vehicle_open_seas_vsl_name.modalVisible}
					value          = {this.state.vehicle_open_seas_vsl_name.value}
					source         = {this.state.vehicle_open_seas_vsl_name_suggestion}
					onRequestClose = {mixinsSeasVslName.modalBackHandle.bind(this)}
					onChange       = {mixinsSeasVslName.modalOnChange.bind(this)}
					placeholder    = { translate("#$seas$#Nhập") }
					keepInput      = {true}
					maxLength 	   = { 50 }
				></AutoComplete>

				<TouchableOpacity onPress={ mixinsSeasVslName.checkboxOnPress.bind(this) } hitSlop={ hitSlop } style={ _formStyles.btnChooseVSLName }>
					<Text style={ _formStyles.labelVSLOrChoose }>{ translate("#$seas$#hoặc chọn") } <Text style={ _formStyles.labelTBN }> {`"TBN"`}</Text></Text>
					<CheckBox checked={this.state.vehicle_open_seas_vsl_name.value === "TBN"} />
				</TouchableOpacity>

				<TextInput
					ref           = "vehicle_open_seas_dwt"
					label         = {translate("#$seas$#Dwt hoặc Bhp")}
					placeholder   = {translate("#$seas$#Nhập (vd: 1000)")}
					type          = "input"
					style         = {_styles.input}
					maxLength     = {10}
					returnKeyType = "next"
					keyboardType  = "numeric"
					//messageType   = {this.state.vehicle_open_seas_dwt.messageType}
					value         = {this.state.vehicle_open_seas_dwt.value}
					onChangeText  = {mixinsSeasDWT.inputOnChangeText.bind(this)}
					required
				>{/*this.state.vehicle_open_seas_dwt.message*/}</TextInput>

				<TextInput
					ref           = "vehicle_open_seas_open_place"
					label         = {translate("#$seas$#Nơi mở")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_open_seas_open_place.messageType}
					value         = {this.state.vehicle_open_seas_open_place.label}
					onPress       = {mixinsOpenPlace.inputOnPress.bind(this)}
					required
				>{/*this.state.vehicle_open_seas_open_place.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.vehicle_open_seas_open_place.modalVisible}
					value          = {this.state.vehicle_open_seas_open_place.value}
					defaultValue   = {[]}
					source         = {regionsSeasSource}
					title          = {translate("#$seas$#Nơi mở")}
					backHandle     = {mixinsOpenPlace.modalBackHandle.bind(this)}
					onRequestClose = {mixinsOpenPlace.modalBackHandle.bind(this)}
					onInit         = {mixinsOpenPlace.modalOnInit.bind(this)}
					onChange       = {mixinsOpenPlace.modalOnChange.bind(this)}
					placeholder 		= { translate("#$seas$#Tìm tên cảng hoặc khu vực") }
					otherPlaceholder 	= { translate("#$seas$#Nhập tỉnh khác") }
					currentLocationLabel= { translate("#$seas$#Vị trí hiện tại") }
					language 			= { language }
					labelApply 			= { translate("#$seas$#Áp dụng") }
					labelClear 			= { translate("#$seas$#Bỏ chọn") }
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				<TextInput
					ref           = "vehicle_open_seas_open_time_from"
					label         = {translate("#$seas$#Ngày mở")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_open_seas_open_time_from.messageType}
					value         = {this.state.vehicle_open_seas_open_time_from.label}
					onPress       = {mixinsOpenTime.inputOnPress.bind(this)}
					required
				>{/*this.state.vehicle_open_seas_open_time_from.message*/}</TextInput>
				<DatePicker
					visible      = {this.state.vehicle_open_seas_open_time_from.modalVisible}
					date         = {this.state.vehicle_open_seas_open_time_from.value}
					minDate      = {now}
					maxDate      = {this.state.vehicle_open_seas_open_time_from.value != now ? this.state.vehicle_open_seas_open_time_from.value: undefined}
					onDateChange = {mixinsOpenTime.pickerOnDateChange.bind(this)}
					onCancel     = {mixinsOpenTime.pickerOnCancel.bind(this)}
					onError      = {mixinsOpenTime.pickerOnError.bind(this)}
				/>

				<TextInput
					ref           = "vehicle_open_seas_class"
					label         = {translate("#$seas$#Đăng kiểm")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_open_seas_class.messageType}
					value         = {this.state.vehicle_open_seas_class.label}
					onPress       = {mixinsClass.inputOnPress.bind(this)}
					required
				>{this.state.vehicle_open_seas_class.message}</TextInput>
				<ModalCollapse
					visible        = {this.state.vehicle_open_seas_class.modalVisible}
					value          = {this.state.vehicle_open_seas_class.value}
					defaultValue   = {[]}
					source         = {vehicleClass}
					title          = {translate("#$seas$#Đăng kiểm")}
					backHandle     = {mixinsClass.modalBackHandle.bind(this)}
					onRequestClose = {mixinsClass.modalBackHandle.bind(this)}
					onInit         = {mixinsClass.modalOnInit.bind(this)}
					onChange       = {mixinsClass.modalOnChange.bind(this)}
					searchBar      = {false}
					maxLength 	   = { 50 }
					//placeholder 		= { translate("#$seas$#Tìm tên cảng hoặc khu vực") }
					otherPlaceholder 	= { translate("#$seas$#Nhập đăng kiểm khác") }
					//currentLocationLabel= { translate("#$seas$#Vị trí hiện tại") }
					language 			= { language }
					labelApply 			= { translate("#$seas$#Áp dụng") }
					labelClear 			= { translate("#$seas$#Bỏ chọn") }
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				<TextInput
					ref           = "vehicle_open_seas_operator"
					label         = {translate("#$seas$#Quản lý tàu")}
					placeholder   = {translate("#$seas$#Nhập người quản lý tàu")}
					type          = "input"
					style         = {_styles.input}
					maxLength     = {50}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_open_seas_operator.messageType}
					value         = {this.state.vehicle_open_seas_operator.value}
					onChangeText  = {mixinsOperator.inputOnChangeText.bind(this)}
				>{/*this.state.vehicle_open_seas_operator.message*/}</TextInput>

				<Fieldset
					legend = {translate("#$seas$#Hình thức l.hệ")}
					required
					style  = {_styles.fieldset}
				>
					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.vehicle_open_seas_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "vehicle_open_seas_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.vehicle_open_seas_contact_sms.messageType}
							value           = {this.state.vehicle_open_seas_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.vehicle_open_seas_contact_sms.editable}
							required
						>{this.state.vehicle_open_seas_contact_sms.message}</TextInput>
					</View>

					{ /** dt liện hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.vehicle_open_seas_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "vehicle_open_seas_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.vehicle_open_seas_contact_phone.messageType}
							value           = {this.state.vehicle_open_seas_contact_phone.value}
							editable        = {this.state.vehicle_open_seas_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.vehicle_open_seas_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.vehicle_open_seas_contact_email.checked } />
							<IconEmail style={ _styles.iconContact }/>
						</View>

						<TagsInput
							ref 			= "vehicle_open_seas_contact_email"
							style 			= { _styles.inputContact }
							messageType 	= { this.state.vehicle_open_seas_contact_email.messageType }
							value 			= { this.state.vehicle_open_seas_contact_email.value }
							regex 			= { regex }
							returnKeyType 	= "next"
							keyboardType 	= "email-address"
							maxLength 		= { 254 }
							placeholder 	= { translate("#$seas$#Nhập email") }
							onBlur 			= { mixinsContactMail.inputOnBlur.bind(this) }
							onSubmitEditing = { mixinsContactMail.inputOnSubmitEditing.bind(this) }
							onChange 		= { mixinsContactMail.inputOnChange.bind(this) }
						>{ this.state.vehicle_open_seas_contact_email.message }</TagsInput>
					</View>
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.vehicle_open_seas_contact_skype.checked } />
							<IconChat style={ _styles.iconContact }/>
						</View>

						<TextInput
							//placeholder = { translate("skype") }
							ref 			= "vehicle_open_seas_contact_skype"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							maxLength 		= { 50 }
							//messageType 	= { this.state.vehicle_open_seas_contact_skype.messageType }
							value 			= { this.state.vehicle_open_seas_contact_skype.value }
							onBlur 			= { mixinsContactSkype.inputOnBlur.bind(this) }
							onChangeText 	= { mixinsContactSkype.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactSkype.inputOnSubmitEditing.bind(this) }
							required
						>{ /*this.state.vehicle_open_seas_contact_skype.message*/ }</TextInput>
					</View>
					{
						!!this.state.contact_message &&
							<Text style={ _styles.errorMessage }>{ this.state.contact_message }</Text>
					}
				</Fieldset>

				<Fieldset
					legend = {translate("#$seas$#Ghi chú tin đăng")}
					style  = {_styles.fieldset}
				>
					<TextInput
						ref                           = "vehicle_open_seas_information"
						label                         = {`${translate("#$seas$#Ghi chú")} (${translate("#$seas$#không bắt buộc")})`}
						type                          = "textarea"
						style                         = {_styles.input}
						rows                          = {2}
						maxLength 					  = {1000}
						returnKeyType                 = "done"
						value                         = {this.state.vehicle_open_seas_information}
						onChangeText                  = {text => this.setState({
							vehicle_open_seas_information: text
						})}
					></TextInput>

					<View style={_styles.imageRow}>
						{
							this.state.vehicle_open_seas_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const vehicle_open_seas_images = this.state.vehicle_open_seas_images.slice();
									vehicle_open_seas_images.splice(index, 1);

									this.setState({
										vehicle_open_seas_images
									});
								};

								return (
									<AddImage
										key      = {`vehicle_open_seas_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress  ={async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const vehicle_open_seas_images = this.state.vehicle_open_seas_images.slice();

													vehicle_open_seas_images[index] = {
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
														vehicle_open_seas_images
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
							onPress={this._addImage}
						/>

					</View>
				</Fieldset>

				<SubmitButton
					disable = {false}
					onPress = {submit.bind(this)}
					loading = {this.props.loading}
					isUpdate = {this.props.isUpdate}
					label 	 = { this.props.isUpdate ? translate("#$seas$#Lưu tin") : translate("#$seas$#Đăng ngay") }
				/>
			</View>
		);
	}
}

const _formStyles = {
	btnChooseVSLName: {
		flexDirection: "row",
		marginBottom: sizes.spacing
	},
	labelVSLOrChoose: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	labelTBN: {
		fontSize: fontSizes.normal,
		color: colors.boldColor,
		fontWeight: "bold"
	}
};

export default VehicleOpenForm;
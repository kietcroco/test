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
import AgreementButton from '~/components/AgreementButton';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import DatePicker from '~/components/DatePicker';
import TagsInput from '~/components/TagsInput';

import regionsSeasSource from '~/data/regions/handleSeas';
import categorySource from './data/category';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';
import { translate, getCurrentLanguage } from '~/utilities/language';
import { hitSlop } from '~/configs/styles';
import { regex } from '~/utilities/isEmail';

import {
	container_seas_load_port as mixinsLoadPort,
	container_seas_discharge_port as mixinsDischargePort,
	container_seas_type_name as mixinsTypeName,
	container_seas_weight as mixinsWeight,
	container_seas_weight_unit as mixinsWeightUnit,
	container_seas_freight as mixinsFreight,
	container_seas_loading_time_earliest as mixinsLoadingTime,
	container_seas_loading_time_latest as mixinsDischargingTime,
	container_seas_contact_sms as mixinsContactSms,
	container_seas_contact_phone as mixinsContactPhone,
	container_seas_contact_email as mixinsContactMail,
	container_seas_freight_currency as mixinsFreightCurrency,
	container_seas_contact_skype as mixinsContactSkype,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import now from './data/now';
import _styles from '../../assets/formStyles';

class ContainerForm extends React.Component {

	static displayName = '@ContainerForm';

	static propTypes = {
		source: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		isUpdate : PropTypes.bool
	};

	static defaultProps = {
		source: {},
		loading: false
	};

	constructor( props ) {
		super( props );

		this.state = generateState( props.source );

		this._onPressAvatar = this._onPressAvatar.bind(this);
		this._addImage = this._addImage.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.source != nextProps.source ) {

			this.setState( generateState( nextProps.source, this.state ) );
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.props.loading !== nextProps.loading ||
			!shallowEqual( this.state, nextState )
			//!shallowEqual( this.props.source, nextState.source )
		);
	}

	async _onPressAvatar() {

		try {

			const res = await showImagePicker();

			if( !res.didCancel && res.data ) {

				this.setState({
					container_seas_avatar: {
						...this.state.container_seas_avatar,
						source: {uri: `data:${ res.type };base64,${ res.data }`},
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
		}catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Chọn hình không thành công")
			});
		}
	}

	async _addImage() {
		try {

			const res = await showImagePicker();

			if( !res.didCancel && res.data ) {

				const container_seas_images = this.state.container_seas_images.slice();

				container_seas_images.push({
					source: {uri: `data:${ res.type };base64,${ res.data }`},
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
					container_seas_images
				});
			}
		}catch (e) {

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
					source 		= { this.state.container_seas_avatar.source }
					onPress 	= { this._onPressAvatar }
				>{ this.state.container_seas_avatar.code }</Avatar>

				<TextInput
					ref 			= "container_seas_load_port"
					label 			= { translate("#$seas$#Cảng xếp hàng") }
					placeholder 	= { translate("#$seas$#Nhập nơi xếp hàng") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.container_seas_load_port.messageType }
					value 			= { this.state.container_seas_load_port.label }
					onPress 		= { mixinsLoadPort.inputOnPress.bind(this) }
					required
				>{ /*this.state.container_seas_load_port.message*/ }</TextInput>
				<ModalCollapse
					visible 			= { this.state.container_seas_load_port.modalVisible }
					value 				= { this.state.container_seas_load_port.value }
					defaultValue 		= { [] }
					source 				= { regionsSeasSource }
					title 				= { translate("#$seas$#Cảng xếp hàng") }
					backHandle 			= { mixinsLoadPort.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsLoadPort.modalBackHandle.bind(this) }
					onInit 				= { mixinsLoadPort.modalOnInit.bind(this) }
					onChange 			= { mixinsLoadPort.modalOnChange.bind(this) }
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
					ref 			= "container_seas_discharge_port"
					label 			= { translate("#$seas$#Cảng dỡ hàng") }
					placeholder 	= { translate("#$seas$#Nhập nơi dỡ hàng") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.container_seas_discharge_port.messageType }
					value 			= { this.state.container_seas_discharge_port.label }
					onPress 		= { mixinsDischargePort.inputOnPress.bind(this) }
					required
				>{ /*this.state.container_seas_discharge_port.message*/ }</TextInput>
				<ModalCollapse
					visible 			= { this.state.container_seas_discharge_port.modalVisible }
					value 				= { this.state.container_seas_discharge_port.value }
					defaultValue 		= { [] }
					source 				= { regionsSeasSource }
					title 				= { translate("#$seas$#Cảng dỡ hàng") }
					backHandle 			= { mixinsDischargePort.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsDischargePort.modalBackHandle.bind(this) }
					onInit 				= { mixinsDischargePort.modalOnInit.bind(this) }
					onChange 			= { mixinsDischargePort.modalOnChange.bind(this) }
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
					ref 			= "container_seas_loading_time_earliest"
					label 			= { translate("#$seas$#Thời gian xếp hàng sớm nhất") }
					placeholder 	= { translate("#$seas$#Chọn") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.container_seas_loading_time_earliest.messageType }
					value 			= { this.state.container_seas_loading_time_earliest.label }
					onPress 		= { mixinsLoadingTime.inputOnPress.bind(this) }
					required
				>{ /*this.state.container_seas_loading_time_earliest.message*/ }</TextInput>
				<DatePicker 
					visible 		= { this.state.container_seas_loading_time_earliest.modalVisible }
					date 			= { this.state.container_seas_loading_time_earliest.value }
					minDate 		= { now }
					maxDate 		= { this.state.container_seas_loading_time_latest.value != now ? this.state.container_seas_loading_time_latest.value : undefined }
					onDateChange 	= { mixinsLoadingTime.pickerOnDateChange.bind(this) }
					onCancel 		= { mixinsLoadingTime.pickerOnCancel.bind(this) }
					onError 		= { mixinsLoadingTime.pickerOnError.bind(this) }
				/>

				<TextInput
					ref 			= "container_seas_loading_time_latest"
					label 			= { translate("#$seas$#Thời gian xếp hàng muộn nhất") }
					placeholder 	= { translate("#$seas$#Chọn") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.container_seas_loading_time_latest.messageType }
					value 			= { this.state.container_seas_loading_time_latest.label }
					onPress 		= { mixinsDischargingTime.inputOnPress.bind(this) }
					required
				>{ /*this.state.container_seas_loading_time_latest.message*/ }</TextInput>
				<DatePicker 
					visible 		= { this.state.container_seas_loading_time_latest.modalVisible }
					date 			= { this.state.container_seas_loading_time_latest.value }
					minDate 		= { this.state.container_seas_loading_time_earliest.value != now ? this.state.container_seas_loading_time_earliest.value : undefined }
					onDateChange 	= { mixinsDischargingTime.pickerOnDateChange.bind(this) }
					onCancel 		= { mixinsDischargingTime.pickerOnCancel.bind(this) }
					onError 		= { mixinsDischargingTime.pickerOnError.bind(this) }
				/>

				<TextInput
					ref 			= "container_seas_type_name"
					label 			= { translate("#$seas$#Cont.thường/ Cont.lạnh") }
					placeholder 	= { translate("#$seas$#Chọn loại cont") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.container_seas_type_name.messageType }
					value 			= { this.state.container_seas_type_name.label }
					onPress 		= { mixinsTypeName.inputOnPress.bind(this) }
					required
				>{/* this.state.container_seas_type_name.message */}</TextInput>
				<ModalCollapse
					visible 			= { this.state.container_seas_type_name.modalVisible }
					value 				= { this.state.container_seas_type_name.value }
					defaultValue 		= { [] }
					source 				= { categorySource }
					title 				= { translate("#$seas$#Loại Cont") }
					backHandle 			= { mixinsTypeName.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsTypeName.modalBackHandle.bind(this) }
					onInit 				= { mixinsTypeName.modalOnInit.bind(this) }
					onChange 			= { mixinsTypeName.modalOnChange.bind(this) }
					placeholder 		= { translate("#$seas$#Tìm") }
					searchBar 			= { false }
					//otherPlaceholder 	= { translate("#$seas$#Nhập tỉnh khác") }
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
					ref 			= "container_seas_weight"
					label 			= { translate("#$seas$#Số lượng (tue)") }
					placeholder 	= { translate("#$seas$#Nhập (vd: 16)") }
					type 			= "input"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					keyboardType 	= "numeric"
					maxLength 		= { 10 }
					//messageType 	= { this.state.container_seas_weight.messageType }
					value 			= { this.state.container_seas_weight.value }
					onChangeText 	= { mixinsWeight.inputOnChangeText.bind(this) }
					onSubmitEditing = { mixinsWeight.inputOnSubmitEditing.bind(this) }
					required
				>{ /*this.state.container_seas_weight.message*/ }</TextInput>

				<View style={ _styles.inputRow }>
					<TextInput
						ref 			= "container_seas_freight"
						label 			= { translate("#$seas$#Giá đề xuất đ/Tấn") }
						placeholder 	= { translate("#$seas$#Nhập (vd: 90.000)") }
						type 			= "input"
						style 			= { _styles.inputLeft }
						returnKeyType 	= "next"
						keyboardType 	= "numeric"
						maxLength 		= { 19 }
						//messageType 	= { this.state.container_seas_freight.messageType }
						value 			= { this.state.container_seas_freight.value }
						onChangeText 	= { mixinsFreight.inputOnChangeText.bind(this) }
						required
					>{ /*this.state.container_seas_freight.message*/ }</TextInput>

					<View style={ _styles.inputMiddle }>
						<Text style={ _styles.textOr }>{ translate("#$seas$#Hoặc") }</Text>
						<Text style={ _styles.textChoosePrice }>{ translate("#$seas$#chọn giá") }</Text>
					</View>

					<AgreementButton 
						checked 	= { this.state.container_seas_freight.value === 0 || this.state.container_seas_freight.value === "0" }
						onPress 	= { mixinsFreight.agreeOnPress.bind(this) }
						label 		= { translate("#$seas$#Thoả thuận") }
					/>
				</View>

				
				<Fieldset
					legend 		= { translate("#$seas$#Hình thức l.hệ") }
					required
					style 		= { _styles.fieldset }
				>
					<View style={ _styles.rowContact }>
						<TouchableOpacity style={ _styles.contact } onPress={ mixinsContactSms.checkboxOnPress.bind(this) }>
							<CheckBox checked={ this.state.container_seas_contact_sms.checked } />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder = { translate("SĐT SMS") }
							ref 			= "container_seas_contact_sms"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							keyboardType 	= "phone-pad"
							maxLength 		= { 15 }
							messageType 	= { this.state.container_seas_contact_sms.messageType }
							value 			= { this.state.container_seas_contact_sms.value }
							onChangeText 	= { mixinsContactSms.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactSms.inputOnSubmitEditing.bind(this) }
							onBlur 			= { mixinsContactSms.inputOnBlur.bind(this) }
							editable 		= { this.state.container_seas_contact_sms.editable }
							required
						>{ this.state.container_seas_contact_sms.message }</TextInput>
					</View>
					<View style={ _styles.rowContact }>
						<TouchableOpacity style={ _styles.contact } onPress={ mixinsContactPhone.checkboxOnPress.bind(this) }>
							<CheckBox checked={ this.state.container_seas_contact_phone.checked } />
							<IconPhone style={ _styles.iconContact }/>
						</TouchableOpacity>

						<TextInput
							//placeholder = { translate("SĐT") }
							ref 			= "container_seas_contact_phone"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							keyboardType 	= "phone-pad"
							maxLength 		= { 15 }
							messageType 	= { this.state.container_seas_contact_phone.messageType }
							value 			= { this.state.container_seas_contact_phone.value }
							editable 		= { this.state.container_seas_contact_phone.editable }
							onBlur 			= { mixinsContactPhone.inputOnBlur.bind(this) }
							onChangeText 	= { mixinsContactSms.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactPhone.inputOnSubmitEditing.bind(this) }
							required
						>{ this.state.container_seas_contact_phone.message }</TextInput>
					</View>
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.container_seas_contact_email.checked } />
							<IconEmail style={ _styles.iconContact }/>
						</View>

						<TagsInput
							ref 			= "container_seas_contact_email"
							style 			= { _styles.inputContact }
							messageType 	= { this.state.container_seas_contact_email.messageType }
							value 			= { this.state.container_seas_contact_email.value }
							regex 			= { regex }
							returnKeyType 	= "next"
							keyboardType 	= "email-address"
							maxLength 		= { 254 }
							placeholder 	= { translate("#$seas$#Nhập email") }
							onBlur 			= { mixinsContactMail.inputOnBlur.bind(this) }
							onSubmitEditing = { mixinsContactMail.inputOnSubmitEditing.bind(this) }
							onChange 		= { mixinsContactMail.inputOnChange.bind(this) }
						>{ this.state.container_seas_contact_email.message }</TagsInput>
					</View>
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.container_seas_contact_skype.checked } />
							<IconChat style={ _styles.iconContact }/>
						</View>

						<TextInput
							//placeholder = { translate("skype") }
							ref 			= "container_seas_contact_skype"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							maxLength 		= { 50 }
							messageType 	= { this.state.container_seas_contact_skype.messageType }
							value 			= { this.state.container_seas_contact_skype.value }
							onBlur 			= { mixinsContactSkype.inputOnBlur.bind(this) }
							onChangeText 	= { mixinsContactSkype.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactSkype.inputOnSubmitEditing.bind(this) }
							required
						>{ this.state.container_seas_contact_skype.message }</TextInput>
					</View>
					
					{
						!!this.state.contact_message &&
							<Text style={ _styles.errorMessage }>{ this.state.contact_message }</Text>
					}
				</Fieldset>
				<Fieldset
					legend 		= { translate("#$seas$#Ghi chú tin đăng") }
					style 		= { _styles.fieldset }
				>
					<TextInput
						ref 			= "container_seas_information"
						label 			= { `${translate("#$seas$form$#Ghi chú")} (${translate("#$seas$#không bắt buộc")})` }
						type 			= "textarea"
						style 			= { _styles.input }
						rows 			= { 2 }
						maxLength 		= {1000}
						returnKeyType 	= "done"
						value 			= { this.state.container_seas_information }
						onChangeText 	= { text => this.setState({
							container_seas_information: text
						}) }
					></TextInput>
					{/*
					<MTIcon name="add-a-photo" style={{
						position: "absolute",
						right: 10,
						top: 38,
						fontSize: 30
					}}/>
					*/}
					<View style={ _styles.imageRow }>
						{
							this.state.container_seas_images.map( ( {source = null, info = {}}, index ) => {

								const onRemove = () => {

									const container_seas_images = this.state.container_seas_images.slice();
									container_seas_images.splice(index, 1);
									
									this.setState({
										container_seas_images
									});
								};

								return (
									<AddImage
										key 		= {`container_seas_images-${ index }`}
										source 		= { source }
										onError 	= { onRemove }
										onRemove 	= { onRemove }
										onPress 	= { async () => {
											try {

												const res = await showImagePicker();

												if( !res.didCancel && res.data ) {

													const container_seas_images = this.state.container_seas_images.slice();

													container_seas_images[ index ] = {
														source: {uri: `data:${ res.type };base64,${ res.data }`},
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
														container_seas_images
													});
												}
											}catch (e) {

												alertUtil({
													title: translate("#$seas$#Lỗi"),
													message: translate("#$seas$#Chọn hình không thành công")
												});
											}
										} }
									/>
								);
							} )
						}
						<AddImage
							onPress = { this._addImage }
						/>
					</View>
				</Fieldset>
				<SubmitButton
					disable  = { false }
					onPress  = { submit.bind(this) }
					loading  = { this.props.loading }
					isUpdate = {this.props.isUpdate}
					label 	 = { this.props.isUpdate ? translate("#$seas$#Lưu tin") : translate("#$seas$#Đăng ngay") }
				/>
			</View>
		);
	}
}

export default ContainerForm;
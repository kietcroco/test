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
import AgreementButton from '~/components/AgreementButton';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import DatePicker from '~/components/DatePicker';

import regionsRoadsSource from '~/data/regions/handleRoads';
import { translate } from '~/utilities/language';
import categorySource from './data/category';
import weightUnitSource from './data/weightUnit';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';

import {
	product_roads_load_port as mixinsLoadPort,
	product_roads_discharge_port as mixinsDischargePort,
	product_roads_type_name as mixinsTypeName,
	product_roads_weight as mixinsWeight,
	product_roads_weight_unit as mixinsWeightUnit,
	product_roads_freight as mixinsFreight,
	product_roads_loading_time_earliest as mixinsLoadingTime,
	product_roads_loading_time_latest as mixinsDischargingTime,
	product_roads_contact_sms as mixinsContactSms,
	product_roads_contact_phone as mixinsContactPhone,
	product_roads_contact_email as mixinsContactMail,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import now from './data/now';
import _styles from '../../assets/formStyles';

class ProductForm extends React.Component {

	static displayName = '@ProductForm';

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
		);
	}

	async _onPressAvatar() {

		try {

			const res = await showImagePicker();

			if( !res.didCancel && res.data ) {

				this.setState({
					product_roads_avatar: {
						...this.state.product_roads_avatar,
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
				title: translate("Lỗi"),
				message: translate("Chọn hình không thành công")
			});
		}
	}

	async _addImage() {
		try {

			const res = await showImagePicker();

			if( !res.didCancel && res.data ) {

				const product_roads_images = this.state.product_roads_images.slice();

				product_roads_images.push({
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
					product_roads_images
				});
			}
		}catch (e) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Chọn hình không thành công")
			});
		}
	}

	render() {

		return (
			<View>
				<Avatar
					isHandle
					source 		= { this.state.product_roads_avatar.source }
					onPress 	= { this._onPressAvatar }
				>{ this.state.product_roads_avatar.code }</Avatar>

				<TextInput
					ref 			= "product_roads_load_port"
					label 			= { translate("Nơi nhận hàng") }
					placeholder 	= { translate("Chọn nơi nhận") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.product_roads_load_port.messageType }
					value 			= { this.state.product_roads_load_port.label }
					onPress 		= { mixinsLoadPort.inputOnPress.bind(this) }
					required
				>{ /*this.state.product_roads_load_port.message*/ }</TextInput>
				<ModalCollapse
					visible 			= { this.state.product_roads_load_port.modalVisible }
					value 				= { this.state.product_roads_load_port.value }
					defaultValue 		= { [] }
					source 				= { regionsRoadsSource }
					title 				= { translate("Nơi nhận hàng") }
					backHandle 			= { mixinsLoadPort.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsLoadPort.modalBackHandle.bind(this) }
					onInit 				= { mixinsLoadPort.modalOnInit.bind(this) }
					onChange 			= { mixinsLoadPort.modalOnChange.bind(this) }
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				<TextInput
					ref 			= "product_roads_discharge_port"
					label 			= { translate("Nơi giao hàng") }
					placeholder 	= { translate("Chọn nơi giao") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.product_roads_discharge_port.messageType }
					value 			= { this.state.product_roads_discharge_port.label }
					onPress 		= { mixinsDischargePort.inputOnPress.bind(this) }
					required
				>{ /*this.state.product_roads_discharge_port.message*/ }</TextInput>
				<ModalCollapse
					visible 			= { this.state.product_roads_discharge_port.modalVisible }
					value 				= { this.state.product_roads_discharge_port.value }
					defaultValue 		= { [] }
					source 				= { regionsRoadsSource }
					title 				= { translate("Nơi giao hàng") }
					backHandle 			= { mixinsDischargePort.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsDischargePort.modalBackHandle.bind(this) }
					onInit 				= { mixinsDischargePort.modalOnInit.bind(this) }
					onChange 			= { mixinsDischargePort.modalOnChange.bind(this) }
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				<TextInput
					ref 			= "product_roads_type_name"
					label 			= { translate("Loại hàng") }
					placeholder 	= { translate("Chọn loại hàng") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.product_roads_type_name.messageType }
					value 			= { this.state.product_roads_type_name.label }
					onPress 		= { mixinsTypeName.inputOnPress.bind(this) }
					required
				>{ /*this.state.product_roads_type_name.message*/ }</TextInput>
				<ModalCollapse
					visible 			= { this.state.product_roads_type_name.modalVisible }
					value 				= { this.state.product_roads_type_name.value }
					defaultValue 		= { [] }
					source 				= { categorySource }
					title 				= { translate("Loại hàng") }
					backHandle 			= { mixinsTypeName.modalBackHandle.bind(this) }
					onRequestClose 		= { mixinsTypeName.modalBackHandle.bind(this) }
					onInit 				= { mixinsTypeName.modalOnInit.bind(this) }
					onChange 			= { mixinsTypeName.modalOnChange.bind(this) }
					placeholder 		= { translate("Tìm") }
					maxLength 			= { 50 }
					//multiple
					//showParent
					//geolocation
					//searchToOther
					keepInput
				></ModalCollapse>

				<View style={ _styles.inputRow }>
					<TextInput
						ref 			= "product_roads_weight"
						label 			= { translate("Khối lượng") }
						placeholder 	= { translate("Nhập (vd: 16)") }
						type 			= "input"
						style 			= { _styles.inputLeft }
						returnKeyType 	= "next"
						keyboardType 	= "numeric"
						maxLength 		= { 10 }
						//messageType 	= { this.state.product_roads_weight.messageType }
						value 			= { this.state.product_roads_weight.value }
						onChangeText 	= { mixinsWeight.inputOnChangeText.bind(this) }
						onSubmitEditing = { mixinsWeight.inputOnSubmitEditing.bind(this) }
						required
					>{ /*this.state.product_roads_weight.message*/ }</TextInput>

					<TextInput
						ref 			= "product_roads_weight_unit"
						label 			= { translate("Chọn ĐVT") }
						placeholder 	= { translate("ĐVT") }
						type 			= "select"
						style 			= { _styles.inputRight }
						returnKeyType 	= "next"
						//messageType 	= { this.state.product_roads_weight_unit.messageType }
						value 			= { this.state.product_roads_weight_unit.label }
						onPress 		= { mixinsWeightUnit.inputOnPress.bind(this) }
						required
					>{ /*this.state.product_roads_weight_unit.message*/ }</TextInput>
					<ModalCollapse
						visible 			= { this.state.product_roads_weight_unit.modalVisible }
						value 				= { this.state.product_roads_weight_unit.value }
						defaultValue 		= { [weightUnitSource[0]] }
						source 				= { weightUnitSource }
						title 				= { translate("Đơn vị tính khối lượng") }
						backHandle 			= { mixinsWeightUnit.modalBackHandle.bind(this) }
						onRequestClose 		= { mixinsWeightUnit.modalBackHandle.bind(this) }
						onInit 				= { mixinsWeightUnit.modalOnInit.bind(this) }
						onChange 			= { mixinsWeightUnit.modalOnChange.bind(this) }
						placeholder 		= { translate("Tìm") }
						searchBar 			= {false}
						//multiple
						//showParent
						//geolocation
						//searchToOther
						//keepInput
					></ModalCollapse>
				</View>

				<View style={ _styles.inputRow }>
					<TextInput
						ref 			= "product_roads_freight"
						label 			= { translate("Giá đề xuất đ/Tấn") }
						placeholder 	= { translate("Nhập (vd: 90.000)") }
						type 			= "input"
						style 			= { _styles.inputLeft }
						returnKeyType 	= "next"
						keyboardType 	= "numeric"
						maxLength 		= { 19 }
						//messageType 	= { this.state.product_roads_freight.messageType }
						value 			= { this.state.product_roads_freight.value }
						onChangeText 	= { mixinsFreight.inputOnChangeText.bind(this) }
						required
					>{ /*this.state.product_roads_freight.message*/ }</TextInput>

					<View style={ _styles.inputMiddle }>
						<Text style={ _styles.textOr }>{ translate("Hoặc") }</Text>
						<Text style={ _styles.textChoosePrice }>{ translate("chọn giá") }</Text>
					</View>

					<AgreementButton 
						checked 	= { this.state.product_roads_freight.value === 0 || this.state.product_roads_freight.value === "0" }
						onPress 	= { mixinsFreight.agreeOnPress.bind(this) }
					/>
				</View>

				<TextInput
					ref 			= "product_roads_loading_time_earliest"
					label 			= { translate("Thời gian xếp hàng sớm nhất") }
					placeholder 	= { translate("Chọn") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.product_roads_loading_time_earliest.messageType }
					value 			= { this.state.product_roads_loading_time_earliest.label }
					onPress 		= { mixinsLoadingTime.inputOnPress.bind(this) }
					required
				>{ /*this.state.product_roads_loading_time_earliest.message*/ }</TextInput>
				<DatePicker 
					visible 		= { this.state.product_roads_loading_time_earliest.modalVisible }
					date 			= { this.state.product_roads_loading_time_earliest.value }
					minDate 		= { now }
					maxDate 		= { this.state.product_roads_loading_time_latest.value != now ? this.state.product_roads_loading_time_latest.value : undefined }
					onDateChange 	= { mixinsLoadingTime.pickerOnDateChange.bind(this) }
					onCancel 		= { mixinsLoadingTime.pickerOnCancel.bind(this) }
					onError 		= { mixinsLoadingTime.pickerOnError.bind(this) }
				/>

				<TextInput
					ref 			= "product_roads_loading_time_latest"
					label 			= { translate("Thời gian xếp hàng muộn nhất") }
					placeholder 	= { translate("Chọn") }
					type 			= "select"
					style 			= { _styles.input }
					returnKeyType 	= "next"
					//messageType 	= { this.state.product_roads_loading_time_latest.messageType }
					value 			= { this.state.product_roads_loading_time_latest.label }
					onPress 		= { mixinsDischargingTime.inputOnPress.bind(this) }
					required
				>{ /*this.state.product_roads_loading_time_latest.message*/ }</TextInput>
				<DatePicker 
					visible 		= { this.state.product_roads_loading_time_latest.modalVisible }
					date 			= { this.state.product_roads_loading_time_latest.value }
					minDate 		= { this.state.product_roads_loading_time_earliest.value != now ? this.state.product_roads_loading_time_earliest.value : undefined }
					onDateChange 	= { mixinsDischargingTime.pickerOnDateChange.bind(this) }
					onCancel 		= { mixinsDischargingTime.pickerOnCancel.bind(this) }
					onError 		= { mixinsDischargingTime.pickerOnError.bind(this) }
				/>

				<Fieldset
					legend 		= { translate("Hình thức l.hệ") }
					required
					style 		= { _styles.fieldset }
				>
					<View style={ _styles.rowContact }>
						<TouchableOpacity style={ _styles.contact } onPress={ mixinsContactSms.checkboxOnPress.bind(this) }>
							<CheckBox checked={ this.state.product_roads_contact_sms.checked } />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder = { translate("SĐT SMS") }
							ref 			= "product_roads_contact_sms"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							keyboardType 	= "phone-pad"
							maxLength 		= { 15 }
							messageType 	= { this.state.product_roads_contact_sms.messageType }
							value 			= { this.state.product_roads_contact_sms.value }
							onChangeText 	= { mixinsContactSms.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactSms.inputOnSubmitEditing.bind(this) }
							onBlur 			= { mixinsContactSms.inputOnBlur.bind(this) }
							editable 		= { this.state.product_roads_contact_sms.editable }
							required
						>{ this.state.product_roads_contact_sms.message }</TextInput>
					</View>
					<View style={ _styles.rowContact }>
						<TouchableOpacity style={ _styles.contact } onPress={ mixinsContactPhone.checkboxOnPress.bind(this) }>
							<CheckBox checked={ this.state.product_roads_contact_phone.checked } />
							<IconPhone style={ _styles.iconContact }/>
						</TouchableOpacity>

						<TextInput
							//placeholder = { translate("SĐT") }
							ref 			= "product_roads_contact_phone"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							keyboardType 	= "phone-pad"
							maxLength 		= { 15 }
							messageType 	= { this.state.product_roads_contact_phone.messageType }
							value 			= { this.state.product_roads_contact_phone.value }
							editable 		= { this.state.product_roads_contact_phone.editable }
							onBlur 			= { mixinsContactPhone.inputOnBlur.bind(this) }
							onChangeText 	= { mixinsContactSms.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactPhone.inputOnSubmitEditing.bind(this) }
							required
						>{ this.state.product_roads_contact_phone.message }</TextInput>
					</View>
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.product_roads_contact_email.checked } />
							<IconEmail style={ _styles.iconContact }/>
						</View>

						<TextInput
							//placeholder = { translate("Email") }
							ref 			= "product_roads_contact_email"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							keyboardType 	= "email-address"
							maxLength 		= {254}
							messageType 	= { this.state.product_roads_contact_email.messageType }
							value 			= { this.state.product_roads_contact_email.value }
							onChangeText 	= { mixinsContactMail.inputOnChangeText.bind(this) }
							onBlur 			= { mixinsContactMail.inputOnBlur.bind(this) }
							onSubmitEditing = { mixinsContactMail.inputOnSubmitEditing.bind(this) }
							required
						>{ this.state.product_roads_contact_email.message }</TextInput>
					</View>
					
					{
						!!this.state.contact_message &&
							<Text style={ _styles.errorMessage }>{ this.state.contact_message }</Text>
					}
				</Fieldset>
				<Fieldset
					legend 		= { translate("Ghi chú tin đăng") }
					style 		= { _styles.fieldset }
				>
					<TextInput
						ref 			= "product_roads_information"
						label 			= { `${translate("Ghi chú")} (${translate("không bắt buộc")})` }
						type 			= "textarea"
						style 			= { _styles.input }
						rows 			= { 2 }
						maxLength 		= {1000}
						returnKeyType 	= "done"
						value 			= { this.state.product_roads_information }
						onChangeText 	= { text => this.setState({
							product_roads_information: text
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
							this.state.product_roads_images.map( ( {source = null, info = {}}, index ) => {

								const onRemove = () => {

									const product_roads_images = this.state.product_roads_images.slice();
									product_roads_images.splice(index, 1);
									
									this.setState({
										product_roads_images
									});
								};

								return (
									<AddImage
										key 		= {`product_roads_images-${ index }`}
										source 		= { source }
										onError 	= { onRemove }
										onRemove 	= { onRemove }
										onPress 	= { async () => {
											try {

												const res = await showImagePicker();

												if( !res.didCancel && res.data ) {

													const product_roads_images = this.state.product_roads_images.slice();

													product_roads_images[ index ] = {
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
														product_roads_images
													});
												}
											}catch (e) {

												alertUtil({
													title: translate("Lỗi"),
													message: translate("Chọn hình không thành công")
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
					disable 	= { false }
					onPress 	= { submit.bind(this) }
					loading 	= { this.props.loading }
					isUpdate = {this.props.isUpdate}
				/>
			</View>
		);
	}
}

export default ProductForm;
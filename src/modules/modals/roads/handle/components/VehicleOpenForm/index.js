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
import AutoComplete from '~/components/AutoComplete';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import DatePicker from '~/components/DatePicker';

import regionsRoadsSource from '~/data/regions/handleRoads';
import vehicleType from './data/vehicleType';
import { translate } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';


/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	vehicle_roads_type as mixinsRoadsType,
	vehicle_roads_code as mixinsRoadsCode,
	vehicle_roads_tonnage as mixinsRoadsTonnage,
	vehicle_open_roads_open_place as mixinsOpenPlace,
	vehicle_open_roads_open_time as mixinsOpenTime,
	vehicle_open_roads_contact_phone as mixinsContactPhone,
	vehicle_open_roads_contact_sms as mixinsContactSms,
	vehicle_open_roads_contact_email as mixinsContactMail,
	vehicle_open_roads_information as mixinsInfomation,
	vehicle_open_roads_open_time_daily as mixinsTimeDaily,
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
			//!shallowEqual( this.props.source, nextState.source )
		);
	}

	async _onPressAvatar() {

		try {

			const res = await showImagePicker();

			if (!res.didCancel && res.data) {

				this.setState({
					vehicle_open_roads_avatar: {
						...this.state.vehicle_open_roads_avatar,
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

				const vehicle_open_roads_images = this.state.vehicle_open_roads_images.slice();

				vehicle_open_roads_images.push({
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
					vehicle_open_roads_images
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
					source  = {this.state.vehicle_open_roads_avatar.source}
					onPress = {this._onPressAvatar}
				>{this.state.vehicle_open_roads_avatar.code}</Avatar>

				{ /** loại phương tiện */}
				<TextInput
					ref           = "vehicle_roads_type"
					label         = {translate("Loại phương tiện")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_roads_type.messageType}
					value         = {this.state.vehicle_roads_type.label}
					onPress       = { this.state.vehicle_roads_type.editable ? mixinsRoadsType.inputOnPress.bind(this) : undefined}
					required 	  = { this.state.vehicle_roads_type.editable }
				>{/*this.state.vehicle_roads_type.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.vehicle_roads_type.modalVisible}
					value          = {this.state.vehicle_roads_type.value}
					defaultValue   = {[]}
					source         = {vehicleType}
					title          = {translate("Loại phương tiện")}
					backHandle     = {mixinsRoadsType.modalBackHandle.bind(this)}
					onRequestClose = {mixinsRoadsType.modalBackHandle.bind(this)}
					onInit         = {mixinsRoadsType.modalOnInit.bind(this)}
					onChange       = {mixinsRoadsType.modalOnChange.bind(this)}
					searchBar 	   = {false}
					maxLength 	   = { 50 }
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				{ /** Số đăng ký phương tiện */}
				<TextInput
					ref           = "vehicle_roads_code"
					label         = {translate("Số đăng ký P.tiện")}
					placeholder   = {translate("Nhập (vd: 56P-2251)")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					messageType   = {this.state.vehicle_roads_code.messageType}
					value         = {this.state.vehicle_roads_code.label}
					onPress       = {mixinsRoadsCode.inputOnPress.bind(this)}
					required
				>{this.state.vehicle_roads_code.message}</TextInput>
				<AutoComplete
					visible        = {this.state.vehicle_roads_code.modalVisible}
					value          = {this.state.vehicle_roads_code.value}
					source         = {this.state.vehicle_roads_code_suggestion}
					onRequestClose = {mixinsRoadsCode.modalBackHandle.bind(this)}
					onChange       = {mixinsRoadsCode.modalOnChange.bind(this)}
					keepInput      = {true}
					maxLength 	   = {10}
				></AutoComplete>

				{ /** Trọng tải ptiện */}
				<TextInput
					ref           = "vehicle_roads_tonnage"
					label         = {translate("Trọng tải P.tiện (Tấn)")}
					placeholder   = {translate("Nhập (vd: 1000)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = {10}
					editable 	  = { this.state.vehicle_roads_tonnage.editable }
					//messageType   = {this.state.vehicle_roads_tonnage.messageType}
					value         = {this.state.vehicle_roads_tonnage.value}
					onChangeText  = {mixinsRoadsTonnage.inputOnChangeText.bind(this)}
					required
				>{/*this.state.vehicle_roads_tonnage.message*/}</TextInput>

				{ /** nơi open */}
				<TextInput
					ref           = "vehicle_open_roads_open_place"
					label         = {translate("Nơi open")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.vehicle_open_roads_open_place.messageType}
					value         = {this.state.vehicle_open_roads_open_place.label}
					onPress       = {mixinsOpenPlace.inputOnPress.bind(this)}
					required
				>{/*this.state.vehicle_open_roads_open_place.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.vehicle_open_roads_open_place.modalVisible}
					value          = {this.state.vehicle_open_roads_open_place.value}
					defaultValue   = {[]}
					source         = {regionsRoadsSource}
					title          = {translate("Nơi open")}
					backHandle     = {mixinsOpenPlace.modalBackHandle.bind(this)}
					onRequestClose = {mixinsOpenPlace.modalBackHandle.bind(this)}
					onInit         = {mixinsOpenPlace.modalOnInit.bind(this)}
					onChange       = {mixinsOpenPlace.modalOnChange.bind(this)}
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				<TouchableOpacity style={_styles.time_daily} onPress={mixinsTimeDaily.checkboxOnPress.bind(this)}>
					<CheckBox checked={this.state.vehicle_open_roads_open_time_daily.value == 1} />
					<Text style={_styles.time_daily_txt} >{translate("Vận chuyển thường ngày")}</Text>
				</TouchableOpacity>

				{ /** thời gian xuất phát */}
				{
					!this.state.vehicle_open_roads_open_time_daily.value && <TextInput
						ref           = "vehicle_open_roads_open_time"
						label         = {translate("Ngày open")}
						placeholder   = {translate("Chọn ngày cụ thể")}
						type          = "select"
						style         = {_styles.input}
						returnKeyType = "next"
						//messageType   = {this.state.vehicle_open_roads_open_time.messageType}
						value         = {this.state.vehicle_open_roads_open_time.label}
						onPress       = {mixinsOpenTime.inputOnPress.bind(this)}
						required
					>{/*this.state.vehicle_open_roads_open_time.message*/}</TextInput>
				}
				{
					!this.state.vehicle_open_roads_open_time_daily.value && <DatePicker
						visible      = {this.state.vehicle_open_roads_open_time.modalVisible}
						date         = {this.state.vehicle_open_roads_open_time.value}
						minDate      = {now}
						maxDate      = {this.state.vehicle_open_roads_open_time.value != now ? this.state.vehicle_open_roads_open_time.value: undefined}
						onDateChange = {mixinsOpenTime.pickerOnDateChange.bind(this)}
						onCancel     = {mixinsOpenTime.pickerOnCancel.bind(this)}
						onError      = {mixinsOpenTime.pickerOnError.bind(this)}
					/>
				}

				<Fieldset
					legend={translate("Hình thức l.hệ")}
					required
					style={_styles.fieldset}
				>
					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.vehicle_open_roads_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "vehicle_open_roads_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.vehicle_open_roads_contact_sms.messageType}
							value           = {this.state.vehicle_open_roads_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.vehicle_open_roads_contact_sms.editable}
							required
						>{this.state.vehicle_open_roads_contact_sms.message}</TextInput>
					</View>

					{ /** dt liện hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.vehicle_open_roads_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "vehicle_open_roads_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.vehicle_open_roads_contact_phone.messageType}
							value           = {this.state.vehicle_open_roads_contact_phone.value}
							editable        = {this.state.vehicle_open_roads_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.vehicle_open_roads_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact}>
							<CheckBox disable checked={this.state.vehicle_open_roads_contact_email.checked} />
							<IconEmail style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("Email") }
							ref             = "vehicle_open_roads_contact_email"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "email-address"
							maxLength 		= {254}
							messageType     = {this.state.vehicle_open_roads_contact_email.messageType}
							value           = {this.state.vehicle_open_roads_contact_email.value}
							onChangeText    = {mixinsContactMail.inputOnChangeText.bind(this)}
							onBlur          = {mixinsContactMail.inputOnBlur.bind(this)}
							onSubmitEditing = {mixinsContactMail.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.vehicle_open_roads_contact_email.message}</TextInput>
					</View>
					{
						!!this.state.contact_message &&
							<Text style={ _styles.errorMessage }>{ this.state.contact_message }</Text>
					}
				</Fieldset>

				<Fieldset
					legend = {translate("Ghi chú tin đăng")}
					style  = {_styles.fieldset}
				>
					{ /** ghi chú */}
					<TextInput
						ref                            = "vehicle_open_roads_information"
						label                          = {`${translate("Ghi chú")} (${translate("không bắt buộc")})`}
						type                           = "textarea"
						style                          = {_styles.input}
						rows                           = {2}
						maxLength 					   = {1000}
						returnKeyType                  = "done"
						value                          = {this.state.vehicle_open_roads_information}
						onChangeText                   = {text => this.setState({
							vehicle_open_roads_information: text
						})}
					></TextInput>
					{ /**[image]  hình ghi chú */}
					<View style={_styles.imageRow}>
						{
							this.state.vehicle_open_roads_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const vehicle_open_roads_images = this.state.vehicle_open_roads_images.slice();
									vehicle_open_roads_images.splice(index, 1);

									this.setState({
										vehicle_open_roads_images
									});
								};

								return (
									<AddImage
										key      = {`vehicle_open_roads_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress  = {async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const vehicle_open_roads_images = this.state.vehicle_open_roads_images.slice();

													vehicle_open_roads_images[index] = {
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
														vehicle_open_roads_images
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
							onPress={this._addImage}
						/>

					</View>
				</Fieldset>

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

export default VehicleOpenForm;
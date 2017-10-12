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
import Switch from '~/components/SwitchOptions';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';

import regionsRiversSource from '~/data/regions/handleRivers';
import yearSource from '~/data/yearSource';
import vehicleType from './data/vehicleType';
import { translate } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';
import { sizes } from '~/configs/styles';

/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	purchase_rivers_vehicle_type as mixinsVehicleType,
	purchase_rivers_tonnage as mixinsTonnage,
	purchase_rivers_year_built as mixinsYearsBuilt,
	purchase_rivers_place_delivery as mixinsPlaceDelivery,
	purchase_rivers_price as mixinsPrice,
	purchase_rivers_contact_sms as mixinsContactSms,
	purchase_rivers_contact_phone as mixinsContactPhone,
	purchase_rivers_contact_email as mixinsContactMail,
	purchase_rivers_place_built as mixinsPlaceBuilt,
	purchase_rivers_size_tunnel as mixinsSizeTunnel,
	purchase_rivers_information as mixinsInfomation,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import now from './data/now';
import _styles from '../../assets/formStyles';

class PurchaseForm extends React.Component {

	static displayName = '@PurchaseForm';

	static propTypes = {
		source: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		isUpdate: PropTypes.bool
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
					purchase_rivers_avatar: {
						...this.state.purchase_rivers_avatar,
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

				const purchase_rivers_images = this.state.purchase_rivers_images.slice();

				purchase_rivers_images.push({
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
					purchase_rivers_images
				});
			}
		} catch (e) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Chọn hình không thành công")
			});
		}
	}

	_renderYearBuilt() {

		return (
			<View>
				<TextInput
					ref           = "purchase_rivers_year_built"
					label         = {translate("Năm đóng")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_rivers_year_built.messageType}
					value         = {this.state.purchase_rivers_year_built.label}
					onPress       = {mixinsYearsBuilt.inputOnPress.bind(this)}
					required 	  = { this.state.purchase_rivers_type == "SELL" }
				>{/*this.state.purchase_rivers_year_built.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_rivers_year_built.modalVisible}
					value          = {this.state.purchase_rivers_year_built.value}
					defaultValue   = {[]}
					source         = {yearSource()}
					title          = {translate("Năm đóng")}
					backHandle     = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onRequestClose = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onInit         = {mixinsYearsBuilt.modalOnInit.bind(this)}
					onChange       = {mixinsYearsBuilt.modalOnChange.bind(this)}
					searchBar      = {false}
					//multiple
					//showParent
					//keepInput
				></ModalCollapse>
			</View>
		);
	}

	render() {

		return (
			<View>
				{ /**Hình đại diện */}
				<View style={ _formStyles.switchRow }>

					<Avatar
						isHandle
						source  = {this.state.purchase_rivers_avatar.source}
						onPress = {this._onPressAvatar}
					>{this.state.purchase_rivers_avatar.code}</Avatar>

					<View style={ _formStyles.switchContainer }>
						<Switch
							onChange={(type) => {
								this.setState({ purchase_rivers_type: type });
							}}

							value={(this.state.purchase_rivers_type == 'SELL') ? false : true}
						/>
					</View>
				</View>

				<TextInput
					ref           = "purchase_rivers_vehicle_type"
					label         = {translate("Loại phương tiện")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_rivers_vehicle_type.messageType}
					value         = {this.state.purchase_rivers_vehicle_type.label}
					onPress       = {mixinsVehicleType.inputOnPress.bind(this)}
					required
				>{/*this.state.purchase_rivers_vehicle_type.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_rivers_vehicle_type.modalVisible}
					value          = {this.state.purchase_rivers_vehicle_type.value}
					defaultValue   = {[]}
					source         = {vehicleType}
					title          = {translate("Loại phương tiện")}
					backHandle     = {mixinsVehicleType.modalBackHandle.bind(this)}
					onRequestClose = {mixinsVehicleType.modalBackHandle.bind(this)}
					onInit         = {mixinsVehicleType.modalOnInit.bind(this)}
					onChange       = {mixinsVehicleType.modalOnChange.bind(this)}
					searchBar 	   = { false }
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				{ /** Trọng tải */}
				<TextInput
					ref           = "purchase_rivers_tonnage"
					label         = {translate("Trọng tải P.tiện (Tấn)")}
					placeholder   = {translate("Nhập (vd: 16)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = { 10 }
					//messageType   = {this.state.purchase_rivers_tonnage.messageType}
					value         = {this.state.purchase_rivers_tonnage.value}
					onChangeText  = {mixinsTonnage.inputOnChangeText.bind(this)}
					required
				>{/*this.state.purchase_rivers_tonnage.message*/}</TextInput>


				{ /**[select]Năm đóng */}
				{
					(
						!this.state.purchase_rivers_type || 
							this.state.purchase_rivers_type == 'SELL') && 
							this._renderYearBuilt()
				}


				{ /**[select-geo]Nơi xem  */}
				<TextInput
					ref           = "purchase_rivers_place_delivery"
					label         = {translate("Nơi xem")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_rivers_place_delivery.messageType}
					value         = {this.state.purchase_rivers_place_delivery.label}
					onPress       = {mixinsPlaceDelivery.inputOnPress.bind(this)}
					required
				>{/*this.state.purchase_rivers_place_delivery.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_rivers_place_delivery.modalVisible}
					value          = {this.state.purchase_rivers_place_delivery.value}
					defaultValue   = {[]}
					source         = {regionsRiversSource}
					title          = {translate("Nơi xem")}
					backHandle     = {mixinsPlaceDelivery.modalBackHandle.bind(this)}
					onRequestClose = {mixinsPlaceDelivery.modalBackHandle.bind(this)}
					onInit         = {mixinsPlaceDelivery.modalOnInit.bind(this)}
					onChange       = {mixinsPlaceDelivery.modalOnChange.bind(this)}
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				{ /** Giá đề xuất */}
				<TextInput
					ref           = "purchase_rivers_price"
					label         = {translate("Giá đề xuất (đ)")}
					placeholder   = {translate("Nhập (vd: 1.000.000, hoặc 0 là giá thỏa thuận)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = {19}
					//messageType   = {this.state.purchase_rivers_price.messageType}
					value         = {this.state.purchase_rivers_price.value}
					onChangeText  = {mixinsPrice.inputOnChangeText.bind(this)}
					required
				>{/*this.state.purchase_rivers_price.message*/}</TextInput>

				<Fieldset
					legend = {translate("Hình thức l.hệ")}
					required
					style  = {_styles.fieldset}
				>
					{ /**[input]sms */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_rivers_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "purchase_rivers_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_rivers_contact_sms.messageType}
							value           = {this.state.purchase_rivers_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.purchase_rivers_contact_sms.editable}
							required
						>{this.state.purchase_rivers_contact_sms.message}</TextInput>
					</View>

					{ /** dt liện hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_rivers_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "purchase_rivers_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_rivers_contact_phone.messageType}
							value           = {this.state.purchase_rivers_contact_phone.value}
							editable        = {this.state.purchase_rivers_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.purchase_rivers_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact}>
							<CheckBox disable checked={this.state.purchase_rivers_contact_email.checked} />
							<IconEmail style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("Email") }
							ref             = "purchase_rivers_contact_email"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "email-address"
							maxLength 		= {254}
							messageType     = {this.state.purchase_rivers_contact_email.messageType}
							value           = {this.state.purchase_rivers_contact_email.value}
							onChangeText    = {mixinsContactMail.inputOnChangeText.bind(this)}
							onBlur          = {mixinsContactMail.inputOnBlur.bind(this)}
							onSubmitEditing = {mixinsContactMail.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.purchase_rivers_contact_email.message}</TextInput>
					</View>
				</Fieldset>

				<Fieldset
					legend = {translate("Ghi chú tin đăng")}
					style  = {_styles.fieldset}
				>
					{ /**[select]Năm đóng */}

					{
						(this.state.purchase_rivers_type == 'BUY') && 
							this._renderYearBuilt()
					}

					{ /**[select-geo]Nơi đóng */}
					<TextInput
						ref           = "purchase_rivers_place_built"
						label         = {translate("Nơi đóng")}
						placeholder   = {translate("Chọn")}
						type          = "select"
						style         = {_styles.input}
						returnKeyType = "next"
						//messageType   = {this.state.purchase_rivers_place_built.messageType}
						value         = {this.state.purchase_rivers_place_built.label}
						onPress       = {mixinsPlaceBuilt.inputOnPress.bind(this)}
					>{/*this.state.purchase_rivers_place_built.message*/}</TextInput>
					<ModalCollapse
						visible        = {this.state.purchase_rivers_place_built.modalVisible}
						value          = {this.state.purchase_rivers_place_built.value}
						defaultValue   = {[]}
						source         = {regionsRiversSource}
						title          = {translate("Nơi đóng")}
						backHandle     = {mixinsPlaceBuilt.modalBackHandle.bind(this)}
						onRequestClose = {mixinsPlaceBuilt.modalBackHandle.bind(this)}
						onInit         = {mixinsPlaceBuilt.modalOnInit.bind(this)}
						onChange       = {mixinsPlaceBuilt.modalOnChange.bind(this)}
						//multiple
						//showParent
						geolocation
						searchToOther
						keepInput
					></ModalCollapse>

					{ /** Kích thước */}
					<TextInput
						ref           = "purchase_rivers_size_tunnel"
						label         = {translate("Kích thước")}
						placeholder   = {translate("Nhập")}
						type          = "input"
						style         = {_styles.input}
						returnKeyType = "next"
						maxLength 	  = {100}
						//messageType   = {this.state.purchase_rivers_size_tunnel.messageType}
						value         = {this.state.purchase_rivers_size_tunnel}
						onChangeText  = {mixinsSizeTunnel.inputOnChangeText.bind(this)}
					>{/*this.state.purchase_rivers_size_tunnel.message*/}</TextInput>

					{ /**[textarea]Ghi chú */}
					<TextInput
						ref                         = "purchase_rivers_information"
						label                       = {`${translate("Ghi chú")} (${translate("không bắt buộc")})`}
						type                        = "textarea"
						style                       = {_styles.input}
						rows                        = {2}
						returnKeyType               = "done"
						maxLength 					= {1000}
						value                       = {this.state.purchase_rivers_information}
						onChangeText                = {text => this.setState({
							purchase_rivers_information: text
						})}
					></TextInput>
					
					{ /**[image]  hình ghi chú */}
					<View style={_styles.imageRow}>
						{
							this.state.purchase_rivers_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const purchase_rivers_images = this.state.purchase_rivers_images.slice();
									purchase_rivers_images.splice(index, 1);

									this.setState({
										purchase_rivers_images
									});
								};

								return (
									<AddImage
										key      = {`purchase_rivers_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress  = {async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const purchase_rivers_images = this.state.purchase_rivers_images.slice();

													purchase_rivers_images[index] = {
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
														purchase_rivers_images
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

const _formStyles = {
	switchRow: {
		flexDirection: 'row'
	},
	switchContainer: {
		flex: 1, 
		paddingHorizontal: sizes.spacing, 
		alignItems: "center", 
		justifyContent: "center"
	}
};

export default PurchaseForm;
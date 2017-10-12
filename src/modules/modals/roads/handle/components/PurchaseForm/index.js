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
import Switch from '~/components/SwitchOptions';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';

import regionsRoadsSource from '~/data/regions/handleRoads';
import countrySource from './data/country';
import trademarkSource from './data/trademark';
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
	purchase_roads_vehicle_type as mixinsVehicleType,
	purchase_roads_tonnage as mixinsTonnage,
	purchase_roads_year_built as mixinsYearsBuilt,
	purchase_roads_place_delivery as mixinsPlaceDelivery,
	purchase_roads_price as mixinsPrice,
	purchase_roads_contact_sms as mixinsContactSms,
	purchase_roads_contact_phone as mixinsContactPhone,
	purchase_roads_contact_email as mixinsContactMail,
	purchase_roads_information as mixinsInfomation,
	purchase_roads_country_built as mixinsCountryBuilt,
	purchase_roads_trademark as mixinsTrademark,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import _styles from '../../assets/formStyles';

class PurchaseForm extends React.Component {

	static displayName = '@PurchaseForm';

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
					purchase_roads_avatar: {
						...this.state.purchase_roads_avatar,
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

				const purchase_roads_images = this.state.purchase_roads_images.slice();

				purchase_roads_images.push({
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
					purchase_roads_images
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
				<View style={ _formStyles.switchRow }>

					<Avatar
						isHandle
						source  = {this.state.purchase_roads_avatar.source}
						onPress = {this._onPressAvatar}
					>{this.state.purchase_roads_avatar.code}</Avatar>

					<View style={ _formStyles.switchContainer }>
						<Switch
							onChange={(type) => {
								this.setState({ purchase_roads_type: type });
							}}
							value={(this.state.purchase_roads_type == 'SELL') ? false : true}
						/>
					</View>
				</View>

				{ /**[select]Loại phương tiện */}
				<TextInput
					ref           = "purchase_roads_vehicle_type"
					label         = {translate("Loại phương tiện")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_roads_vehicle_type.messageType}
					value         = {this.state.purchase_roads_vehicle_type.label}
					onPress       = {mixinsVehicleType.inputOnPress.bind(this)}
					required
				>{/*this.state.purchase_roads_vehicle_type.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_roads_vehicle_type.modalVisible}
					value          = {this.state.purchase_roads_vehicle_type.value}
					defaultValue   = {[]}
					source         = {vehicleType}
					title          = {translate("Loại phương tiện")}
					backHandle     = {mixinsVehicleType.modalBackHandle.bind(this)}
					onRequestClose = {mixinsVehicleType.modalBackHandle.bind(this)}
					onInit         = {mixinsVehicleType.modalOnInit.bind(this)}
					onChange       = {mixinsVehicleType.modalOnChange.bind(this)}
					searchBar      = {false}
					maxLength 	   = {50}
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				{ /** Trọng tải */}
				<TextInput
					ref           = "purchase_roads_tonnage"
					label         = {translate("Trọng tải P.tiện (Tấn)")}
					placeholder   = {translate("Nhập (vd: 16)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = {10}
					//messageType   = {this.state.purchase_roads_tonnage.messageType}
					value         = {this.state.purchase_roads_tonnage.value}
					onChangeText  = {mixinsTonnage.inputOnChangeText.bind(this)}
					required
				>{/*this.state.purchase_roads_tonnage.message*/}</TextInput>


				{ /**[select]Năm sản xuất */}
				<TextInput
					ref           = "purchase_roads_year_built"
					label         = {translate("Năm sản xuất")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_roads_year_built.messageType}
					value         = {this.state.purchase_roads_year_built.label}
					onPress       = {mixinsYearsBuilt.inputOnPress.bind(this)}
					required 	  = { this.state.purchase_roads_type == "SELL" }
				>{/*this.state.purchase_roads_year_built.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_roads_year_built.modalVisible}
					value          = {this.state.purchase_roads_year_built.value}
					defaultValue   = {[]}
					source         = {yearSource()}
					title          = {translate("Năm sản xuất")}
					backHandle     = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onRequestClose = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onInit         = {mixinsYearsBuilt.modalOnInit.bind(this)}
					onChange       = {mixinsYearsBuilt.modalOnChange.bind(this)}
					//searchBar      = {false}
					placeholder    = { translate("Tìm") }
					//multiple
					//showParent
					//keepInput
				></ModalCollapse>

				{ /**[select]Nước sản xuất */}
				<TextInput
					ref           = "purchase_roads_country_built"
					label         = {translate("Nước sản xuất")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_roads_country_built.messageType}
					value         = {this.state.purchase_roads_country_built.label}
					onPress       = {mixinsCountryBuilt.inputOnPress.bind(this)}
					required 	  = { this.state.purchase_roads_type == "SELL" }
				>{/*this.state.purchase_roads_country_built.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_roads_country_built.modalVisible}
					value          = {this.state.purchase_roads_country_built.value}
					defaultValue   = {[]}
					source         = {countrySource}
					title          = {translate("Nước sản xuất")}
					backHandle     = {mixinsCountryBuilt.modalBackHandle.bind(this)}
					onRequestClose = {mixinsCountryBuilt.modalBackHandle.bind(this)}
					onInit         = {mixinsCountryBuilt.modalOnInit.bind(this)}
					onChange       = {mixinsCountryBuilt.modalOnChange.bind(this)}
					maxLength 	   = {100}
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				{ /**[select]Hãng xe */}
				<TextInput
					ref           = "purchase_roads_trademark"
					label         = {translate("Hãng xe ")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_roads_trademark.messageType}
					value         = {this.state.purchase_roads_trademark.label}
					onPress       = {mixinsTrademark.inputOnPress.bind(this)}
					required 	  = { this.state.purchase_roads_type == "SELL" }
				>{/*this.state.purchase_roads_trademark.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_roads_trademark.modalVisible}
					value          = {this.state.purchase_roads_trademark.value}
					defaultValue   = {[]}
					source         = {trademarkSource}
					title          = {translate("Hãng xe")}
					backHandle     = {mixinsTrademark.modalBackHandle.bind(this)}
					onRequestClose = {mixinsTrademark.modalBackHandle.bind(this)}
					onInit         = {mixinsTrademark.modalOnInit.bind(this)}
					onChange       = {mixinsTrademark.modalOnChange.bind(this)}
					placeholder    = { translate("Tìm") }
					maxLength      = {100}
					//multiple
					//showParent
					//geolocation
					//searchToOther
					//keepInput
				></ModalCollapse>

				{ /**[select-geo]Nơi xem  */}
				<TextInput
					ref           = "purchase_roads_place_delivery"
					label         = {translate("Nơi xem xe")}
					placeholder   = {translate("Chọn quận/huyện")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_roads_place_delivery.messageType}
					value         = {this.state.purchase_roads_place_delivery.label}
					onPress       = {mixinsPlaceDelivery.inputOnPress.bind(this)}
					required
				>{/*this.state.purchase_roads_place_delivery.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_roads_place_delivery.modalVisible}
					value          = {this.state.purchase_roads_place_delivery.value}
					defaultValue   = {[]}
					source         = {regionsRoadsSource}
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
					ref           = "purchase_roads_price"
					label         = {translate("Giá đề xuất (tr)")}
					placeholder   = {translate("Nhập (vd: 100, hoặc 0 là giá thỏa thuận)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength 	  = {19}
					//messageType   = {this.state.purchase_roads_price.messageType}
					value         = {this.state.purchase_roads_price.value}
					onChangeText  = {mixinsPrice.inputOnChangeText.bind(this)}
					required
				>{/*this.state.purchase_roads_price.message*/}</TextInput>

				<Fieldset
					legend = {translate("Hình thức l.hệ")}
					required
					style  = {_styles.fieldset}
				>
					{ /**[input]sms */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_roads_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "purchase_roads_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_roads_contact_sms.messageType}
							value           = {this.state.purchase_roads_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.purchase_roads_contact_sms.editable}
							required
						>{this.state.purchase_roads_contact_sms.message}</TextInput>
					</View>

					{ /** dt liện hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_roads_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "purchase_roads_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_roads_contact_phone.messageType}
							value           = {this.state.purchase_roads_contact_phone.value}
							editable        = {this.state.purchase_roads_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.purchase_roads_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact}>
							<CheckBox disable checked={this.state.purchase_roads_contact_email.checked} />
							<IconEmail style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("Email") }
							ref             = "purchase_roads_contact_email"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "email-address"
							maxLength 		= {254}
							messageType     = {this.state.purchase_roads_contact_email.messageType}
							value           = {this.state.purchase_roads_contact_email.value}
							onChangeText    = {mixinsContactMail.inputOnChangeText.bind(this)}
							onBlur          = {mixinsContactMail.inputOnBlur.bind(this)}
							onSubmitEditing = {mixinsContactMail.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.purchase_roads_contact_email.message}</TextInput>
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


					{ /**[textarea]Ghi chú */}
					<TextInput
						ref                        = "purchase_roads_information"
						label                      = {`${translate("Ghi chú")} (${translate("không bắt buộc")})`}
						type                       = "textarea"
						style                      = {_styles.input}
						rows                       = {2}
						maxLength 				   = {1000}
						returnKeyType              = "done"
						value                      = {this.state.purchase_roads_information}
						onChangeText               = {text => this.setState({
							purchase_roads_information: text
						})}
					></TextInput>
					
					{ /**[image]  hình ghi chú */}
					<View style={_styles.imageRow}>
						{
							this.state.purchase_roads_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const purchase_roads_images = this.state.purchase_roads_images.slice();
									purchase_roads_images.splice(index, 1);

									this.setState({
										purchase_roads_images
									});
								};

								return (
									<AddImage
										key      = {`purchase_roads_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress  = {async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const purchase_roads_images = this.state.purchase_roads_images.slice();

													purchase_roads_images[index] = {
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
														purchase_roads_images
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
import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Text, Switch } from 'react-native';
import Avatar from '~/components/Avatar';
import TextInput from '~/components/TextInput';
import Fieldset from '~/components/Fieldset';
import CheckBox from '~/components/CheckBox';
import IconSms from '~/components/IconContact/Sms';
import IconPhone from '~/components/IconContact/Phone';
import IconEmail from '~/components/IconContact/Email';
import IconChat from '~/components/IconContact/Chat';
import SwitchOptions from '~/components/SwitchOptions';
import AgreementButton from '~/components/AgreementButton';
import AddImage from '~/components/AddImage';
import SubmitButton from '~/components/SubmitButton';
import ModalCollapse from '~/components/ModalCollapse';
import TagsInput from '~/components/TagsInput';

import regionsSeasSource from '~/data/regions/handleSeas';
import yearSource from '~/data/yearSource';
import vehicleType from './data/vehicleType';
import countryBuilt from './data/countryBuilt';
import engineSource from './data/engine';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';
import { translate, getCurrentLanguage } from '~/utilities/language';
import { hitSlop, sizes } from '~/configs/styles';
import { regex } from '~/utilities/isEmail';

/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	purchase_seas_vehicle_type as mixinsVehicleType,
	purchase_seas_dwt as mixinsDWT,
	purchase_seas_year_built as mixinsYearsBuilt,
	purchase_seas_place_inspect as mixinsPlaceInspect,
	purchase_seas_idea_price as mixinsPrice,
	purchase_seas_contact_sms as mixinsContactSms,
	purchase_seas_contact_phone as mixinsContactPhone,
	purchase_seas_contact_email as mixinsContactMail,
	purchase_seas_contact_skype as mixinsContactSkype,
	purchase_seas_country_built as mixinsCountryBuilt,
	purchase_seas_idea_price_currency as mixinsPriceCurrency,
	purchase_seas_total_me_power as mixinsPower,
	purchase_seas_total_me_power_unit as mixinsPowerUnit,
	purchase_seas_main_engine_maker as mixinsEngine,
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
					purchase_seas_avatar: {
						...this.state.purchase_seas_avatar,
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

				const purchase_seas_images = this.state.purchase_seas_images.slice();

				purchase_seas_images.push({
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
					purchase_seas_images
				});
			}
		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Chọn hình không thành công")
			});
		}
	}

	_renderYearBuilt() {

		//const language = getCurrentLanguage();

		return (
			<View>
				<TextInput
					ref           = "purchase_seas_year_built"
					label         = {translate("#$seas$#Năm đóng")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_seas_year_built.messageType}
					value         = {this.state.purchase_seas_year_built.label}
					onPress       = {mixinsYearsBuilt.inputOnPress.bind(this)}
					required      = { this.state.purchase_seas_type == "SELL" }
				>{/*this.state.purchase_seas_year_built.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_seas_year_built.modalVisible}
					value          = {this.state.purchase_seas_year_built.value}
					defaultValue   = {[]}
					source         = {yearSource(translate('#$seas$#Trước năm'))}
					title          = {translate("#$seas$#Năm đóng")}
					backHandle     = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onRequestClose = {mixinsYearsBuilt.modalBackHandle.bind(this)}
					onInit         = {mixinsYearsBuilt.modalOnInit.bind(this)}
					onChange       = {mixinsYearsBuilt.modalOnChange.bind(this)}
					searchBar      = {false}
					//otherPlaceholder 	= { translate("#$seas$#Nhập loại tàu khác") }
					//language 			= { language }
					labelApply 			= { translate("#$seas$#Áp dụng") }
					labelClear 			= { translate("#$seas$#Bỏ chọn") }
					//multiple
					//showParent
					//keepInput
				></ModalCollapse>
			</View>
		);
	}

	render() {

		const language = getCurrentLanguage();

		return (
			<View>
				{ /**Hình đại diện */}
				<View style={ _formStyles.switchRow }>

					<Avatar
						isHandle
						source={this.state.purchase_seas_avatar.source}
						onPress={this._onPressAvatar}
					>{this.state.purchase_seas_avatar.code}</Avatar>

					<View style={ _formStyles.switchContainer }>
						<SwitchOptions
							onChange = { type => this.setState({ purchase_seas_type: type })}
							value    = {(this.state.purchase_seas_type == 'SELL') ? false : true}
							labelLeft= { translate("#$seas$#Bán") }
							labelRight= { translate("#$seas$#Mua") }
						/>
					</View>
				</View>

				<TextInput
					ref           = "purchase_seas_vehicle_type"
					label         = {translate("#$seas$#Loại tàu")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_seas_vehicle_type.messageType}
					value         = {this.state.purchase_seas_vehicle_type.label}
					onPress       = {mixinsVehicleType.inputOnPress.bind(this)}
					required
				>{/*this.state.purchase_seas_vehicle_type.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_seas_vehicle_type.modalVisible}
					value          = {this.state.purchase_seas_vehicle_type.value}
					defaultValue   = {[]}
					source         = {vehicleType}
					title          = {translate("#$seas$#Loại tàu")}
					backHandle     = {mixinsVehicleType.modalBackHandle.bind(this)}
					onRequestClose = {mixinsVehicleType.modalBackHandle.bind(this)}
					onInit         = {mixinsVehicleType.modalOnInit.bind(this)}
					onChange       = {mixinsVehicleType.modalOnChange.bind(this)}
					searchBar      = {false}
					maxLength 	   = { 50 }
					otherPlaceholder 	= { translate("#$seas$#Nhập loại tàu khác") }
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
					ref           = "purchase_seas_dwt"
					label         = {translate("#$seas$#Dwt hoặc Bhp")}
					placeholder   = {translate("#$seas$#Nhập (vd: 16)")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					keyboardType  = "numeric"
					maxLength     = {10}
					//messageType   = {this.state.purchase_seas_dwt.messageType}
					value         = {this.state.purchase_seas_dwt.value}
					onChangeText  = {mixinsDWT.inputOnChangeText.bind(this)}
					required
				>{/*this.state.purchase_seas_dwt.message*/}</TextInput>


				{
					(
						!this.state.purchase_seas_type || 
						this.state.purchase_seas_type == 'SELL'
					) && 
						this._renderYearBuilt()
				}

				<TextInput
					ref           = "purchase_seas_country_built"
					label         = {translate("#$seas$#Nơi đóng")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_seas_country_built.messageType}
					value         = {this.state.purchase_seas_country_built.label}
					onPress       = {mixinsCountryBuilt.inputOnPress.bind(this)}
					required      = { this.state.purchase_seas_type == "SELL" }
				>{/*this.state.purchase_seas_place_inspect.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_seas_country_built.modalVisible}
					value          = {this.state.purchase_seas_country_built.value}
					defaultValue   = {[]}
					source         = {countryBuilt}
					title          = {translate("#$seas$#Nơi đóng")}
					backHandle     = {mixinsCountryBuilt.modalBackHandle.bind(this)}
					onRequestClose = {mixinsCountryBuilt.modalBackHandle.bind(this)}
					onInit         = {mixinsCountryBuilt.modalOnInit.bind(this)}
					onChange       = {mixinsCountryBuilt.modalOnChange.bind(this)}
					searchBar      = {false}
					maxLength 	   = { 50 }
					otherPlaceholder 	= { translate("#$seas$#Nhập nơi đóng khác") }
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
					ref           = "purchase_seas_place_inspect"
					label         = {translate("#$seas$#Nơi khảo sát tàu")}
					placeholder   = {translate("#$seas$#Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.purchase_seas_place_inspect.messageType}
					value         = {this.state.purchase_seas_place_inspect.label}
					onPress       = {mixinsPlaceInspect.inputOnPress.bind(this)}
					required      = { this.state.purchase_seas_type == "SELL" }
				>{/*this.state.purchase_seas_place_inspect.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.purchase_seas_place_inspect.modalVisible}
					value          = {this.state.purchase_seas_place_inspect.value}
					defaultValue   = {[]}
					source         = {regionsSeasSource}
					title          = {translate("#$seas$#Nơi khảo sát tàu")}
					backHandle     = {mixinsPlaceInspect.modalBackHandle.bind(this)}
					onRequestClose = {mixinsPlaceInspect.modalBackHandle.bind(this)}
					onInit         = {mixinsPlaceInspect.modalOnInit.bind(this)}
					onChange       = {mixinsPlaceInspect.modalOnChange.bind(this)}
					placeholder 		= { translate("#$seas$#Tìm tỉnh, thành phố") }
					otherPlaceholder 	= { translate("#$seas$#Nhập nơi khảo sát tàu khác") }
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

				<View style={ _styles.inputRow }>
					<View style={ _styles.inputLeft }>
						<TextInput
							ref 			= "purchase_seas_idea_price"
							label 			= { translate("#$seas$#Giá đề xuất (tr)") }
							placeholder 	= { translate("#$seas$#Nhập (vd: 8,3)") }
							type 			= "input"
							//style 			= { _styles.inputLeft }
							returnKeyType 	= "next"
							keyboardType 	= "numeric"
							maxLength 		= { 19 }
							//messageType 	= { this.state.purchase_seas_idea_price.messageType }
							value 			= { this.state.purchase_seas_idea_price.value }
							onChangeText 	= { mixinsPrice.inputOnChangeText.bind(this) }
							required
						>{ /*this.state.purchase_seas_idea_price.message*/ }</TextInput>
						<View style={ _styles.switchFreightRow }>
							<Text style={ _styles.freightUnit }>{ translate("#$seas$#Đơn vị tính") }: </Text>
							<Text style={ this.state.purchase_seas_idea_price_currency.value !== "vnd" ? _styles.unitActive : _styles.freightUnit }>{ translate("usd") } </Text>
							<Switch
								onValueChange 	= { mixinsPriceCurrency.switchOnValueChange.bind(this) }
								value 			= { this.state.purchase_seas_idea_price_currency.value === "vnd" }
								hitSlop 		= { hitSlop }
								// thumbTintColor 	= {}
								// onTintColor = {'rgba(0, 230, 118, 0.24)'}
								// tintColor = {'rgba(255, 23, 68, 0.3)'}
							/>
							<Text style={ this.state.purchase_seas_idea_price_currency.value === "vnd" ? _styles.unitActive : _styles.freightUnit }> { translate("vnd") }</Text>
						</View>
					</View>

					<View style={ _styles.inputMiddle }>
						<Text style={ _styles.textOr }>{ translate("#$seas$#Hoặc") }</Text>
						<Text style={ _styles.textChoosePrice }>{ translate("#$seas$#chọn giá") }</Text>
					</View>

					<AgreementButton 
						checked 	= { this.state.purchase_seas_idea_price.value === 0 || this.state.purchase_seas_idea_price.value === "0" }
						onPress 	= { mixinsPrice.agreeOnPress.bind(this) }
						label 		= { translate("#$seas$#Thoả thuận") }
					/>
				</View>

				<Fieldset
					legend = {translate("#$seas$#Hình thức l.hệ")}
					required
					style  = {_styles.fieldset}
				>
					{ /**[input]sms */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_seas_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "purchase_seas_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_seas_contact_sms.messageType}
							value           = {this.state.purchase_seas_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.purchase_seas_contact_sms.editable}
							required
						>{this.state.purchase_seas_contact_sms.message}</TextInput>
					</View>

					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.purchase_seas_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "purchase_seas_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.purchase_seas_contact_phone.messageType}
							value           = {this.state.purchase_seas_contact_phone.value}
							editable        = {this.state.purchase_seas_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.purchase_seas_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.purchase_seas_contact_email.checked } />
							<IconEmail style={ _styles.iconContact }/>
						</View>

						<TagsInput
							ref 			= "purchase_seas_contact_email"
							style 			= { _styles.inputContact }
							messageType 	= { this.state.purchase_seas_contact_email.messageType }
							value 			= { this.state.purchase_seas_contact_email.value }
							regex 			= { regex }
							returnKeyType 	= "next"
							keyboardType 	= "email-address"
							maxLength 		= { 254 }
							placeholder 	= { translate("#$seas$#Nhập email") }
							onBlur 			= { mixinsContactMail.inputOnBlur.bind(this) }
							onSubmitEditing = { mixinsContactMail.inputOnSubmitEditing.bind(this) }
							onChange 		= { mixinsContactMail.inputOnChange.bind(this) }
						>{ this.state.purchase_seas_contact_email.message }</TagsInput>
					</View>
					<View style={ _styles.rowContact }>
						<View style={ _styles.contact }>
							<CheckBox disable checked={ this.state.purchase_seas_contact_skype.checked } />
							<IconChat style={ _styles.iconContact }/>
						</View>

						<TextInput
							//placeholder = { translate("skype") }
							ref 			= "purchase_seas_contact_skype"
							type 			= "input"
							style 			= { _styles.inputContact }
							inputStyle 		= { _styles.inputContactStyle }
							returnKeyType 	= "next"
							maxLength 		= { 50 }
							//messageType 	= { this.state.purchase_seas_contact_skype.messageType }
							value 			= { this.state.purchase_seas_contact_skype.value }
							onBlur 			= { mixinsContactSkype.inputOnBlur.bind(this) }
							onChangeText 	= { mixinsContactSkype.inputOnChangeText.bind(this) }
							onSubmitEditing = { mixinsContactSkype.inputOnSubmitEditing.bind(this) }
							required
						>{ /*this.state.purchase_seas_contact_skype.message*/ }</TextInput>
					</View>
				</Fieldset>

				<Fieldset
					legend = {translate("#$seas$#Ghi chú tin đăng")}
					style  = {_styles.fieldset}
				>

					{
						(this.state.purchase_seas_type == 'BUY') && 
							this._renderYearBuilt()
					}

					{ /** công suất */}
					<View style={ _styles.inputRow }>
						<View style={ _styles.inputLeft }>
							<TextInput
								ref 			= "purchase_seas_total_me_power"
								label 			= { translate("#$seas$#Tổng công suất máy") }
								//placeholder 	= { translate("Nhập (vd: 8,3)") }
								type 			= "input"
								//style 			= { _styles.inputLeft }
								returnKeyType 	= "next"
								keyboardType 	= "numeric"
								maxLength 		= { 10 }
								//messageType 	= { this.state.purchase_seas_total_me_power.messageType }
								value 			= { this.state.purchase_seas_total_me_power.value }
								onChangeText 	= { mixinsPower.inputOnChangeText.bind(this) }
							>{ /*this.state.purchase_seas_total_me_power.message*/ }</TextInput>
						</View>
						<View style={ _styles.inputRight }>
							<Text style={ _styles.freightUnit }>{ translate("#$seas$#Đơn vị tính") }: </Text>
							<View style={ _formStyles.switchRow }>
								<Text style={ this.state.purchase_seas_total_me_power_unit.value !== "kw" ? _styles.unitActive : _styles.freightUnit }>{ translate("bhp") } </Text>
								<Switch
									onValueChange 	= { mixinsPowerUnit.switchOnValueChange.bind(this) }
									value 			= { this.state.purchase_seas_total_me_power_unit.value === "kw" }
									hitSlop 		= { hitSlop }
									// thumbTintColor 	= {}
									// onTintColor = {'rgba(0, 230, 118, 0.24)'}
									// tintColor = {'rgba(255, 23, 68, 0.3)'}
								/>
								<Text style={ this.state.purchase_seas_total_me_power_unit.value === "kw" ? _styles.unitActive : _styles.freightUnit }> { translate("kw") }</Text>
							</View>
						</View>
					</View>

					<TextInput
						ref           = "purchase_seas_main_engine_maker"
						label         = {translate("#$seas$#Loại máy tàu")}
						placeholder   = {translate("#$seas$#Chọn")}
						type          = "select"
						style         = {_styles.input}
						returnKeyType = "next"
						//messageType   = {this.state.purchase_seas_main_engine_maker.messageType}
						value         = {this.state.purchase_seas_main_engine_maker.label}
						onPress       = {mixinsEngine.inputOnPress.bind(this)}
					>{/*this.state.purchase_seas_main_engine_maker.message*/}</TextInput>
					<ModalCollapse
						visible        = {this.state.purchase_seas_main_engine_maker.modalVisible}
						value          = {this.state.purchase_seas_main_engine_maker.value}
						defaultValue   = {[]}
						source         = {engineSource}
						title          = {translate("#$seas$#Loại máy tàu")}
						backHandle     = {mixinsEngine.modalBackHandle.bind(this)}
						onRequestClose = {mixinsEngine.modalBackHandle.bind(this)}
						onInit         = {mixinsEngine.modalOnInit.bind(this)}
						onChange       = {mixinsEngine.modalOnChange.bind(this)}
						searchBar      = {false}
						maxLength 	   = {100}
						otherPlaceholder 	= { translate("#$seas$#Nhập loại máy tàu khác") }
						//currentLocationLabel= { translate("#$seas$#Vị trí hiện tại") }
						language 			= { language }
						labelApply 			= { translate("#$seas$#Áp dụng") }
						labelClear 			= { translate("#$seas$#Bỏ chọn") }
						//multiple
						//showParent
						//keepInput
					></ModalCollapse>

					<TextInput
						ref                       = "purchase_seas_information"
						label                     = {`${translate("#$seas$#Ghi chú")} (${translate("#$seas$#không bắt buộc")})`}
						type                      = "textarea"
						style                     = {_styles.input}
						rows                      = {2}
						maxLength 				  = {1000}
						returnKeyType             = "done"
						value                     = {this.state.purchase_seas_information}
						onChangeText              = {text => this.setState({
							purchase_seas_information: text
						})}
					></TextInput>
					
					<View style={_styles.imageRow}>
						{
							this.state.purchase_seas_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const purchase_seas_images = this.state.purchase_seas_images.slice();
									purchase_seas_images.splice(index, 1);

									this.setState({
										purchase_seas_images
									});
								};

								return (
									<AddImage
										key      = {`purchase_seas_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress  = {async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const purchase_seas_images = this.state.purchase_seas_images.slice();

													purchase_seas_images[index] = {
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
														purchase_seas_images
													})
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
					label 	 	= { this.props.isUpdate ? translate("#$seas$#Lưu tin") : translate("#$seas$#Đăng ngay") }
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
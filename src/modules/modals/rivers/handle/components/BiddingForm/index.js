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
import DatePicker from '~/components/DatePicker';

import regionsRiversSource from '~/data/regions/handleRivers';
import { translate } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import showImagePicker from '~/utilities/showImagePicker';

/**
 * @Lấy sự kiện được khai báo trong mixins
 */
import {
	bidding_rivers_title_own as mixinsTitleOwn,
	bidding_rivers_place as mixinsPlace,
	bidding_rivers_time as mixinsTime,
	bidding_rivers_contact_sms as mixinsContactSms,
	bidding_rivers_contact_phone as mixinsContactPhone,
	bidding_rivers_contact_email as mixinsContactMail,
	bidding_rivers_information as mixinsInfomation,
	submit
} from './mixins';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import now from './data/now';
import _styles from '../../assets/formStyles';

class BiddingForm extends React.Component {

	static displayName = '@BiddingForm';

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

			if (!res.didCancel && res.data) {

				this.setState({
					bidding_rivers_avatar: {
						...this.state.bidding_rivers_avatar,
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

				const bidding_rivers_images = this.state.bidding_rivers_images.slice();

				bidding_rivers_images.push({
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
					bidding_rivers_images
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
				{/*
				<Switch
					onValueChange = { () => this.setState({abc: !this.state.abc})   }
					value = { this.state.abc }
				/>*/}

				{ /**Hình đại diện */}
				<Avatar
					isHandle
					source  = {this.state.bidding_rivers_avatar.source}
					onPress = {this._onPressAvatar}
				>{this.state.bidding_rivers_avatar.code}</Avatar>

				{ /** [input] tiêu đề  */}
				<TextInput
					ref           = "bidding_rivers_title_own"
					label         = {translate("Tiêu đề")}
					placeholder   = {translate("Nhập không quá 160 ký tự")}
					type          = "input"
					style         = {_styles.input}
					returnKeyType = "next"
					maxLength 	  = { 160 }
					//messageType   = { this.state.bidding_rivers_title_own.messageType }
					value         = {this.state.bidding_rivers_title_own.value}
					onChangeText  = {mixinsTitleOwn.inputOnChangeText.bind(this)}
					required
				>{ /*this.state.bidding_rivers_title_own.message*/ }</TextInput>


				{/** [select-geo] Vị trí */}
				<TextInput
					ref           = "bidding_rivers_place"
					label         = {translate("Vị trí")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.bidding_rivers_place.messageType}
					value         = {this.state.bidding_rivers_place.label}
					onPress       = {mixinsPlace.inputOnPress.bind(this)}
					required
				>{/*this.state.bidding_rivers_place.message*/}</TextInput>
				<ModalCollapse
					visible        = {this.state.bidding_rivers_place.modalVisible}
					value          = {this.state.bidding_rivers_place.value}
					defaultValue   = {[]}
					source         = {regionsRiversSource}
					title          = {translate("Nơi xem")}
					backHandle     = {mixinsPlace.modalBackHandle.bind(this)}
					onRequestClose = {mixinsPlace.modalBackHandle.bind(this)}
					onInit         = {mixinsPlace.modalOnInit.bind(this)}
					onChange       = {mixinsPlace.modalOnChange.bind(this)}
					//multiple
					//showParent
					geolocation
					searchToOther
					keepInput
				></ModalCollapse>

				{/** [datepicker] ngày cho thuê */}
				<TextInput
					ref           = "bidding_rivers_time"
					label         = {translate("Ngày bắt đầu thuê")}
					placeholder   = {translate("Chọn")}
					type          = "select"
					style         = {_styles.input}
					returnKeyType = "next"
					//messageType   = {this.state.bidding_rivers_time.messageType}
					value         = {this.state.bidding_rivers_time.label}
					onPress       = {mixinsTime.inputOnPress.bind(this)}
					required
				>{/*this.state.bidding_rivers_time.message*/}</TextInput>
				<DatePicker
					visible      = {this.state.bidding_rivers_time.modalVisible}
					date         = {this.state.bidding_rivers_time.value}
					minDate      = {now}
					maxDate      = {this.state.bidding_rivers_time.value != now ? this.state.bidding_rivers_time.value: undefined}
					onDateChange = {mixinsTime.pickerOnDateChange.bind(this)}
					onCancel     = {mixinsTime.pickerOnCancel.bind(this)}
					onError      = {mixinsTime.pickerOnError.bind(this)}
				/>

				<Fieldset
					legend={translate("Hình thức l.hệ")}
					required
					style={_styles.fieldset}
				>
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactSms.checkboxOnPress.bind(this)}>
							<CheckBox checked={this.state.bidding_rivers_contact_sms.checked} />
							<IconSms />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT SMS") }
							ref             = "bidding_rivers_contact_sms"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.bidding_rivers_contact_sms.messageType}
							value           = {this.state.bidding_rivers_contact_sms.value}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactSms.inputOnSubmitEditing.bind(this)}
							onBlur          = {mixinsContactSms.inputOnBlur.bind(this)}
							editable        = {this.state.bidding_rivers_contact_sms.editable}
							required
						>{this.state.bidding_rivers_contact_sms.message}</TextInput>
					</View>

					{ /** dt liện hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact} onPress={mixinsContactPhone.checkboxOnPress.bind(this)} >
							<CheckBox checked={this.state.bidding_rivers_contact_phone.checked} />
							<IconPhone style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("SĐT") }
							ref             = "bidding_rivers_contact_phone"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "phone-pad"
							maxLength       = {15}
							messageType     = {this.state.bidding_rivers_contact_phone.messageType}
							value           = {this.state.bidding_rivers_contact_phone.value}
							editable        = {this.state.bidding_rivers_contact_phone.editable}
							onBlur          = {mixinsContactPhone.inputOnBlur.bind(this)}
							onChangeText    = {mixinsContactSms.inputOnChangeText.bind(this)}
							onSubmitEditing = {mixinsContactPhone.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.bidding_rivers_contact_phone.message}</TextInput>
					</View>

					{ /** email liên hệ */}
					<View style={_styles.rowContact}>
						<TouchableOpacity style={_styles.contact}>
							<CheckBox disable checked={this.state.bidding_rivers_contact_email.checked} />
							<IconEmail style={_styles.iconContact} />
						</TouchableOpacity>

						<TextInput
							//placeholder   = { translate("Email") }
							ref             = "bidding_rivers_contact_email"
							type            = "input"
							style           = {_styles.inputContact}
							inputStyle      = {_styles.inputContactStyle}
							returnKeyType   = "next"
							keyboardType    = "email-address"
							maxLength 		= {254}
							messageType     = {this.state.bidding_rivers_contact_email.messageType}
							value           = {this.state.bidding_rivers_contact_email.value}
							onChangeText    = {mixinsContactMail.inputOnChangeText.bind(this)}
							onBlur          = {mixinsContactMail.inputOnBlur.bind(this)}
							onSubmitEditing = {mixinsContactMail.inputOnSubmitEditing.bind(this)}
							required
						>{this.state.bidding_rivers_contact_email.message}</TextInput>
					</View>
				</Fieldset>

				<Fieldset
					legend = {translate("Ghi chú tin đăng")}
					style  = {_styles.fieldset}
				>
					{ /**[textarea]Ghi chú */}
					<TextInput
						ref                        = "bidding_rivers_information"
						label                      = {`${translate("Ghi chú")} (${translate("không bắt buộc")})`}
						type                       = "textarea"
						style                      = {_styles.input}
						rows                       = {2}
						returnKeyType              = "done"
						maxLength 				   = {1000}
						value                      = {this.state.bidding_rivers_information}
						onChangeText               = {text => this.setState({
							bidding_rivers_information: text
						})}
					></TextInput>
					{ /**[image] Image */}
					<View style={_styles.imageRow}>
						{
							this.state.bidding_rivers_images.map(({ source = null, info = {} }, index) => {

								const onRemove = () => {

									const bidding_rivers_images = this.state.bidding_rivers_images.slice();
									bidding_rivers_images.splice(index, 1);

									this.setState({
										bidding_rivers_images
									});
								};

								return (
									<AddImage
										key      = {`bidding_rivers_images-${index}`}
										source   = {source}
										onError  = {onRemove}
										onRemove = {onRemove}
										onPress = {async () => {
											try {

												const res = await showImagePicker();

												if (!res.didCancel && res.data) {

													const bidding_rivers_images = this.state.bidding_rivers_images.slice();

													bidding_rivers_images[index] = {
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
														bidding_rivers_images
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

export default BiddingForm;
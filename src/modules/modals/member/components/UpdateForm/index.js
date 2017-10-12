"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TextInput from '~/components/TextInput';
import LoadingButton from '~/components/LoadingButton';
import { translate } from '~/utilities/language';
import generateState from './utilities/generateState';
import shallowEqual from 'fbjs/lib/shallowEqual';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import showImagePicker from '~/utilities/showImagePicker';
import alertUtil from '~/utilities/alert';
import AddImage from '~/components/AddImage';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

import {
	account_company_name as companyName,
	account_code as accountCode,
	account_mobile as accountMobile,
	account_email as accountMail,
	account_company_address as companyAddress,
	account_tax_code as companyTaxCode,
	account_contact as accountContact,
	account_company_introduce as companyIntro,
	account_legal_paper as accountPaper,
	submit
} from './mixins';

class UpdateForm extends React.Component {

	static displayName = "UpdateForm";

	static propTypes = {
		loading: PropTypes.bool,
		source: PropTypes.object,
		onSubmit: PropTypes.func.isRequired
	};

	static defaultProps = {
		loading: false,
		source: {}
	};

	constructor( props ) {
		super( props );

		this.state = generateState( props.source );
	}

	componentWillReceiveProps( nextProps ) {

		if (this.props.loading !== nextProps.loading && this.props.source != nextProps.source) {

			this.setState(generateState(nextProps.source, this.state));
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			this.props.loading !== nextProps.loading ||
			!shallowEqual(this.state, nextState)
		);
	}

	render() {

		return (
			<View>
				<TextInput
					ref                     = "account_company_name"
					label 					= { translate("Tên công ty") }
					type 					= "input"
					returnKeyType           = "next"
					//autoFocus               = {true}
					style 					= { _styles.input }
					value                   = { this.state.account_company_name.value }
					messageType             = { this.state.account_company_name.messageType }
					onChangeText 			= { companyName.inputOnChangeText.bind(this) }
					onSubmitEditing 		= { companyName.inputOnSubmitEditing.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					maxLength 				= {100}
					required
				>{ this.state.account_company_name.message }</TextInput>

				<TextInput
					ref                     = "account_code"
					label 					= { translate("Mã khách hàng") }
					type 					= "input"
					returnKeyType           = "next"
					maxLength 				= {5}
					style 					= { _styles.input }
					value 					= { this.state.account_code.value }
					messageType 			= { this.state.account_code.messageType }
					onChangeText 			= { accountCode.inputOnChangeText.bind(this) }
					onEndEditing 			= { accountCode.inputOnEndEditing.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					required
				>{ this.state.account_code.message }</TextInput>

				<TextInput
					ref                     = "account_mobile"
					label 					= { translate("Điện thoại") }
					type 					= "input"
					keyboardType 			= "phone-pad"
					maxLength 				= {15}
					style 					= { _styles.input }
					value                   = { this.state.account_mobile.value }
					messageType             = { this.state.account_mobile.messageType }
					onChangeText 			= { accountMobile.inputOnChangeText.bind(this) }
					onEndEditing 			= { accountMobile.inputOnEndEditing.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					required
				>{ this.state.account_mobile.message }</TextInput>

				<TextInput
					ref                     = "account_email"
					label 					= { translate("Email") }
					type 					= "input"
					keyboardType 			= "email-address"
					maxLength 				= {254}
					style 					= { _styles.input }
					value 					= { this.state.account_email.value }
					messageType 			= { this.state.account_email.messageType }
					onChangeText 			= { accountMail.inputOnChangeText.bind(this) }
					onEndEditing 			= { accountMail.inputOnEndEditing.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					required
				>{ this.state.account_email.message }</TextInput>

				<TextInput
					ref                     = "account_company_address"
					label 					= { translate("Địa chỉ công ty") }
					type 					= "input"
					returnKeyType 			= "next"
					style 					= { _styles.input }
					value                   = { this.state.account_company_address }
					onChangeText 			= { companyAddress.inputOnChangeText.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					maxLength 				= {100}
				></TextInput>

				<TextInput
					ref 					= "account_tax_code"
					label 					= { translate("Mã số thuế") }
					type 					= "input"
					returnKeyType 			= "next"
					keyboardType 			= "numeric"
					maxLength 				= {10}
					style 					= { _styles.input }
					value 					= { this.state.account_tax_code.value }
					onChangeText 			= { companyTaxCode.inputOnChangeText.bind(this) }
					onEndEditing 			= { companyTaxCode.inputOnEndEditing.bind(this) }
					messageType 			= { this.state.account_tax_code.messageType }
					placeholderTextColor    = { colors.placeholderColor }
				>{ this.state.account_tax_code.message }</TextInput>

				<TextInput
					ref 					= "account_legal_paper"
					label 					= { translate("Giấy phép kinh doanh") }
					type 					= "input"
					returnKeyType 			= "next"
					style 					= { _styles.input }
					value                   = { this.state.account_legal_paper }
					placeholderTextColor    = { colors.placeholderColor }
					editable 				= {false}
					addon 					= {(
						<TouchableOpacity  hitSlop={ hitSlop } style={_styles.addon} onPress={accountPaper.addonOnPress.bind(this)}>
							<MTIcon name="add-a-photo" style={_styles.addonIcon} />
						</TouchableOpacity>
					)}
				></TextInput>

				<TextInput
					ref 					= "account_contact"
					label 					= { translate("Người phụ trách") }
					type 					= "input"
					returnKeyType 			= "next"
					style 					= { _styles.input }
					value 					= { this.state.account_contact }
					onChangeText 			= { accountContact.inputOnChangeText.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					maxLength 				= {100}
				></TextInput>

				<TextInput
					label 					= { translate("Thông tin khác") }
					type 					= "textarea"
					returnKeyType 			= "done"
					style 					= { _styles.input }
					value 					= { this.state.account_company_introduce }
					onChangeText 			= { companyIntro.inputOnChangeText.bind(this) }
					placeholderTextColor    = { colors.placeholderColor }
					rows 					= { 3 }
					maxLength 				= {2000}
				></TextInput>

				<View style={_styles.rowImages}>
					{
						this.state.account_images.map(({ source = null, info = {} }, index) => {

							const onRemove = () => {

								const account_images = this.state.account_images.slice();
								account_images.splice(index, 1);

								this.setState({
									account_images
								});
							};

							return (
								<AddImage
									key={`account_images-${index}`}
									source={source}
									onError={onRemove}
									onRemove={onRemove}
									onPress={async () => {
										try {

											const res = await showImagePicker();

											if (!res.didCancel && res.data) {

												const account_images = this.state.account_images.slice();

												account_images[index] = {
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
													account_images
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
						onPress={async () => {

							try {

								const res = await showImagePicker();

								if (!res.didCancel && res.data) {

									const account_images = this.state.account_images.slice();

									account_images.push({
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
										account_images
									});
								}
							} catch (e) {

								alertUtil({
									title: translate("Lỗi"),
									message: translate("Chọn hình không thành công")
								});
							}
						}}
					>
					</AddImage>
				</View>

				<LoadingButton
					loading 				= { this.props.loading }
					onPress 				= { submit.bind(this) }
				>{ translate("Cập nhật") }</LoadingButton>
			</View>
		)
	}
}

const _styles = {
	input: {
		marginBottom: sizes.margin
	},
	addon: {
		backgroundColor: colors.secondBackgroundColor,
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	addonIcon: {
		color: colors.boldColor,
		fontSize: 14 * scale,
		backgroundColor: "transparent"
	},
	rowImages: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: sizes.margin
	}
};

export default UpdateForm;
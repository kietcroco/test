"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { Text, ScrollView, RefreshControl } from 'react-native';
import { sizes, colors, fontSizes } from '~/configs/styles';
import TextInput from '~/components/TextInput';
import LoadingButton from '~/components/LoadingButton';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { translate } from '~/utilities/language';
import loginService from '~/services/member/login';
import alertUtil from '~/utilities/alert';

import { namespace } from '../constants';
const routeUpdateName = `${ namespace }/update-profile`;

class Profile extends React.Component {

	static displayName = "Profile";

	static propTypes = {
		token: PropTypes.string,
		authIdentity: PropTypes.object
	};

	static defaultProps = {
		token: null,
		authIdentity: null
	};

	constructor( props ) {
		super( props );

		const { authIdentity: {
			account_company_name = "", // tên công ty
			account_code = "", // mã KH
			account_mobile = "", // điện thoại
			account_email = "", // email
			account_company_address = "", // địa chỉ công ty
			account_tax_code = "", // mã số thuế
			account_legal_paper = "", // giấy phép kinh doanh
			account_contact = "", // người phụ trách
			account_company_introduce = "" // thông tin khác
		} = {} } = props;

		this.state = {
			account_company_name,
			account_code,
			account_mobile,
			account_email,
			account_company_address,
			account_tax_code,
			account_legal_paper,
			account_contact,
			account_company_introduce,
			refreshing: false
		};
	}

	componentWillReceiveProps( nextProps ) {

		const { authIdentity = {} } = this.props;
		const { authIdentity: nextAuthIdentity = {} } = nextProps;

		if( !shallowEqual( authIdentity, nextAuthIdentity ) ){

			const {
				account_company_name = "", // tên công ty
				account_code = "", // mã KH
				account_mobile = "", // điện thoại
				account_email = "", // email
				account_company_address = "", // địa chỉ công ty
				account_tax_code = "", // mã số thuế
				account_legal_paper = "", // giấy phép kinh doanh
				account_contact = "", // người phụ trách
				account_company_introduce = "" // thông tin khác
			} = nextAuthIdentity;

			this.setState({
				account_company_name,
				account_code,
				account_mobile,
				account_email,
				account_company_address,
				account_tax_code,
				account_legal_paper,
				account_contact,
				account_company_introduce
			});
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			!shallowEqual( this.state, nextState )
		);
	}

	async onRefresh() {
		
		!this.state.refreshing && this.setState({
			refreshing: true
		});

		try {
			const res = await loginService.login();
			
			if( res.status === 200 && res.data && res.data.STATUS == "ERROR" ) {

				this.setState({
					refreshing: false
				});
				return alertUtil({ 
					title: res.data.messageTitle || translate("Lỗi"),
					message: res.data.message || translate("Đăng nhập không thành công") 
				});
			}
		} catch (error) {
			
			alertUtil({ 
				title: translate("Lỗi"),
				message: translate("Đăng nhập không thành công") 
			});
		}

		this.setState({
			refreshing: false
		});
	}

	render() {

		return (
			<ScrollView
				style 							= { _styles.wrapper } 
				contentContainerStyle 			= { _styles.container }
				horizontal 						= { false }
				keyboardDismissMode 			= "interactive"	
				keyboardShouldPersistTaps 		= "always"	
				showsHorizontalScrollIndicator 	= { false }
				directionalLockEnabled 			= { true }
				refreshControl 					= {
					<RefreshControl
						refreshing 				= { this.state.refreshing }
						onRefresh 				= { this.onRefresh.bind(this) }
						colors 					= { _styles.refreshColor }
					/>
				}
			>
				<Text style={ _styles.title }>{ translate("THÔNG TIN TÀI KHOẢN") }</Text>

				<TextInput
					label 					= { translate("Tên công ty") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_company_name }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Mã khách hàng") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_code }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Điện thoại") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_mobile }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Email") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_email }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Địa chỉ công ty") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_company_address }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Mã số thuế") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_tax_code }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Giấy phép kinh doanh") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_legal_paper }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Người phụ trách") }
					type 					= "input"
					style 					= { _styles.input }
					value                   = { this.state.account_company_address }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
				></TextInput>

				<TextInput
					label 					= { translate("Thông tin khác") }
					type 					= "textarea"
					style 					= { _styles.input }
					value                   = { this.state.account_company_address }
					editable                = { false }
					placeholderTextColor    = { colors.placeholderColor }
					disableColor            = { colors.primaryBackgroundColor }
					rows 					= { 3 }
				></TextInput>

				<LoadingButton
					loading 				= { this.state.refreshing }
					onPress 				= { () => this.props.navigation.navigate( routeUpdateName ) }
				>{ translate("Sửa thông tin tài khoản") }</LoadingButton>
			</ScrollView>
		)
	}

	componentDidUpdate() {

		if( !this.props.token ) {
			
			alertUtil({
				title: translate("Lỗi"), 
				message: translate("Sai thông tin đăng nhập") 
			});
			this.props.navigation.goBack();
		}
	}

	componentDidMount() {

		if( !this.props.token ) {

			alertUtil({
				title: translate("Lỗi"), 
				message: translate("Sai thông tin đăng nhập") 
			});
			this.props.navigation.goBack();
		}
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		padding: sizes.margin
	},
	title: {
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontWeight: "bold",
		color: colors.boldColor,
		fontSize: fontSizes.normal,
		marginBottom: sizes.margin
	},
	input: {
		marginBottom: sizes.margin
	}
};

export default Profile;
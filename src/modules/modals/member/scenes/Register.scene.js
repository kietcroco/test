import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import { translate } from '~/utilities/language';
import accountService from '~/services/member/account';
import shallowEqual from 'fbjs/lib/shallowEqual';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes } from '~/configs/styles';

import { namespace } from '../constants';
const activeRouteName = `${namespace}/active`;

class Register extends React.Component {

	static displayName = "Register";

	constructor( props ) {
		super( props );

		const {
			params: {
				account_mobile = "",
				account_code = "",
				account_password = "",
				account_email = "",
				account_company_name = ""
			} = {}
		} = props.navigation.state || {};

		this.state = {
			loading: false,
			source: {
				account_mobile,
				account_code,
				account_password,
				account_email,
				account_company_name
			}
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {

        if( this.props.token !== nextProps.token && nextProps.token ) {

			nextProps.navigation.goBack();
		}

		const { params } = this.props.navigation.state || {};
		const { params: nextParams } = nextProps.navigation.state || {};
		if( !shallowEqual( params, nextParams ) ) {

			const {
				params: {
					account_mobile = "",
					account_code = "",
					account_password = "",
					account_email = "",
					account_company_name = ""
				} = {}
			} = nextProps.navigation.state || {};

			this.setState({
				source: {
					...this.state.source,
					account_mobile,
					account_code,
					account_password,
					account_email,
					account_company_name
				}
			});
		}
    }

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.loading !== nextState.loading ||
			!shallowEqual( this.state.source, nextState.source )
		);
	}

	async _onSubmit( data: Object = {} ) {

		!this.state.loading && this.setState({
			loading: true
		});

		try {
			
			const res = await accountService.register( data );

			this.state.loading && this.setState({
				loading: false
			});

			if( res.status === 200 && res.data ) {

				if( res.data.data.account_mobile ) {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Đăng ký thành công vui lòng kích hoạt tài khoản")
					});
					this.props.navigation.replace(activeRouteName, {
						account_mobile: res.data.data.account_mobile
					});

					return this.props.dispatch({
						type: "setAuthIdentityUnActive",
						payload: res.data.data
					});
				}
			}

			alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Đăng ký không thành công")
			});

			if (this.props.authIdentityUnActive) {

				return this.props.dispatch({
					type: "deleteAuthIdentityUnActive"
				});
			}

			return;
		} catch (error) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Đăng ký không thành công")
			});

			if (this.props.authIdentityUnActive) {

				this.props.dispatch({
					type: "deleteAuthIdentityUnActive"
				});
			}
		}	

		this.state.loading && this.setState({
			loading: false
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
			>
				<Text style={ _styles.title }>{ translate("ĐĂNG KÝ THÀNH VIÊN") }</Text>
				<RegisterForm 
					onSubmit 	= { this._onSubmit } 
					navigation 	= { this.props.navigation }
					loading 	= { this.state.loading }
					source 		= { this.state.source }
				/>
			</ScrollView>
		);
	}

	componentDidMount() {

		this.props.token && this.props.navigation.goBack();
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		paddingHorizontal: sizes.margin,
		paddingTop: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	title: {
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontWeight: "bold",
		color: colors.boldColor,
		fontSize: fontSizes.normal
	}
};

export default Register;
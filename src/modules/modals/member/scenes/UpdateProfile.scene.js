"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { Text, ScrollView } from 'react-native';
import UpdateForm from '../components/UpdateForm';
import { sizes, colors, fontSizes } from '~/configs/styles';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { translate } from '~/utilities/language';
import accountService from '~/services/member/account';
import alertUtil from '~/utilities/alert';

class UpdateProfile extends React.Component {

	static displayName = "UpdateProfile";

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

		this.state = {
            source: props.authIdentity || {},
			loading: true
		};

		this._onSubmit = this._onSubmit.bind(this);
	}

	componentWillReceiveProps( nextProps ) {

		if( this.props.authIdentity != nextProps.authIdentity ) {

			const source = nextProps.authIdentity || {};
			const id = source.id || source.account_id;
			if( !id ) {

				alertUtil({
					title: translate("Lỗi"), 
					message: translate("Không tìm thấy thông tin")
				});
				return nextProps.navigation.goBack();
			}

			this.setState({
				source: nextProps.authIdentity || {}
			});

			if( id ) {

				this._loadSource( id );
			}
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			!shallowEqual( this.state, nextState ) ||
			this.props.token !== nextProps.token
		);
	}

	async _loadSource( id ) {

		if(!id) {
			
			return this.setState({
				loading: false
			});
		}

		this.setState({
			loading: true
		});
		try {
			const res = await accountService.get({id});

			this.setState({
				loading: false
			});

			if( res.status === 200 && res.data ) {

				if( res.data.STATUS !== "ERROR" ) {
					
					return this.setState({
						source: res.data.data,
						loading: false
					});
				}
			}
			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"), 
				message: res.data.message || translate("Không tìm thấy thông tin")
			});
		} catch (error) {

			alertUtil({
				title: translate("Lỗi"), 
				message: translate("Không tìm thấy thông tin")
			});
		}	

		this.setState({
			loading: false
		});	
	}
	
	async _onSubmit( data: Object = {} ) {

		!this.state.loading && this.setState({
			loading: true
		});

		const id = this.state.source.id || this.state.source.account_id;

		try {
			
			const res = await accountService.update( id, data );

			this.state.loading && this.setState({
				loading: false
			});

			if( res.status === 200 && res.data ) {

				if( res.data.STATUS !== "ERROR" ) {
					
					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"), 
						message: res.data.message || translate("Cập nhật thành công")
					});
					return this.props.navigation.goBack();
				}
			}
			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"), 
				message: res.data.message || translate("Cập nhật không thành công")
			});
		} catch (error) {
			alertUtil({
				title: translate("Lỗi"), 
				message: translate("Cập nhật không thành công")
			});
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
				directionalLockEnabled 			= { true }
			>
				<Text style={ _styles.title }>{ translate("CẬP NHẬT THÔNG TIN TÀI KHOẢN") }</Text>

                <UpdateForm 
                    onSubmit 	= { this._onSubmit } 
					loading 	= { this.state.loading }
					source 		= { this.state.source }
                />
			</ScrollView>
		)
	}

	componentDidMount() {

		const id = this.state.source.id || this.state.source.account_id;
		if( !this.props.token || !id ) {

			return this.props.navigation.goBack();
		}
		this._loadSource(id);
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		paddingTop: sizes.margin,
		paddingRight: sizes.margin,
		paddingLeft: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	title: {
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontWeight: "bold",
		color: colors.boldColor,
		fontSize: fontSizes.normal,
		marginBottom: sizes.margin
	}
};

export default UpdateProfile;
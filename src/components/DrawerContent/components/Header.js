"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CircleAvatar from '~/components/CircleAvatar';
import loginService from '~/services/member/login';
import { translate } from '~/utilities/language';
import { colors, scale, sizes, fontSizes, hitSlop } from '~/configs/styles';
import alertUtil  from '~/utilities/alert';

class Header extends React.Component {

	static displayName = "Header";

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		authIdentity: PropTypes.object
	};

	static defaultProps = {
		authIdentity: null
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.authIdentity != nextProps.authIdentity
		);
	}

	async logout() {
		
		try {
			
			const res = await loginService.logout();

			if( res.status === 200 && res.data && res.data.STATUS === "OK" ) {
				alertUtil({
					title: res.data.messageTitle || translate("Thông báo"),
					message: res.data.message || translate("Đăng xuất thành công")
				});
			}
		} catch (e) {
			
			alertUtil({
				title: translate("Lỗi"),
				message: translate("Đăng xuất không thành công")
			});
		}
	}

	render() {

		const { navigation, authIdentity } = this.props;

		const {
			avatar = null,
			account_company_name,
			account_fullname,
			account_code,
			account_contact
		} = authIdentity || {};
		return (
			<View style={ _styles.container }>
				<TouchableOpacity hitSlop={hitSlop} style={ _styles.btnLeft } onPress={ () => {

					if( !authIdentity ) {
						
						navigation.navigate("DrawerClose");
						navigation.navigate("/member/login");
						return ;
					}
					navigation.navigate("DrawerClose");
					this.logout();
				} }>
					<FAIcon name={ authIdentity ? "sign-out" : "sign-in" } style={ _styles.iconSign }/>
				</TouchableOpacity>
				<TouchableOpacity hitSlop={hitSlop} style={ _styles.btnRight } onPress={ () => navigation.navigate("DrawerClose") }>
					<FAIcon name="angle-left" style={ _styles.iconClose }/>
				</TouchableOpacity>
				<CircleAvatar 
					size        = {60}
					source 		= { Array.isArray(avatar) ?  avatar[0] : null }
					onPress 	= { authIdentity ? () => {
						
						navigation.navigate("DrawerClose");
						navigation.navigate("/member/profile");
					} : undefined }
				/>
				<Text style={ _styles.name }>{ account_fullname || account_contact || account_company_name || account_code || "" }</Text>
			</View>
		)
	}
}

const _styles = {
	container: {
		height: 90 * scale,
		backgroundColor: colors.primaryColor,
		position: "relative",
		paddingHorizontal: sizes.margin,
		paddingVertical: sizes.spacing,
		justifyContent: "center",
		alignItems: "center"
	},
	btnLeft: {
		position: "absolute",
		left: sizes.margin,
		top: sizes.spacing
	},
	btnRight: {
		position: "absolute",
		right: sizes.margin,
		top: sizes.spacing
	},
	iconSign: {
		color: "white",
		fontSize: 18 * scale
	},
	iconClose: {
		color: "white",
		fontSize: 22 * scale
	},
	avatar: {
		width: 60 * scale,
		height: 60 * scale
	},
	name: {
		color: colors.secondColor,
		fontSize: fontSizes.large,
		fontWeight: "bold",
		marginTop: sizes.spacing
	}
};

export default Header;
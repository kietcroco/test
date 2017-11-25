"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import TitleRow from './TitleRow';
import SocialButton from './SocialButton';
import { translate, setCurrentLanguage } from '~/utilities/language';
import launchURL from '~/utilities/launchURL';
import { colors, scale, sizes, fontSizes } from '~/configs/styles';
import { supportNav, instructionNav/*, fanPage, youtubeChannel, googlePlus*/ } from '~/configs/application';
import TextInput from '~/components/TextInput';
import categoryService from '~/services/news/category';
import viImage from '~/assets/images/vi.jpg';
import enImage from '~/assets/images/en.jpg';

class DrawerContent extends React.Component {

	static displayName = "DrawerContent";

	static propTypes = {
		token: PropTypes.string,
		authIdentity: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			categories: [],
		};

	}

	componentWillReceiveProps( nextProps ) {
		
		if(this.props.currentLanguage !== nextProps.currentLanguage) {

			this.buildCategory();
		}
			
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.props.currentLanguage !== nextProps.currentLanguage ||
			this.props.token !== nextProps.token ||
			this.props.authIdentity != nextProps.authIdentity ||
			this.state.categories !== nextState.categories
		);
	}

	async buildCategory() {

		
		try {
			
			const respone = await categoryService.get();
			if (respone.status === 200 && respone.data) {
				if (respone.data.STATUS === "OK" || respone.data.STATUS === "NONAUTHORITATIVE") {

					this.setState({
						categories : respone.data.data
					});
				}
			}
			
		} catch (error) {
			
		}
	}

	render() {

		const { navigation, authIdentity, token } = this.props;

		return (
			<View style={_styles.wrapper}>
				<Header
					navigation={navigation}
					authIdentity={token ? authIdentity : null}
				/>
				<ScrollView
					style={_styles.wrapper}
					horizontal={false}
					keyboardDismissMode="interactive"
					keyboardShouldPersistTaps="always"
					showsHorizontalScrollIndicator={false}
				>
					{
						token ?
							<View style={_styles.row}>
								<TitleRow iconName="address-card-o">{`${translate("Tin của bạn")}:`}</TitleRow>
								<TouchableOpacity style={_styles.btnLink} onPress={() => {

									navigation.navigate("DrawerClose");
								}}>
									<Text style={_styles.lblLink}>{translate("Tin yêu thích")}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={_styles.btnLink} onPress={() => {

									navigation.navigate("DrawerClose");
								}}>
									<Text style={_styles.lblLink}>{translate("Tin đã đăng")}</Text>
								</TouchableOpacity>
							</View>
							:
							<View style={_styles.row}>
								<TouchableOpacity onPress={() => {

									navigation.navigate("DrawerClose");
									navigation.navigate("/member/login");
								}}>
									<TitleRow iconName="sign-in">{translate("Đăng nhập")}</TitleRow>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {

									navigation.navigate("DrawerClose");
									navigation.navigate("/member/register");
								}}>
									<TitleRow iconName="users">{translate("Đăng ký")}</TitleRow>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {

									navigation.navigate("DrawerClose");
									navigation.navigate("/member/forget-password");
								}}>
									<TitleRow iconName="key">{translate("Quên mật khẩu")}</TitleRow>
								</TouchableOpacity>
							</View>
					}

					<View style={_styles.row}>
						<TitleRow iconName="address-card-o">{`${translate("Thông tin thị trường")}:`}</TitleRow>
						{
							instructionNav.map(({ label, link }) => {

								if (label) {

									return (
										<TouchableOpacity key={`news-${label}`} style={_styles.btnLink} onPress={() => {

											navigation.navigate("DrawerClose");
											!!link && launchURL(link);
										}}>
											<Text style={_styles.lblLink}>{translate(label)}</Text>
										</TouchableOpacity>
									);
								}
							})
						}
					</View>

					<View style={_styles.row}>
						<TitleRow iconName="newspaper-o">{`${translate("Tin tức")}:`}</TitleRow>
						{
							this.state.categories.map( (category, index) => {

								return (
									<TouchableOpacity key={`category-${index}`} style={_styles.btnLink} onPress={() => {
										!!category.url && launchURL(category.url);
									}}>
										<Text style={_styles.lblLink}>{category.news_category_entry_name}</Text>
									</TouchableOpacity>
								);
							} )
						}
					</View>

					<View style={_styles.row}>
						<TitleRow iconName="exclamation-circle">{`${translate("Trợ giúp & cài đặt")}:`}</TitleRow>
						{
							supportNav.map( ({ label, link }) => {
								
								if( label ) {

									return (
										<TouchableOpacity key={`news-${label}`} style={_styles.btnLink} onPress={() => {

											navigation.navigate("DrawerClose");
											!!link && launchURL(link);
										}}>
											<Text style={_styles.lblLink}>{translate(label)}</Text>
										</TouchableOpacity>
									);
								}
							} )
						}
					</View>

					<TouchableOpacity style={_styles.row} onPress={() => {
						navigation.navigate("DrawerClose");
						navigation.navigate("/member/contact");
					}}>
						<TitleRow iconName="envelope">{`${translate("Liên hệ")}`}</TitleRow>
					</TouchableOpacity>

					{
					<View style={_styles.row}>
						<TitleRow iconName="heart">{`${translate("IZIFIX fan")}:`}</TitleRow>
						<SocialButton onPress={ () => {

							navigation.navigate("DrawerClose");
							fanPage && launchURL( fanPage );
						} } iconName="facebook-square">{translate("Facebook fan")}</SocialButton>
						<SocialButton onPress={ () => {

							navigation.navigate("DrawerClose");
							googlePlus && launchURL( googlePlus );
						} } iconName="google-plus-square">{translate("Google+ fan")}</SocialButton>
						<SocialButton onPress={ () => {

							navigation.navigate("DrawerClose");
							youtubeChannel && launchURL( youtubeChannel );
						} } iconName="youtube-square">{translate("Youtube fan")}</SocialButton>
					</View>
					}

					{/*
					<View style={_styles.row}>
						<TextInput
							//ref="product_rivers_discharge_port"
							//label={translate("Nơi giao hàng")}
							placeholder={translate("Nhận tin đăng mới qua email")}
							type="input"
							style={_styles.input}
							//returnKeyType="next"
							//messageType 	= { this.state.product_rivers_discharge_port.messageType }
							//value={this.state.product_rivers_discharge_port.label}
							//onPress={mixinsDischargePort.inputOnPress.bind(this)}
							//required
						></TextInput>
					</View>
					*/}
		
				</ScrollView>
				<View style={ _styles.languageSwitchContainer }>
					<TouchableOpacity style={{
						marginRight: 10
					}} onPress={ () => {

						navigation.navigate("DrawerClose");
						setCurrentLanguage( 'vi' );
					} }>
						<Image style={ _styles.imageLang } source={ viImage }/>
					</TouchableOpacity>

					<TouchableOpacity onPress={ () => {
						navigation.navigate("DrawerClose");
						setCurrentLanguage( 'en' );
					}}>
						<Image style={ _styles.imageLang } source={ enImage }/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	componentDidMount() {

		this.buildCategory();
	}
}

const _styles = {
	wrapper: {
		flex: 1
	},
	row: {
		padding: sizes.margin,
		borderBottomWidth: sizes.borderWidth,
		borderBottomColor: colors.primaryBorderColor
	},
	btnLink: {
		paddingLeft: 25 * scale,
		paddingVertical: 1.5 * scale
	},
	lblLink: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	imageDownload: {
		width: 80 * scale,
		height: 40 * scale,
		resizeMode: "contain",
		marginLeft: 25 * scale
	},
	languageSwitchContainer: {
		borderTopWidth: sizes.borderWidth,
		justifyContent: "center",
		alignItems: "center",
		padding: 5 * scale,
		flexDirection: "row"
	},
	imageLang: {
		width: sizes.buttonNormal,
		height: sizes.buttonNormal,
		borderRadius: sizes.buttonNormal / 2,
		resizeMode: "cover"
	}
};

export default DrawerContent;
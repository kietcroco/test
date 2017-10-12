import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import TextInput from '~/components/TextInput';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import LoadingButton from '~/components/LoadingButton';
import contactService from '~/services/default/contact';
import shallowEqual from 'fbjs/lib/shallowEqual';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';
import Communications from 'react-native-communications';
import { fanPage, youtubeChannel } from '~/configs/application';

import { namespace } from '../constants';
const routeRegisterName = `${namespace}/register`;

class Contact extends React.Component {

	static displayName = "Login";

	constructor(props) {
		super(props);

		const {
			params: {
				contact_title = "",
			contact_email = "",
			contact_phone = "",
			contact_content = ""
			} = {}
		} = props.navigation.state || {};

		this.state = {
			contact_title: {
				value: contact_title,
				messageType: null,
				message: ""
			},
			contact_email: {
				value: contact_email,
				messageType: null,
				message: ""
			},
			contact_phone: {
				value: contact_phone,
				messageType: null,
				message: ""
			},
			contact_content: {
				value: contact_content,
				messageType: null,
				message: ""
			},
			contactMessage: "",
			loading: false
		};

		this._onSubmit = this._onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		// if (this.props.token !== nextProps.token && nextProps.token) {

		// 	nextProps.navigation.goBack();
		// }

		const { params } = this.props.navigation.state || {};
		const { params: nextParams } = nextProps.navigation.state || {};

		if (!shallowEqual(params, nextParams)) {


			const {
				params: {
					contact_title = "",
				contact_email = "",
				contact_phone = "",
				contact_content = ""
				} = {}
			} = nextProps.navigation.state || {};

			this.setState({
				contact_title: {
					value: contact_title,
					messageType: null,
					message: ""
				},
				contact_email: {
					value: contact_email,
					messageType: null,
					secureTextEntry: true,
					message: ""
				},
				contact_phone: {
					value: contact_phone,
					messageType: null,
					secureTextEntry: true,
					message: ""
				},
				contact_content: {
					value: contact_content,
					messageType: null,
					secureTextEntry: true,
					message: ""
				},
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.loading !== nextState.loading ||
			!shallowEqual(this.state, nextState)
		);
	}

	async _onSubmit() {

		if (!this.state.contact_email.value || !this.state.contact_phone.value || !this.state.contact_content.value) {

			return this.setState({
				contact_title: {
					...this.state.contact_title,
					messageType: null,
					message: ""
				},
				contact_email: {
					...this.state.contact_email,
					messageType: this.state.contact_email.value ? null : "error",
					message: !this.state.contact_email.value ? translate("Bạn chưa nhập email") : ""
				},
				contact_phone: {
					...this.state.contact_phone,
					messageType: this.state.contact_phone.value ? null : "error",
					message: !this.state.contact_phone.value ? translate("Bạn chưa nhập số điện thoại") : ""
				},
				contact_content: {
					...this.state.contact_content,
					messageType: this.state.contact_content.value ? null : "error",
					message: !this.state.contact_content.value ? translate("Bạn chưa nhập nội dung liên hệ") : ""
				}
			});
		}

		this.setState({
			contact_title: {
				...this.state.contact_title,
				messageType: null,
				message: ""
			},
			contact_email: {
				...this.state.contact_email,
				messageType: null,
				message: ""
			},
			contact_phone: {
				...this.state.contact_phone,
				messageType: null,
				message: ""
			},
			contact_content: {
				...this.state.contact_content,
				messageType: null,
				message: ""
			},
			contactMessage: "",
			loading: true
		});

		try {

			var data = {
				contact_title: this.state.contact_title.value,
				contact_email: this.state.contact_email.value,
				contact_phone: this.state.contact_phone.value,
				contact_content: this.state.contact_content.value
			}
			let res = await contactService.add(data);
			this.setState({
				loading: false
			});

			if (res.status === 200 && res.data) {

				if (res.data.STATUS === "OK") {

					alertUtil({
						title: res.data.messageTitle || translate("Thông báo"),
						message: res.data.message || translate("Yêu cầu đã được gửi")
					});

					return this.props.navigation.goBack();
				}
			}

			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Gửi yêu cầu không thành công")
			});
		} catch (e) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Gửi yêu cầu không thành công")
			});
		}

		this.setState({
			contact_title: {
				...this.state.contact_title.value,
			},
			contact_email: {
				...this.state.contact_email.value,
			},
			contact_phone: {
				...this.state.contact_phone.value,
			},
			contact_content: {
				...this.state.contact_content.value,
			},
			contactMessage: translate("Gửi yêu cầu không thành công"),
			loading: false
		});
	}

	render() {

		const { navigation } = this.props;
		return (
			<ScrollView
				style={_styles.wrapper}
				horizontal={false}
				keyboardDismissMode="interactive"
				keyboardShouldPersistTaps="always"
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={_styles.container}
			>
				<View style={_styles.blockTitle}>
					<Text style={[_styles.text, { fontWeight: "bold" }]}>{`${translate("CÔNG TY CỔ PHẦN IZIFIX")}`}</Text>
					<Text style={_styles.text}>{`${translate("26 Mỹ Phú 2C, Phú Mỹ Hưng, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh")}`}</Text>
					<TouchableOpacity style={_styles.contactExchanges} onPress={e => {
						Communications.phonecall(
							"(08) 5417 3768",
							true
						);
					}}>
						<Text>{`${translate("Điện thoại")}: `}</Text>
						<Text style={_styles.textContactExchanges}>{`${translate("(08) 5417 3768")}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={_styles.contactExchanges}>
						<Text>{`${translate("Fax")}: `}</Text>
						<Text style={_styles.textContactExchanges}>{`${translate("(08) 5417 1602")}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={_styles.contactExchanges} onPress={e => {

						Communications.email(
							["ops@izifix.com"],
							[],
							[],
							"Liên hệ Izifix",
							""
						);
					}}>
						<Text>{`${translate("Email")}: `}</Text>
						<Text style={_styles.textContactExchanges}>{`${translate("ops@izifix.com")}`}</Text>
					</TouchableOpacity>

				</View>

				<View style={_styles.block}>

					<TextInput
						ref="contact_title"
						label={translate("Tiêu đề")}
						placeholder="Tiêu đề"
						type="input"
						returnKeyType="next"
						maxLength={30}
						style={_styles.input}
						//autoFocus={true}
						messageType={this.state.contact_title.messageType}
						value={this.state.contact_title.value}
						placeholderTextColor={colors.placeholderColor}
						onChangeText={(value: String = "") => this.setState({
							contact_title: {
								...this.state.contact_title,
								value
							}
						})}
						onSubmitEditing={() => this.refs.contact_title.focus()}
						onEndEditing={() => {
							this.setState({
								contact_title: {
									...this.state.contact_title,
									value: this.state.contact_title.value ? this.state.contact_title.value : ""
								}
							});
						}}
						required
					>{this.state.contact_title.message}</TextInput>

					<TextInput
						ref="contact_email"
						label={translate("Email")}
						placeholder={translate("Email")}
						type="input"
						returnKeyType="next"
						maxLength={30}
						style={_styles.input}
						messageType={this.state.contact_email.messageType}
						value={this.state.contact_email.value}
						placeholderTextColor={colors.placeholderColor}
						onChangeText={(value: String = "") => this.setState({
							contact_email: {
								...this.state.contact_email,
								value
							}
						})}
						onSubmitEditing={() => this.refs.contact_email.focus()}
						onEndEditing={() => {
							this.setState({
								contact_email: {
									...this.state.contact_email,
									value: this.state.contact_email.value ? this.state.contact_email.value : ""
								}
							});
						}}
						required
					>{this.state.contact_email.message}</TextInput>

					<TextInput
						ref="contact_phone"
						label={translate("Số điện thoại")}
						placeholder={translate("Số điện thoại")}
						type="input"
						returnKeyType="next"
						maxLength={30}
						style={_styles.input}
						messageType={this.state.contact_phone.messageType}
						value={this.state.contact_phone.value}
						placeholderTextColor={colors.placeholderColor}
						onChangeText={(value: String = "") => this.setState({
							contact_phone: {
								...this.state.contact_phone,
								value
							}
						})}
						onSubmitEditing={() => this.refs.contact_phone.focus()}
						onEndEditing={() => {
							this.setState({
								contact_phone: {
									...this.state.contact_phone,
									value: this.state.contact_phone.value ? this.state.contact_phone.value : ""
								}
							});
						}}
						required
					>{this.state.contact_phone.message}</TextInput>


					<TextInput
						ref="contact_content"
						label={translate("Nội dung")}
						placeholder={translate("Nội dung")}
						type="textarea"
						returnKeyType="next"
						maxLength={30}
						style={_styles.input}
						messageType={this.state.contact_content.messageType}
						value={this.state.contact_content.value}
						placeholderTextColor={colors.placeholderColor}
						onChangeText={(value: String = "") => this.setState({
							contact_content: {
								...this.state.contact_content,
								value
							}
						})}
						onSubmitEditing={() => this.refs.contact_content.focus()}
						onEndEditing={() => {
							this.setState({
								contact_phone: {
									...this.state.contact_content,
									value: this.state.contact_content.value ? this.state.contact_content.value : ""
								}
							});
						}}
						required
					>{this.state.contact_content.message}</TextInput>

					{
						!!this.state.contactMessage &&
						<Text style={_styles.serverMessage}>{this.state.contactMessage}</Text>
					}
					<LoadingButton
						loading={this.state.loading}
						onPress={this._onSubmit}
					>{translate("Gửi")}</LoadingButton>
				</View>

				<View style={_styles.blockTitle}>
					<TouchableOpacity style={_styles.contactExchanges} onPress={e => {

						Communications.phonecall(
							"0934 666 878",
							true
						);
					}}>
						<Text style={_styles.text}>{`${translate("Đường bộ")}: `}</Text>
						<Text style={[_styles.textContactExchanges, { fontWeight: "bold" }]}>{`${translate("Mr Huy - 0934 666 878")}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={_styles.contactExchanges} onPress={e => {

						Communications.phonecall(
							"0962 854 758",
							true
						);
					}}>
						<Text style={_styles.text}>{`${translate("Đường sông")}: `}</Text>
						<Text style={[_styles.textContactExchanges, { fontWeight: "bold" }]}>{`${translate("Mr Tùng - 0962 854 758")}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={_styles.contactExchanges} onPress={e => {

						Communications.phonecall(
							"0982 054 818",
							true
						);
					}}>
						<Text style={_styles.text}>{`${translate("Đường biển")}: `}</Text>
						<Text style={[_styles.textContactExchanges, { fontWeight: "bold" }]}>{`${translate("Mr Chính - 0982 054 818")}`}</Text>
					</TouchableOpacity>
				</View>

				<View style={[_styles.blockTitle, { flexDirection: 'row' }]}>

					<TouchableOpacity style={_styles.socialBtn} onPress={() => fanPage && Communications.web( fanPage )}>
						<FAIcon name={'facebook-square'} style={{ fontSize: 70 * scale, color: "#244e9a" }} />
					</TouchableOpacity>
					<TouchableOpacity style={_styles.socialBtn} onPress={() => youtubeChannel && Communications.web( youtubeChannel )}>
						<FAIcon name={'youtube-square'} style={{ fontSize: 70 * scale, color: "#ee1c1b" }} />
					</TouchableOpacity>

				</View>
			</ScrollView>
		);
	}

	componentDidMount() {

		//this.props.token && this.props.navigation.goBack();
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.secondColor,
	},
	container: {
		marginHorizontal: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	contactExchanges: {
		flexDirection: 'row'
	},
	textContactExchanges: {
		color: colors.primaryColor,
	},
	socialBtn: {
		marginHorizontal: sizes.spacing
	},
	block: {
		marginVertical: sizes.spacing
	},
	blockTitle: {
		marginVertical: sizes.spacing,
		backgroundColor: colors.secondBackgroundColor,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing
	},
	input: {
		marginBottom: sizes.margin
	},
	text: {
		fontSize: fontSizes.normal,
		color: colors.boldColor,

	},
	addon: {
		flex: 1,
		width: "100%",
		justifyContent: 'center',
		alignItems: "center",
		backgroundColor: colors.secondBackgroundColor
	},
	iconAddon: {
		fontSize: 16 * scale,
		color: colors.boldColor,
		backgroundColor: "transparent"
	},
	serverMessage: {
		textAlign: "center",
		marginBottom: sizes.spacing,
		color: colors.errorColor
	},
	description: {
		backgroundColor: colors.descriptionBackground,
		paddingVertical: sizes.spacing,
		paddingHorizontal: sizes.spacing,
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default Contact;
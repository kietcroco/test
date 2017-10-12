import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { translate } from '~/utilities/language';
import accountService from '~/services/member/account';
import shallowEqual from 'fbjs/lib/shallowEqual';
import alertUtil from '~/utilities/alert';
import { sizes, colors, fontSizes } from '~/configs/styles';

class Detail extends React.Component {

    static displayName = "Profile";

    constructor(props) {
        super(props);

        const {
            params: {
                account_company_name = "",
                account_code = "",
                account_email = "",
                account_company_address = "",
                account_tax_code = "",
                account_legal_paper = "",
                account_contact = "",
                account_company_introduce = ""
            } = {}
        } = this.props.navigation.state || {};

        this.state = {
            account_company_name,
            account_code,
            account_email,
            account_company_address,
            account_tax_code,
            account_legal_paper,
            account_contact,
            account_company_introduce
        };
    }

    async _onLoadSource() {
        try {
            const {
				params: {
					id
				} = {}
			} = this.props.navigation.state || {};
            const res = await accountService.get({ id });

            if (res.status === 200) {

                if (res.data.STATUS === "OK") {

                    const {
                        account_company_name = "",
                        account_code = "",
                        account_email = "",
                        account_company_address = "",
                        account_tax_code = "",
                        account_legal_paper = "",
                        account_contact = "",
                        account_company_introduce = ""
                    } = res.data.data || {};

                    return this.setState({
                        account_company_name,
                        account_code,
                        account_email,
                        account_company_address,
                        account_tax_code,
                        account_legal_paper,
                        account_contact,
                        account_company_introduce
                    });
                }
            }

            return alertUtil({
                title: res.data.messageTitle || translate("Lỗi"),
                message: res.data.message || translate("Không tìm thấy thông tin"),
                actions: [
                    {
                        text: 'OK', 
                        onPress: () => this.props.navigation.goBack(), 
                        style: 'cancel'
                    }
                ]
            });

        } catch (e) {

            alertUtil({
                title: translate("Lỗi"),
                message: translate("Không tìm thấy thông tin"),
                actions: [
                    {
                        text: 'OK', 
                        onPress: () => this.props.navigation.goBack(), 
                        style: 'cancel'
                    }
                ]
            });
        }

    }

    render() {

        const { navigation } = this.props;

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

                <Text style={[_styles.headerTitle]}>
                    {translate("THÔNG TIN TÀI KHOẢN")}
                </Text>

                {!!this.state.account_company_name &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Tên công ty")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_company_name}</Text>
                    </View>
                }

                {!!this.state.account_code &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Mã khách hàng")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_code}</Text>
                    </View>
                }

                {!!this.state.account_email &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Email")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_email}</Text>
                    </View>
                }

                {!!this.state.account_company_address &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Địa chỉ công ty")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_company_address}</Text>
                    </View>
                }

                {!!this.state.account_tax_code &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Mã số thuế")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_tax_code}</Text>
                    </View>
                }

                {!!this.state.account_legal_paper &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Giấy phép kinh doanh")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_legal_paper}</Text>
                    </View>
                }

                {!!this.state.account_contact &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Người phụ trách")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_contact}</Text>
                    </View>
                }

                {!!this.state.account_company_introduce &&
                    <View style={_styles.row}>
                        <Text style={[_styles.title]}>{translate("Giới thiệu về công ty")}</Text>
                        <Text style={[_styles.content]}>{this.state.account_company_introduce}</Text>
                    </View>
                }

                {
                    <View style={_styles.row}>

                    </View>
                }
            </ScrollView>
        );
    }

    componentDidMount() {

        this._onLoadSource();
    }

}

const _styles = {
    wrapper: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
	},
	container: {
		paddingHorizontal: sizes.margin,
		paddingTop: sizes.margin
	},
    headerTitle: {
        fontSize: fontSizes.large,
        color: colors.boldColor,
        fontWeight: 'bold',
        textAlign: "left",
        textAlignVertical: "center",
        backgroundColor: colors.secondBackgroundColor,
        marginVertical: sizes.margin + sizes.margin,
        height: fontSizes.large * 3,
        padding: sizes.padding,
        marginHorizontal: sizes.margin,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: sizes.margin,
        paddingTop: sizes.spacing
    },

    title: {
        flex: 4,
        fontSize: fontSizes.normal,
        color: colors.boldColor,
        fontWeight: 'bold'
    },

    content: {
        flex: 7,
        fontSize: fontSizes.normal,
        color: colors.boldColor
    }


};

export default Detail;
import duplicatorService from '~/services/member/duplicator';
import { translate } from '~/utilities/language';

export default async function onEndEditing() {

	if( this.state.account_mobile.value ) {

		if( this.state.account_mobile.value.length < 10 ) {

			return this.setState({
				account_mobile: {
					...this.state.account_mobile,
					messageType: "error",
					message: translate("Số điện thoại không hợp lệ"),
					isDuplicate: false
				}
			});
		}

		this.setState({
			account_mobile: {
				...this.state.account_mobile,
				messageType: "loading",
				message: "",
				isDuplicate: false,
				suggestion: []
			}
		});
		const res = await duplicatorService.checkMobile( this.state.account_mobile.value );
		
		if( res.status === 200 && res.data ) {

			if( res.data.STATUS === "OK" ) {

				return this.setState({
					account_mobile: {
						...this.state.account_mobile,
						messageType: "success",
						message: "",
						isDuplicate: false
					}
				});
			}

			if( res.data.STATUS === "ERROR" ) {

				return this.setState({
					account_mobile: {
						...this.state.account_mobile,
						messageType: "error",
						message: res.data.message || "",
						isDuplicate: true
					}
				});
			}
		}
	}
};
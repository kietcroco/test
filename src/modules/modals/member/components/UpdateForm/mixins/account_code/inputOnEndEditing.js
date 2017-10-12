import duplicatorService from '~/services/member/duplicator';
import { translate } from '~/utilities/language';

export default async function onEndEditing() {

	if( this.state.account_code.value ) {

		const value = this.state.account_code.value.toUpperCase();

		if( this.state.account_code.value.length < 3 ) {

			return this.setState({
				account_code: {
					...this.state.account_code,
					messageType: "error",
					message: translate("Username từ 3 - 5 ký tự"),
					isDuplicate: false,
					suggestion: [],
					value
				}
			});
		}

		this.setState({
			account_code: {
				...this.state.account_code,
				messageType: "loading",
				message: "",
				isDuplicate: false,
				suggestion: [],
				value
			}
		});
		const res = await duplicatorService.checkAccountCode( this.state.account_code.value );
		
		if( res.status === 200 && res.data ) {

			if( res.data.STATUS === "OK" ) {

				return this.setState({
					account_code: {
						...this.state.account_code,
						messageType: "success",
						message: "",
						isDuplicate: false,
						suggestion: [],
						value
					}
				});
			}

			if( res.data.STATUS === "ERROR" ) {

				return this.setState({
					account_code: {
						...this.state.account_code,
						messageType: "error",
						message: res.data.message || "",
						isDuplicate: true,
						suggestion: res.data.suggestion,
						value
					}
				});
			}
		}
	}
};
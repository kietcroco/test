import duplicatorService from '~/services/member/duplicator';
import { translate } from '~/utilities/language';
import isEmail from '~/utilities/isEmail';

export default async function onEndEditing() {

	if( this.state.account_email.value ) {

		if( !isEmail( this.state.account_email.value ) ) {

			return this.setState({
				account_email: {
					...this.state.account_email,
					messageType: "error",
					message: translate("Email không hợp lệ"),
					isDuplicate: false
				}
			});
		}

		this.setState({
			account_email: {
				...this.state.account_email,
				messageType: "loading",
				message: "",
				isDuplicate: false
			}
		});

		const res = await duplicatorService.checkEmail( this.state.account_email.value );
		
		if( res.status === 200 && res.data ) {

			if( res.data.STATUS === "OK" ) {

				return this.setState({
					account_email: {
						...this.state.account_email,
						messageType: "success",
						message: "",
						isDuplicate: false
					}
				});
			}

			if( res.data.STATUS === "ERROR" ) {

				return this.setState({
					account_email: {
						...this.state.account_email,
						messageType: "error",
						message: res.data.message || "",
						isDuplicate: true
					}
				});
			}
		}
	}
};
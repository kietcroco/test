import duplicatorService from '~/services/member/duplicator';
import { translate } from '~/utilities/language';

export default async function onEndEditing() {

	if( this.state.account_tax_code.value ) {

		if( this.state.account_tax_code.value.length < 10 ) {

			return this.setState({
				account_tax_code: {
					...this.state.account_tax_code,
					messageType: "error",
					message: translate("Mã số thuế phải đủ 10 số"),
					isDuplicate: false
				}
			});
		}

		this.setState({
			account_tax_code: {
				...this.state.account_tax_code,
				messageType: "loading",
				message: "",
				isDuplicate: false
			}
		});
		const res = await duplicatorService.checkTaxCode( this.state.account_tax_code.value );
		
		if( res.status === 200 && res.data ) {

			if( res.data.STATUS === "OK" ) {

				return this.setState({
					account_tax_code: {
						...this.state.account_tax_code,
						messageType: "success",
						message: "",
						isDuplicate: false
					}
				});
			}

			if( res.data.STATUS === "ERROR" ) {

				return this.setState({
					account_tax_code: {
						...this.state.account_tax_code,
						messageType: "error",
						message: res.data.message || "",
						isDuplicate: true
					}
				});
			}
		}
	}
};
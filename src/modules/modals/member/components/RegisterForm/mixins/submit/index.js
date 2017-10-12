export default function submit() {

	if( this.state.agreement === null ){
		
		return this.setState({
			agreement: false
		});
	}

	if( this.state.agreement ) {

		const data = {};

		// tên công ty
		data["account_company_name"] = this.state.account_company_name.value || "";

		// user
		data["account_code"] = this.state.account_code.value || "";
		
		// password
		data["account_password"] = this.state.account_password.value || "";

		// số điện thoại
		data["account_mobile"] = this.state.account_mobile.value || "";

		// email
		data["account_email"] = this.state.account_email.value || "";

		// địa chỉ công ty
		data["account_company_address"] = this.state.account_company_address || "";

		// mã số thuế
		data["account_tax_code"] = this.state.account_tax_code.value || "";

		// người liên hệ
		data["account_contact"] = this.state.account_contact || "";

		// ghi chú
		data["account_company_introduce"] = this.state.account_company_introduce || "";

		// hình giấy phép kinh doanh
		data["account_legal_paper"] = this.state.account_legal_paper || "";

		// hình ghi chú
		data["account_images"] = [];

		if( this.state.account_images.length ) {

			this.state.account_images.forEach( ( {source = null, info = {}} ) => {

				if( source ){

					if( typeof source === "object" && source["uri"] ) {

						source = (source["uri"].split('base64,', 2))[1];

						return data["account_images"].push({
							...info,
							content: source
						});
					}

					data["account_images"].push(source);
				}
			} );
		}

		this.props.onSubmit && this.props.onSubmit( data );
	}
};
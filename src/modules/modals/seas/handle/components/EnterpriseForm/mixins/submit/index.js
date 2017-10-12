import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Tên công ty ## */
	data["account_company_name"] = this.state.account_company_name.value || "";

	/* tên viết tắt ## */
	data["account_company_name_acronym"] = this.state.account_company_name_acronym.value || "";

	/** ngành nghề chính */
	let enterprise_seas_career = null;
	if( this.state.enterprise_seas_career.value ) {

		enterprise_seas_career = this.state.enterprise_seas_career.value.map( item => item.value ).join(";");
	}
	data["enterprise_seas_career"] = enterprise_seas_career;

	/** số phương tiện */
	data["enterprise_seas_vehicle_counter"] = this.state.enterprise_seas_vehicle_counter.value || 0;

	/** Địa chỉ công ty */
	data["account_company_address"] = this.state.account_company_address.value || "";

	/** số điện thoại cố định */
	data["account_phone"] = this.state.account_phone.value || "";

	/** số điện thoại di động */
	data["account_mobile"] = this.state.account_mobile.value || "";

	/** email */
	data["account_email"] = this.state.account_email.value || "";

	/** website */
	data["account_website"] = this.state.account_website.value || "";

	/** mã số thuế */
	data["account_tax_code"] = this.state.account_tax_code.value || "";

	/** giới thiệu */
	data["account_company_introduce"] = this.state.account_company_introduce || "";

	/** logo */
	data["account_company_logo"] = this.state.account_company_logo.source;
	if (this.state.account_company_logo.source && typeof this.state.account_company_logo.source === "object" && this.state.account_company_logo.source["uri"]) {

		let avatarSource = this.state.account_company_logo.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["account_company_logo"] = {
			...this.state.account_company_logo.info,
			content: avatarSource
		};
	}

	/** ## Ảnh ## */
	data["account_images"] = [];

	if (this.state.account_images_information.length) {

		this.state.account_images_information.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["account_images"].push({
						...info,
						content: source
					});
				}

				data["account_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
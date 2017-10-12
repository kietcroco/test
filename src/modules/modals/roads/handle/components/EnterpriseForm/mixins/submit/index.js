import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Tên công ty ## */
	data["account_company_name"] = this.state.account_company_name.value || "";

	/** ## Loại p.tiện ## */
	let enterprise_roads_career = null;
	if( this.state.enterprise_roads_career.value ) {

		enterprise_roads_career = this.state.enterprise_roads_career.value.map( item => item.value ).join(";");
	}
	data["enterprise_roads_career"] = enterprise_roads_career;

	/** ## Tên công ty ## */
	data["account_company_name_acronym"] = this.state.account_company_name_acronym.value || "";

	/** ## Tên công ty ## */
	data["enterprise_roads_vehicle_counter"] = this.state.enterprise_roads_vehicle_counter.value || 0;

	/** ## Tên công ty ## */
	data["account_company_address"] = this.state.account_company_address.value || "";

	/** ## Tên công ty ## */
	data["account_phone"] = this.state.account_phone.value || "";

	/** ## Tên công ty ## */
	data["account_mobile"] = this.state.account_mobile.value || "";

	/** ## Tên công ty ## */
	data["account_email"] = this.state.account_email.value || "";

	/** ## Tên công ty ## */
	data["account_website"] = this.state.account_website.value || "";

	/** ## Tên công ty ## */
	data["account_tax_code"] = this.state.account_tax_code.value || "";

	/** ## Tên công ty ## */
	data["account_company_introduce"] = this.state.account_company_introduce || "";

	/** ## Avatar ## */
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
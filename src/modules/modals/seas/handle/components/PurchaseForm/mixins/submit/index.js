import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Avatar ## */
	data["purchase_seas_avatar"] = this.state.purchase_seas_avatar.source;
	if (this.state.purchase_seas_avatar.source && typeof this.state.purchase_seas_avatar.source === "object" && this.state.purchase_seas_avatar.source["uri"]) {

		let avatarSource = this.state.purchase_seas_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["purchase_seas_avatar"] = {
			...this.state.purchase_seas_avatar.info,
			content: avatarSource
		};
	} 

	/** ## Mua/bán ## */
	data['purchase_seas_type'] = this.state.purchase_seas_type ? this.state.purchase_seas_type : "SELL";

	/** ## Loại phương tiện ## */
	data['purchase_seas_vehicle_type'] = this.state.purchase_seas_vehicle_type.value[0] ? this.state.purchase_seas_vehicle_type.value[0].value : null;

	/** ## Tải trọng ## */
	data['purchase_seas_dwt'] = this.state.purchase_seas_dwt.value ? escapeNumberFormat(this.state.purchase_seas_dwt.value) : null;

	/** ## Năm đóng ## */
	data['purchase_seas_year_built'] = this.state.purchase_seas_year_built.value[0] ? this.state.purchase_seas_year_built.value[0].value : null;

	/** ## Nơi đóng ## */
	data['purchase_seas_country_built'] = this.state.purchase_seas_country_built.value[0] ? this.state.purchase_seas_country_built.value[0].value : null;

	/** ## Nơi xem ## */
	data['purchase_seas_place_inspect'] = this.state.purchase_seas_place_inspect.value[0] ? this.state.purchase_seas_place_inspect.value[0] : null;

	/** ## Giá đề xuất ## */
	data['purchase_seas_idea_price'] = this.state.purchase_seas_idea_price.value ? escapeNumberFormat(this.state.purchase_seas_idea_price.value) : "0";

	// đơn vị tính giá
	data["purchase_seas_idea_price_currency"] = this.state.purchase_seas_idea_price_currency.value || "usd";

	/** ## công suất ## */
	data['purchase_seas_total_me_power'] = this.state.purchase_seas_total_me_power.value ? escapeNumberFormat(this.state.purchase_seas_total_me_power.value) : null;

	// đơn vị công suất
	data["purchase_seas_total_me_power_unit"] = this.state.purchase_seas_total_me_power_unit.value || "bhp";

	/** ## loại máy ## */
	data['purchase_seas_main_engine_maker'] = this.state.purchase_seas_main_engine_maker.value[0] ? this.state.purchase_seas_main_engine_maker.value[0].value : null;

	/** ## Phone ## */
	data['purchase_seas_contact_phone'] = this.state.purchase_seas_contact_phone.value || this.state.purchase_seas_contact_sms.value || null;

	/** ## Phone ## */
	data['purchase_seas_contact_sms'] = this.state.purchase_seas_contact_sms.value || this.state.purchase_seas_contact_sms.value || null;

	/** ## Email ## */
	data['purchase_seas_contact_email'] = this.state.purchase_seas_contact_email.value || null;

	/** ## skype ## */
	data['purchase_seas_skype'] = this.state.purchase_seas_contact_skype.value || null;

	/** ## Hình thức liện hệ ## */
	data["purchase_seas_contact_by"] = null;
	if (this.state.purchase_seas_contact_sms.checked && this.state.purchase_seas_contact_phone.checked) {

		data["purchase_seas_contact_by"] = 0;
	} else if (this.state.purchase_seas_contact_sms.checked) {

		data["purchase_seas_contact_by"] = 2;
	} else if (this.state.purchase_seas_contact_phone.checked) {

		data["purchase_seas_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data['purchase_seas_information'] = this.state.purchase_seas_information || "";

	/** ## Ảnh ## */
	data["purchase_seas_images"] = [];

	if (this.state.purchase_seas_images.length) {

		this.state.purchase_seas_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["purchase_seas_images"].push({
						...info,
						content: source
					});
				}

				data["purchase_seas_images"].push(source);
			}
		});
	}
	
	this.props.onSubmit && this.props.onSubmit(data);
};
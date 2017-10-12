import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Avatar ## */
	data["purchase_rivers_avatar"] = this.state.purchase_rivers_avatar.source;
	if (this.state.purchase_rivers_avatar.source && typeof this.state.purchase_rivers_avatar.source === "object" && this.state.purchase_rivers_avatar.source["uri"]) {

		let avatarSource = this.state.purchase_rivers_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["purchase_rivers_avatar"] = {
			...this.state.purchase_rivers_avatar.info,
			content: avatarSource
		};
	}

	/** ## Mua/bán ## */
	data['purchase_rivers_type'] = this.state.purchase_rivers_type || "SELL";

	/** ## Loại phương tiện ## */
	data['purchase_rivers_vehicle_type'] = this.state.purchase_rivers_vehicle_type.value[0] ? this.state.purchase_rivers_vehicle_type.value[0].value : null;

	/** ## Tải trọng ## */
	data['purchase_rivers_tonnage'] = this.state.purchase_rivers_tonnage.value ? escapeNumberFormat(this.state.purchase_rivers_tonnage.value) : null;

	/** ## Năm đóng ## */
	data['purchase_rivers_year_built'] = this.state.purchase_rivers_year_built.value[0] ? this.state.purchase_rivers_year_built.value[0].value : null;

	/** ## Nơi xem ## */
	data['purchase_rivers_place_delivery'] = this.state.purchase_rivers_place_delivery.value[0] || {};

	/** ## Giá đề xuất ## */
	data['purchase_rivers_price'] = this.state.purchase_rivers_price.value ? escapeNumberFormat(this.state.purchase_rivers_price.value) : "0";

	/** ## Phone ## */
	data['purchase_rivers_contact_phone'] = this.state.purchase_rivers_contact_phone.value || this.state.purchase_rivers_contact_sms.value || null;

	/** ## Phone ## */
	data['purchase_rivers_contact_sms'] = this.state.purchase_rivers_contact_sms.value || this.state.purchase_rivers_contact_phone.value || null;

	/** ## Email ## */
	data['purchase_rivers_contact_email'] = this.state.purchase_rivers_contact_email.value || null;

	/** ## Hình thức liện hệ ## */
	data["purchase_rivers_contact_by"] = null;
	if (this.state.purchase_rivers_contact_sms.checked && this.state.purchase_rivers_contact_phone.checked) {

		data["purchase_rivers_contact_by"] = 0;
	} else if (this.state.purchase_rivers_contact_sms.checked) {

		data["purchase_rivers_contact_by"] = 2;
	} else if (this.state.purchase_rivers_contact_phone.checked) {

		data["purchase_rivers_contact_by"] = 1;
	}

	/** ## Nơi đóng ## */
	data['purchase_rivers_place_built']  = this.state.purchase_rivers_place_built.value[0] || {};

	/** ## Kích thước ## */
	data['purchase_rivers_size_tunnel'] = this.state.purchase_rivers_size_tunnel || "";

	/** ## Ghi chú ## */
	data['purchase_rivers_information'] = this.state.purchase_rivers_information || "";

	/** ## Ảnh ## */
	data["purchase_rivers_images"] = [];

	if (this.state.purchase_rivers_images.length) {

		this.state.purchase_rivers_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["purchase_rivers_images"].push({
						...info,
						content: source
					});
				}

				data["purchase_rivers_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
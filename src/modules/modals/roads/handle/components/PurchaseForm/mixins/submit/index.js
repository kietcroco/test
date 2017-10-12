import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Avatar ## */
	data["purchase_roads_avatar"] = this.state.purchase_roads_avatar.source;
	if (this.state.purchase_roads_avatar.source && typeof this.state.purchase_roads_avatar.source === "object" && this.state.purchase_roads_avatar.source["uri"]) {

		let avatarSource = this.state.purchase_roads_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["purchase_roads_avatar"] = {
			...this.state.purchase_roads_avatar.info,
			content: avatarSource
		};
	}

	/** ## Mua/bán ## */
	data['purchase_roads_type'] = this.state.purchase_roads_type ? this.state.purchase_roads_type : null;

	/** ## Loại phương tiện ## */
	data['purchase_roads_vehicle_type'] = this.state.purchase_roads_vehicle_type.value[0] ? this.state.purchase_roads_vehicle_type.value[0].value : null;

	/** ## Tải trọng ## */
	data['purchase_roads_tonnage'] = this.state.purchase_roads_tonnage.value ? escapeNumberFormat(this.state.purchase_roads_tonnage.value) : null;

	/** ## Năm đóng ## */
	data['purchase_roads_year_built'] = this.state.purchase_roads_year_built.value && this.state.purchase_roads_year_built.value[0] && this.state.purchase_roads_year_built.value[0].value || null;

	/** ## Hãng sản xuất ## */
	data['purchase_roads_trademark'] = this.state.purchase_roads_trademark.value[0] ? this.state.purchase_roads_trademark.value[0].value : null;

	/** ## Nước sản xuất ## */
	data['purchase_roads_country_built'] = this.state.purchase_roads_country_built.value[0] ? this.state.purchase_roads_country_built.value[0].value : null;

	/** ## Nơi xem ## */
	data['purchase_roads_place_delivery'] = this.state.purchase_roads_place_delivery.value[0] ? this.state.purchase_roads_place_delivery.value[0] : {};

	/** ## Giá đề xuất ## */
	data['purchase_roads_price'] = this.state.purchase_roads_price.value ? escapeNumberFormat(this.state.purchase_roads_price.value) : "0";

	/** ## Phone ## */
	data['purchase_roads_contact_phone'] = this.state.purchase_roads_contact_phone.value || this.state.purchase_roads_contact_sms.value || null;

	/** ## Phone ## */
	data['purchase_roads_contact_sms'] = this.state.purchase_roads_contact_sms.value || this.state.purchase_roads_contact_phone.value || null;

	/** ## Email ## */
	data['purchase_roads_contact_email'] = this.state.purchase_roads_contact_email.value || null;

	/** ## Hình thức liện hệ ## */
	data["purchase_roads_contact_by"] = null;
	if (this.state.purchase_roads_contact_sms.checked && this.state.purchase_roads_contact_phone.checked) {

		data["purchase_roads_contact_by"] = 0;
	} else if (this.state.purchase_roads_contact_sms.checked) {

		data["purchase_roads_contact_by"] = 2;
	} else if (this.state.purchase_roads_contact_phone.checked) {

		data["purchase_roads_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data['purchase_roads_information'] = this.state.purchase_roads_information || "";

	/** ## Ảnh ## */
	data["purchase_roads_images"] = [];

	if (this.state.purchase_roads_images.length) {

		this.state.purchase_roads_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["purchase_roads_images"].push({
						...info,
						content: source
					});
				}

				data["purchase_roads_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
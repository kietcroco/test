import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Loại p.tiện ## */
	data["vehicle_rivers_type"] = this.state.vehicle_rivers_type.value[0] ? this.state.vehicle_rivers_type.value[0].value : null;

	/** ## Mã phương tiện ## */
	data["vehicle_rivers_code"] = this.state.vehicle_rivers_code.value ? this.state.vehicle_rivers_code.value : null;

	/** ## Trọng tải ## */
	data["vehicle_rivers_tonnage"] = this.state.vehicle_rivers_tonnage.value ? escapeNumberFormat(this.state.vehicle_rivers_tonnage.value) : null;

	/** ## Nơi xuất phát ## */
	data["vehicle_open_rivers_open_place"] = this.state.vehicle_open_rivers_open_place.value[0] || {};

	/** ## Thời gian xếp hàng sớm nhất ## */
	data["vehicle_open_rivers_open_time"] = this.state.vehicle_open_rivers_open_time.label || null;

	/** ## Nơi gian hàng ## */
	data["vehicle_open_rivers_want_discharge_place"] = this.state.vehicle_open_rivers_want_discharge_place.value[0] || {};

	/** ## Liên hệ bằng điện thoại ## */
	data["vehicle_open_rivers_contact_phone"] = this.state.vehicle_open_rivers_contact_phone.value || this.state.vehicle_open_rivers_contact_sms.value || null;

	/** ## Liên hệ bằng Sms ## */
	data["vehicle_open_rivers_contact_sms"] = this.state.vehicle_open_rivers_contact_sms.value || this.state.vehicle_open_rivers_contact_phone.value || null;

	/** ## Liên hệ Email ## */
	data["vehicle_open_rivers_contact_email"] = this.state.vehicle_open_rivers_contact_email.value || null;

	/** ## Hình thức liện hệ ## */
	data["vehicle_open_rivers_contact_by"] = null;
	if (this.state.vehicle_open_rivers_contact_sms.checked && this.state.vehicle_open_rivers_contact_phone.checked) {

		data["vehicle_open_rivers_contact_by"] = 0;
	} else if (this.state.vehicle_open_rivers_contact_sms.checked) {

		data["vehicle_open_rivers_contact_by"] = 2;
	} else if (this.state.vehicle_open_rivers_contact_phone.checked) {

		data["vehicle_open_rivers_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data["vehicle_open_rivers_information"] = this.state.vehicle_open_rivers_information || "";

	/** loại hàng muốn chở */
	data["vehicle_open_rivers_want_transport_cargo"] = this.state.vehicle_open_rivers_want_transport_cargo || "";

	/** ## Avatar ## */
	data["vehicle_open_rivers_avatar"] = this.state.vehicle_open_rivers_avatar.source;
	if (this.state.vehicle_open_rivers_avatar.source && typeof this.state.vehicle_open_rivers_avatar.source === "object" && this.state.vehicle_open_rivers_avatar.source["uri"]) {

		let avatarSource = this.state.vehicle_open_rivers_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["vehicle_open_rivers_avatar"] = {
			...this.state.vehicle_open_rivers_avatar.info,
			content: avatarSource
		};
	}
	

	/** ## Ảnh ## */
	data["vehicle_open_rivers_images"] = [];

	if (this.state.vehicle_open_rivers_images.length) {

		this.state.vehicle_open_rivers_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["vehicle_open_rivers_images"].push({
						...info,
						content: source
					});
				}

				data["vehicle_open_rivers_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
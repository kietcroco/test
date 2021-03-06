import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Loại p.tiện ## */
	data["vehicle_roads_type"] = this.state.vehicle_roads_type.value[0] ? this.state.vehicle_roads_type.value[0].value : null;

	/** ## Mã phương tiện ## */
	data["vehicle_roads_code"] = this.state.vehicle_roads_code.value ? this.state.vehicle_roads_code.value : null;

	/** ## Trọng tải ## */
	data["vehicle_roads_tonnage"] = this.state.vehicle_roads_tonnage.value ? escapeNumberFormat(this.state.vehicle_roads_tonnage.value) : null;

	/** ## Nơi xuất phát ## */
	data["vehicle_open_roads_open_place"] = this.state.vehicle_open_roads_open_place.value[0] || {};

	/** ## giao hằng ## */
	data["vehicle_open_roads_open_time_daily"] = this.state.vehicle_open_roads_open_time_daily.value || 0;

	/** ## Thời gian xếp hàng sớm nhất ## */
	data["vehicle_open_roads_open_time"] = this.state.vehicle_open_roads_open_time.label || null;

	/** ## Liên hệ bằng điện thoại ## */
	data["vehicle_open_roads_contact_phone"] = this.state.vehicle_open_roads_contact_phone.value || this.state.vehicle_open_roads_contact_sms.value || null;

	/** ## Liên hệ bằng Sms ## */
	data["vehicle_open_roads_contact_sms"] = this.state.vehicle_open_roads_contact_sms.value || this.state.vehicle_open_roads_contact_phone.value || null;

	/** ## Liên hệ Email ## */
	data["vehicle_open_roads_contact_email"] = this.state.vehicle_open_roads_contact_email.value || null;

	/** ## Hình thức liện hệ ## */
	data["vehicle_open_roads_contact_by"] = null;
	if (this.state.vehicle_open_roads_contact_sms.checked && this.state.vehicle_open_roads_contact_phone.checked) {

		data["vehicle_open_roads_contact_by"] = 0;
	} else if (this.state.vehicle_open_roads_contact_sms.checked) {

		data["vehicle_open_roads_contact_by"] = 2;
	} else if (this.state.vehicle_open_roads_contact_phone.checked) {

		data["vehicle_open_roads_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data["vehicle_open_roads_information"] = this.state.vehicle_open_roads_information || "";

	/** ## Avatar ## */
	data["vehicle_open_roads_avatar"] = this.state.vehicle_open_roads_avatar.source;
	if (this.state.vehicle_open_roads_avatar.source && typeof this.state.vehicle_open_roads_avatar.source === "object" && this.state.vehicle_open_roads_avatar.source["uri"]) {

		let avatarSource = this.state.vehicle_open_roads_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["vehicle_open_roads_avatar"] = {
			...this.state.vehicle_open_roads_avatar.info,
			content: avatarSource
		};
	}
	

	/** ## Ảnh ## */
	data["vehicle_open_roads_images"] = [];

	if (this.state.vehicle_open_roads_images.length) {

		this.state.vehicle_open_roads_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["vehicle_open_roads_images"].push({
						...info,
						content: source
					});
				}

				data["vehicle_open_roads_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
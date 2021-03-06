import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** loại tàu */
	data["vehicle_hollow_seas_vsl_type"] = this.state.vehicle_hollow_seas_vsl_type.value[0] ? this.state.vehicle_hollow_seas_vsl_type.value[0].value : null;

	/** tên tàu */
	data["vehicle_hollow_seas_vsl_name"] = this.state.vehicle_hollow_seas_vsl_name.value ? this.state.vehicle_hollow_seas_vsl_name.value : null;

	/** dwt */
	data["vehicle_hollow_seas_dwt"] = this.state.vehicle_hollow_seas_dwt.value ? escapeNumberFormat(this.state.vehicle_hollow_seas_dwt.value) : null;

	/** nơi xuất phát */
	data["vehicle_hollow_seas_open_place"] = this.state.vehicle_hollow_seas_open_place.value[0] || {};

	/** thời gian xuất phát */
	data["vehicle_hollow_seas_open_time"] = this.state.vehicle_hollow_seas_open_time.label || null;

	/** nơi xuất phát */
	data["vehicle_hollow_seas_want_discharge_place"] = this.state.vehicle_hollow_seas_want_discharge_place.value[0] || {};

	/** ## đăng kiểm ## */
	data["vehicle_hollow_seas_class"] = this.state.vehicle_hollow_seas_class.value[0] ? this.state.vehicle_hollow_seas_class.value[0].value : null;

	/** ## Quản lý tàu ## */
	data["vehicle_hollow_seas_operator"] = this.state.vehicle_hollow_seas_operator.value || null;

	/** ## Liên hệ bằng điện thoại ## */
	data["vehicle_hollow_seas_contact_phone"] = this.state.vehicle_hollow_seas_contact_phone.value || this.state.vehicle_hollow_seas_contact_sms.value || null;

	/** ## Liên hệ bằng Sms ## */
	data["vehicle_hollow_seas_contact_sms"] = this.state.vehicle_hollow_seas_contact_sms.value || this.state.vehicle_hollow_seas_contact_phone.value || null;

	/** ## Liên hệ Email ## */
	data["vehicle_hollow_seas_contact_email"] = this.state.vehicle_hollow_seas_contact_email.value || null;

	/** ## Liên hệ skype ## */
	data["vehicle_hollow_seas_skype"] = this.state.vehicle_hollow_seas_contact_skype.value || null;

	/** ## Hình thức liện hệ ## */
	data["vehicle_hollow_seas_contact_by"] = null;
	if (this.state.vehicle_hollow_seas_contact_sms.checked && this.state.vehicle_hollow_seas_contact_phone.checked) {

		data["vehicle_hollow_seas_contact_by"] = 0;
	} else if (this.state.vehicle_hollow_seas_contact_sms.checked) {

		data["vehicle_hollow_seas_contact_by"] = 2;
	} else if (this.state.vehicle_hollow_seas_contact_phone.checked) {

		data["vehicle_hollow_seas_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data["vehicle_hollow_seas_information"] = this.state.vehicle_hollow_seas_information || "";

	/** ## Avatar ## */
	data["vehicle_hollow_seas_avatar"] = this.state.vehicle_hollow_seas_avatar.source;
	if (this.state.vehicle_hollow_seas_avatar.source && typeof this.state.vehicle_hollow_seas_avatar.source === "object" && this.state.vehicle_hollow_seas_avatar.source["uri"]) {

		let avatarSource = this.state.vehicle_hollow_seas_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["vehicle_hollow_seas_avatar"] = {
			...this.state.vehicle_hollow_seas_avatar.info,
			content: avatarSource
		};
	}

	/** ## Ảnh ## */
	data["vehicle_hollow_seas_images"] = [];

	if (this.state.vehicle_hollow_seas_images.length) {

		this.state.vehicle_hollow_seas_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["vehicle_hollow_seas_images"].push({
						...info,
						content: source
					});
				}

				data["vehicle_hollow_seas_images"].push(source);
			}
		});
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
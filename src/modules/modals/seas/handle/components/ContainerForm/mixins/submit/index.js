import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	// nơi xếp
	data["container_seas_load_port"] = this.state.container_seas_load_port.value[0] || {};

	// nơi dỡ
	data["container_seas_discharge_port"] = this.state.container_seas_discharge_port.value[0] || {};

	// loại
	data["container_seas_type_name"] = this.state.container_seas_type_name.value[0] ? this.state.container_seas_type_name.value[0].value : null;

	// khối lượng
	data["container_seas_weight"] = this.state.container_seas_weight.value ? escapeNumberFormat(this.state.container_seas_weight.value) : 0;

	// giá đề xuất
	data["container_seas_freight"] = `${this.state.container_seas_freight.value}`.length ? escapeNumberFormat(this.state.container_seas_freight.value) : null;

	// ngày xếp
	data["container_seas_loading_time_earliest"] = this.state.container_seas_loading_time_earliest.label || null;

	// ngày dỡ
	data["container_seas_loading_time_latest"] = this.state.container_seas_loading_time_latest.label || null;

	// số điện thoại liên hệ
	data["container_seas_contact_phone"] = this.state.container_seas_contact_phone.value || this.state.container_seas_contact_sms.value || null;

	// số điện thoại liên hệ
	data["container_seas_contact_sms"] = this.state.container_seas_contact_sms.value || this.state.container_seas_contact_phone.value || null;

	// email liên hệ
	data["container_seas_contact_email"] = this.state.container_seas_contact_email.value || null;

	// skype liên hệ
	data["container_seas_skype"] = this.state.container_seas_contact_skype.value || null;

	// hình thức liên hệ
	data["container_seas_contact_by"] = null;
	if( this.state.container_seas_contact_sms.checked && this.state.container_seas_contact_phone.checked ) {

		data["container_seas_contact_by"] = 0;
	} else if( this.state.container_seas_contact_sms.checked ) {

		data["container_seas_contact_by"] = 2;
	} else if( this.state.container_seas_contact_phone.checked ) {

		data["container_seas_contact_by"] = 1;
	}

	// info
	data["container_seas_information"] = this.state.container_seas_information || "";

	// avatar
	data["container_seas_avatar"] = this.state.container_seas_avatar.source;
	if( this.state.container_seas_avatar.source && typeof this.state.container_seas_avatar.source === "object" && this.state.container_seas_avatar.source["uri"] ) {

		let avatarSource = this.state.container_seas_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["container_seas_avatar"] = {
			...this.state.container_seas_avatar.info,
			content: avatarSource
		};
	}

	// hình ghi chú
	data["container_seas_images"] = [];

	if( this.state.container_seas_images.length ) {

		this.state.container_seas_images.forEach( ( {source = null, info = {}} ) => {

			if( source ){

				if( typeof source === "object" && source["uri"] ) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["container_seas_images"].push({
						...info,
						content: source
					});
				}

				data["container_seas_images"].push(source);
			}
		} );
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
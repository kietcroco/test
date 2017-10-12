import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	// nơi xếp
	data["product_roads_load_port"] = this.state.product_roads_load_port.value[0] || {};

	// nơi dỡ
	data["product_roads_discharge_port"] = this.state.product_roads_discharge_port.value[0] || {};

	// loại
	data["product_roads_type_name"] = this.state.product_roads_type_name.value[0] ? this.state.product_roads_type_name.value[0].value : null;

	// khối lượng
	data["product_roads_weight"] = this.state.product_roads_weight.value ? escapeNumberFormat(this.state.product_roads_weight.value) : null;

	// đơn vị tính
	data["product_roads_weight_unit"] = this.state.product_roads_weight_unit.value[0] ? this.state.product_roads_weight_unit.value[0].value : null;

	// giá đề xuất
	data["product_roads_freight"] = `${this.state.product_roads_freight.value}`.length ? escapeNumberFormat(this.state.product_roads_freight.value) : "0";

	// ngày xếp
	data["product_roads_loading_time_earliest"] = this.state.product_roads_loading_time_earliest.label || null;

	// ngày dỡ
	data["product_roads_loading_time_latest"] = this.state.product_roads_loading_time_latest.label || null;

	// số điện thoại liên hệ
	data["product_roads_contact_phone"] = this.state.product_roads_contact_phone.value || this.state.product_roads_contact_sms.value || null;

	// số điện thoại liên hệ
	data["product_roads_contact_sms"] = this.state.product_roads_contact_sms.value || this.state.product_roads_contact_phone.value || null;

	// email liên hệ
	data["product_roads_contact_email"] = this.state.product_roads_contact_email.value || null;

	// hình thức liên hệ
	data["product_roads_contact_by"] = null;
	if( this.state.product_roads_contact_sms.checked && this.state.product_roads_contact_phone.checked ) {

		data["product_roads_contact_by"] = 0;
	} else if( this.state.product_roads_contact_sms.checked ) {

		data["product_roads_contact_by"] = 2;
	} else if( this.state.product_roads_contact_phone.checked ) {

		data["product_roads_contact_by"] = 1;
	}

	// info
	data["product_roads_information"] = this.state.product_roads_information || "";

	// avatar
	data["product_roads_avatar"] = this.state.product_roads_avatar.source;
	if( this.state.product_roads_avatar.source && typeof this.state.product_roads_avatar.source === "object" && this.state.product_roads_avatar.source["uri"] ) {

		let avatarSource = this.state.product_roads_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["product_roads_avatar"] = {
			...this.state.product_roads_avatar.info,
			content: avatarSource
		};
	}

	// hình ghi chú
	data["product_roads_images"] = [];

	if( this.state.product_roads_images.length ) {

		this.state.product_roads_images.forEach( ( {source = null, info = {}} ) => {

			if( source ){

				if( typeof source === "object" && source["uri"] ) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["product_roads_images"].push({
						...info,
						content: source
					});
				}

				data["product_roads_images"].push(source);
			}
		} );
	}

	return this.props.onSubmit && this.props.onSubmit(data);
};
import escapeNumberFormat from '~/utilities/escapeNumberFormat';

export default function submit() {

	const data = {};

	/** ## Avatar ## */
	data["bidding_rivers_avatar"] = this.state.bidding_rivers_avatar.source;
	if (this.state.bidding_rivers_avatar.source && typeof this.state.bidding_rivers_avatar.source === "object" && this.state.bidding_rivers_avatar.source["uri"]) {

		let avatarSource = this.state.bidding_rivers_avatar.source["uri"];
		avatarSource = avatarSource.split('base64,', 2)[1];

		data["bidding_rivers_avatar"] = {
			...this.state.bidding_rivers_avatar.info,
			content: avatarSource
		};
	}

	/** ## Tiêu đề ## */
	data['bidding_rivers_title_own'] = this.state.bidding_rivers_title_own.value ? this.state.bidding_rivers_title_own.value : null;;

	/** ## Vị trí ## */
	data['bidding_rivers_place'] = this.state.bidding_rivers_place.value[0] || {};

	/** ## Ngày bắt đầu thuê ## */
	data['bidding_rivers_time'] = this.state.bidding_rivers_time.label || null;;
	
	/** ## Liên hệ SMS ## */
	data['bidding_rivers_contact_sms'] = null;

	/** ## Liên hệ Sđt ## */
	data['bidding_rivers_contact_phone'] = this.state.bidding_rivers_contact_phone.value || this.state.bidding_rivers_contact_sms.value || null;

	data['bidding_rivers_contact_sms'] = this.state.bidding_rivers_contact_sms.value || this.state.bidding_rivers_contact_phone.value || null;

	/** ## Liên hệ email ## */
	data['bidding_rivers_contact_email'] = this.state.bidding_rivers_contact_email.value || null;

	/** ## Hình thức liện hệ ## */
	data["bidding_rivers_contact_by"] = null;
	if (this.state.bidding_rivers_contact_phone.checked && this.state.bidding_rivers_contact_phone.checked) {

		data["bidding_rivers_contact_by"] = 0;
	} else if (this.state.bidding_rivers_contact_sms.checked) {

		data["bidding_rivers_contact_by"] = 2;
	} else if (this.state.bidding_rivers_contact_phone.checked) {

		data["bidding_rivers_contact_by"] = 1;
	}

	/** ## Ghi chú ## */
	data['bidding_rivers_information'] = this.state.bidding_rivers_information || "";;

	/** ## Ảnh ## */
	data["bidding_rivers_images"] = [];

	if (this.state.bidding_rivers_images.length) {

		this.state.bidding_rivers_images.forEach(({ source = null, info = {} }) => {

			if (source) {

				if (typeof source === "object" && source["uri"]) {

					source = (source["uri"].split('base64,', 2))[1];

					return data["bidding_rivers_images"].push({
						...info,
						content: source
					});
				}

				data["bidding_rivers_images"].push(source);
			}
		});
	}
	/** END */
	return this.props.onSubmit && this.props.onSubmit(data);
};
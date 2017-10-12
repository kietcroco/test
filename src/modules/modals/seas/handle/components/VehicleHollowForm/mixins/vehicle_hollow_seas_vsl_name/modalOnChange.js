import { translate } from '~/utilities/language';
import vehicleService from '~/services/seas/vehicle';
import alertUtil from '~/utilities/alert';

const event = async (context, label, value) => {

	try {

		const res = await vehicleService.check(value);
		let checkMsg = null;

		if (res.status === 200) {

			if (res.data.STATUS === "ERROR" && res.data.message) {

				value = label = "";
				checkMsg = res.data.message;
			}
		}

		return context.setState({
			vehicle_hollow_seas_vsl_name: {
				...context.state.vehicle_hollow_seas_vsl_name,
				value,
				label,
				modalVisible: false,
				messageType: !value.length ? "error" : "success",
				message: checkMsg || (!value.length ? translate("#$seas$#Bạn vui lòng nhập tên tàu") : "") 
			}
		});

	} catch (e) {

		alertUtil({
			title: translate("#$seas$#Lỗi"),
			message: translate("#$seas$#Kiểm tra phương tiện không thành công")
		});
		context.setState({
			vehicle_hollow_seas_vsl_name: {
				...context.state.vehicle_hollow_seas_vsl_name,
				value,
				label,
				modalVisible: false,
				messageType: null,
				message: "" 
			}
		});
	}
};

export default function modalOnChange(label: String = "", value: String = "") {

	this.setState({
		vehicle_hollow_seas_vsl_name: {
			...this.state.vehicle_hollow_seas_vsl_name,
			messageType: "loading"
		}
	});

	event(this, label, value);
};
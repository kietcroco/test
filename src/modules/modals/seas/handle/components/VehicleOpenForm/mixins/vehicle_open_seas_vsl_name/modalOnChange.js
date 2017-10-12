import { translate } from '~/utilities/language';
import vehicleService from '~/services/seas/vehicle';

const event = async (context, label, value) => {
	try {

		const reponse = await vehicleService.check(value);
		checkMsg = null;
		if (reponse.status === 200) {

			if (reponse.data.STATUS === "ERROR" && reponse.data.message) {
				value = label = "";
				checkMsg = reponse.data.message;
			}
		}

		return context.setState({
			vehicle_open_seas_vsl_name: {
				...context.state.vehicle_open_seas_vsl_name,
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
			vehicle_open_seas_vsl_name: {
				...context.state.vehicle_open_seas_vsl_name,
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
		vehicle_open_seas_vsl_name: {
			...this.state.vehicle_open_seas_vsl_name,
			messageType: "loading"
		}
	});
	event(this, label, value);
};
import { translate } from '~/utilities/language';
import vehicleService from '~/services/rivers/vehicle';
import formatNumberInput from '~/utilities/formatNumberInput';
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

		var vehicle_rivers_type = {
			...context.state.vehicle_rivers_type,
			label: "",
			value: [],
			editable: true
		};
		var vehicle_rivers_tonnage = {
			...context.state.vehicle_rivers_tonnage,
			value: "",
			editable: true
		};

		if( 
			res.data.data && 
			res.data.data.vehicle_rivers_code && 
			res.data.data.vehicle_rivers_tonnage &&
			res.data.data.vehicle_rivers_type 
		) {
			
			vehicle_rivers_type = {
				...vehicle_rivers_type,
				value: [{ value: res.data.data.vehicle_rivers_type }],
				label: res.data.data.vehicle_rivers_type,
				editable: false
			};

			vehicle_rivers_tonnage = {
				...vehicle_rivers_tonnage,
				value: formatNumberInput(`${ res.data.data.vehicle_rivers_tonnage }`),
				editable: false
			};
		}

		return context.setState({
			vehicle_rivers_code: {
				...context.state.vehicle_rivers_code,
				value,
				label,
				modalVisible: false,
				messageType: !value.length ? "error" : "success",
				message: checkMsg || (!value.length ? translate("Bạn vui lòng nhập số đăng ký PT") : "") 
			},
			vehicle_rivers_type,
			vehicle_rivers_tonnage
		});

	} catch (e) {

		alertUtil({
			title: translate("Lỗi"),
			message: translate("Kiểm tra phương tiện không thành công")
		});
		context.setState({
			vehicle_rivers_code: {
				...context.state.vehicle_rivers_code,
				value,
				label,
				modalVisible: false,
				messageType: null,
				message: "" 
			},
			vehicle_rivers_type: {
				...context.state.vehicle_rivers_type,
				editable: true
			},
			vehicle_rivers_tonnage: {
				...context.state.vehicle_rivers_tonnage,
				editable: true
			}
		});
	}
};

export default function modalOnChange(label: String = "", value: String = "") {

	this.setState({
		vehicle_rivers_code: {
			...this.state.vehicle_rivers_code,
			messageType: "loading"
		}
	});

	event(this, label, value);
};
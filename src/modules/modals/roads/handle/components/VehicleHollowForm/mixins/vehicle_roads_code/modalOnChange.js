import { translate } from '~/utilities/language';
import vehicleService from '~/services/roads/vehicle';
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

		var vehicle_roads_type = {
			...context.state.vehicle_roads_type,
			label: "",
			value: [],
			editable: true
		};
		var vehicle_roads_tonnage = {
			...context.state.vehicle_roads_tonnage,
			value: "",
			editable: true
		};

		if( 
			res.data.data && 
			res.data.data.vehicle_roads_code && 
			res.data.data.vehicle_roads_tonnage &&
			res.data.data.vehicle_roads_type 
		) {
			
			vehicle_roads_type = {
				...vehicle_roads_type,
				value: [{ value: res.data.data.vehicle_roads_type }],
				label: res.data.data.vehicle_roads_type,
				editable: false
			};

			vehicle_roads_tonnage = {
				...vehicle_roads_tonnage,
				value: formatNumberInput(`${ res.data.data.vehicle_roads_tonnage }`),
				editable: false
			};
		}

		return context.setState({
			vehicle_roads_code: {
				...context.state.vehicle_roads_code,
				value,
				label,
				modalVisible: false,
				messageType: !value.length ? "error" : "success",
				message: checkMsg || (!value.length ? translate("Bạn vui lòng nhập số đăng ký PT") : "") 
			},
			vehicle_roads_type,
			vehicle_roads_tonnage
		});

	} catch (e) {

		alertUtil({
			title: translate("Lỗi"),
			message: translate("Kiểm tra phương tiện không thành công")
		});
		context.setState({
			vehicle_roads_code: {
				...context.state.vehicle_roads_code,
				value,
				label,
				modalVisible: false,
				messageType: null,
				message: "" 
			},
			vehicle_roads_type: {
				...context.state.vehicle_roads_type,
				editable: true
			},
			vehicle_roads_tonnage: {
				...context.state.vehicle_roads_tonnage,
				editable: true
			}
		});
	}
};

export default function modalOnChange(label: String = "", value: String = "") {

	this.setState({
		vehicle_roads_code: {
			...this.state.vehicle_roads_code,
			messageType: "loading"
		}
	});

	event(this, label, value);
};
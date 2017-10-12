import alertUtil from '~/utilities/alert';
import { translate } from '~/utilities/language';

export default async (service, navigation, refreshing = false) => {

	const {
		params = {}
	} = navigation.state || {};

	let {
		id = 0,
		source = {}
	} = params;

	if (refreshing) {

		navigation.setParams({
			...params,
			refreshed: false
		});
	}

	try {

		const res = await service.get({
			id
		});

		if( res.status === 200 && res.data && res.data.STATUS !== "ERROR" ) {

			source = res.data.data || {};

			return navigation.setParams({
				id: source.id,
				source,
				loaded: true,
				refreshed: true
			});
		}

		return alertUtil({
			title: res.data.messageTitle || translate("Lỗi"), 
			message: res.data.message || translate("Không tìm thấy thông tin"), 
			actions: [
				{
					text: 'OK', onPress: (() => {

						if (source && id) {

							navigation.setParams({
								id,
								source,
								loaded: true,
								refreshed: true
							});
						} else {

							navigation.goBack();
						}
					}), style: 'cancel'
				}
			]
		});

	} catch(e) {

		alertUtil({
			title: translate("Lỗi"), 
			message: translate("Không tìm thấy thông tin"), 
			actions: [
				{
					text: 'OK', onPress: (() => {

						if (source && id) {

							navigation.setParams({
								id,
								source,
								loaded: true,
								refreshed: true
							});
						} else {

							navigation.goBack();
						}
					}), style: 'cancel'
				}
			]
		});
	}
};
import showImagePicker from '~/utilities/showImagePicker';
import uploadService from '~/services/public-file/upload';

import alertUtil from '~/utilities/alert';

export default async function onPress() {

	try {
		
		const imageRes = await showImagePicker();
		if( !imageRes.didCancel && imageRes.data ) {

			const res = await uploadService.uploadImage( imageRes );
			
			if( res.status === 200 && res.data ) {
				
				if( res.data.STATUS === "OK" ) {

					return this.setState({
						account_legal_paper: res.data.data[0]
					});
				}

			}
			
			return alertUtil({
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Tải hình không thành công")
			});
		}
	} catch (error) {
		
		alertUtil({
			title: translate("Lỗi"),
			message: translate("Tải hình không thành công")
		});
	}
};
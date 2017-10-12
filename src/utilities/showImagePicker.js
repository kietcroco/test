import ImagePicker from 'react-native-image-picker';
import { translate } from '~/utilities/language';

export default async () => {

    return new Promise( (resolve, reject) => {

        ImagePicker.showImagePicker({
            title: translate("Chọn ảnh đại diện"),
            cancelButtonTitle: translate("Huỷ"),
            takePhotoButtonTitle: translate("Chụp ảnh"),
            chooseFromLibraryButtonTitle: translate("Thư viện"),
            // customButtons: [
            //  {name: 'fb', title: 'Choose Photo from Facebook'},
            // ],
            cameraType: "back",
            mediaType: "photo",
            maxWidth: 1024,
            maxHeight: 768,
            quality: 0.8,
            //videoQuality: "high",
            //durationLimit: 60,
            //rotation: 0,
            allowsEditing: true,
            //noData: true,
            storageOptions: {
                skipBackup: true,
                path: "izifix",
                cameraRoll: true,
                waitUntilSaved: false
            },
            permissionDenied: {
                title: translate("Không có quyền truy cập"),
                text: translate("Bạn vui lòng cấp quyền để có thể truy cập máy ảnh và thư viện"),
                reTryTitle: translate("Thử lại"),
                okTitle: "OK"
            }
        }, response => {
            //console.log('Response = ', response);

            // if ( response.didCancel ) {

            // 	console.log('User cancelled image picker');
            // }
            if ( response.error ) {

                return reject( response.error );
                //console.log('ImagePicker Error: ', response.error);
            }
            return resolve( response );
            // if ( response.customButton ) {

            // 	console.log('User tapped custom button: ', response.customButton);
            // }
            //else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                // 	avatarSource: source
                // });
            //}
        });
    } );
};
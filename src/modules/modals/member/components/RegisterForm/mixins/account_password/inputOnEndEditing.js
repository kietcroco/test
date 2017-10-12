import { translate } from '~/utilities/language';

export default async function onEndEditing() {

	if( !this.state.account_password.value ){

        return this.setState({
            ...this.state.account_password,
			messageType: "error",
			message: translate("Bạn vui lòng nhập password")
        });
    }

    if( this.state.account_password.value.length < 4 ){

        return this.setState({
            ...this.state.account_password,
			messageType: "error",
			message: translate("Password tối thiểu 4 ký tự")
        });
    }
};
import { namespace } from './constants';

import Login from './containers/Login.container';
import Register from './containers/Register.container';
import Active from './containers/Active.container';
import Detail from './containers/Detail.container';
import Contact from './containers/Contact.container';
import ForgetPassword from './scenes/ForgetPassword.scene';
import ForgotPassword from './scenes/ForgotPassword.scene';
import ChangePassword from './containers/ChangePassword.container';
import Profile from './containers/Profile.container';
import UpdateProfile from './containers/UpdateProfile.container';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/login" ]: { screen: Login },
	[ namespace + "/register" ]: { screen: Register },
	[ namespace + "/contact" ]: { screen: Contact },
	[ namespace + "/active" ]: { screen: Active },
	[ namespace + "/detail" ]: { screen: Detail },
	[ namespace + "/forget-password" ]: { screen: ForgetPassword },
	[ namespace + "/forgot-password" ]: { screen: ForgotPassword },
	[ namespace + "/change-password" ]: { screen: ChangePassword },
	[ namespace + "/profile" ]: { screen: Profile },
	[ namespace + "/update-profile" ]: { screen: UpdateProfile },
};

export default routeConfiguration;
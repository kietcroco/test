import { namespace } from './constants';

import List from './containers/List.container';

// đăng ký router
const routeConfiguration = {
	[ namespace + "/list" ]: { screen: List },
};

export default routeConfiguration;
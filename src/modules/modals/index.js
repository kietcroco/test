import rivers from './rivers';
import roads from './roads';
import seas from './seas';
import member from './member';
import notification from './notification';

// đăng ký router
const routeConfiguration = {
	...rivers,
	...roads,
	...seas,
	...member,
	...notification
};

export default routeConfiguration;
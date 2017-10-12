import rivers from './rivers';
import roads from './roads';
import seas from './seas';
import member from './member';

// đăng ký router
const routeConfiguration = {
	...rivers,
	...roads,
	...seas,
	...member
};

export default routeConfiguration;
import ReducerRegistry from '~/library/ReducerRegistry';
import { getCurrentLanguage } from '~/utilities/language';

// reducer token
const authorization = ReducerRegistry.register("authorization", (state = "", action) => {

	switch (action.type) {

		// set lại token
		case `setAuthorization`:

			return action.payload;

		// xoá token
		case `deleteAuthorization`:

			return "";
		default:
			return state;
	}
}, true);

// reducer account entities
const authIdentity = ReducerRegistry.register("authIdentity", (state = null, action) => {

	switch (action.type) {

		// set lại token
		case `setAuthIdentity`:

			return action.payload;

		// xoá token
		case `deleteAuthIdentity`:

			return null;
		default:
			return state;
	}
}, true);

// reducer account entities chưa active
const authIdentityUnActive = ReducerRegistry.register("authIdentityUnActive", (state = null, action) => {

	switch (action.type) {

		// set lại account entities
		case `setAuthIdentityUnActive`:

			return action.payload;

		// xoá account entities
		case `deleteAuthIdentityUnActive`:

			return null;
		default:
			return state;
	}
}, true);

const initCurrentLanguage = getCurrentLanguage();

// reducer ngôn ngữ
const currentLanguage = ReducerRegistry.register("currentLanguage", (state = initCurrentLanguage, action) => {

	switch (action.type) {

		// set lại token
		case `setCurrentLanguage`:

			return action.payload;
		default:
			return state;
	}
}, true);

// số thông báo chưa đọc
const unreadNotification = ReducerRegistry.register("unreadNotification", (state = 0, action) => {

	switch (action.type) {

		// set số thông báo chưa đọc
		case `setUnreadNotification`:

			return action.payload;

		// reset số thông báo chưa đọc
		case `unsetUnreadNotification`:

			return 0;
		default:
			return state;
	}
}, true);

export {
    authorization,
	authIdentity,
	currentLanguage,
	unreadNotification,
	authIdentityUnActive
};
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

export {
    authorization,
	authIdentity,
	currentLanguage
};
import formatLabel from './utils/formatLabel';
import { translate } from '~/utilities/language';

export default {
	visible: false,
	multiple: false,
	//title: translate("Chọn"),
	delimiter: "-/-",
	separate: ";",
	labelDelimiter: " - ",
	labelSeparate: ", ",
	defaultValue: [],
	source: [],
	showParent: false,
	formatLabel,
	geolocation: false,
	searchToOther: false,
	keepInput: false,
	searchBar: true,
	translate: true
};
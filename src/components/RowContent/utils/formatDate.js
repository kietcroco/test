import dateTimeFormat from '~/utilities/dateTimeFormat';
import isTimestamp from '~/utilities/isTimestamp';

const formatDateString = 'DD/MM';

export default ( value ) => {

	value = value * 1000;
	value = `${value}` == `NaN` ? 0 : value;

	if( !isTimestamp(value) ) {

		return "";
	}

	return dateTimeFormat( value, formatDateString );
};
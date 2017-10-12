import timeAgo from '~/utilities/timeAgo';
import isTimestamp from '~/utilities/isTimestamp';

export default ( value, locale ) => {

	value = value * 1000;
	value = `${value}` == `NaN` ? 0 : value;

	if( !isTimestamp(value) ) {

		return "";
	}

	return timeAgo( value, locale );
};
import numberFormat from '~/utilities/numberFormat';
import majorNumberFormat from './formatNumber';
import { translate } from '~/utilities/language';

const formatPrice = `0,0.[000] a`;
const minFormat = 999999;

export default ( value, discussText, locale ) => {

    value = value * 1;
    value = `${value}` == `NaN` ? 0 : value;

    if( !value ) {

        discussText = discussText || translate("Giá thoả thuận");
        return discussText;
    }
    
    if( value <= minFormat ) {

        return majorNumberFormat( value, locale );
    }

    return numberFormat( value, formatPrice, locale );
};
import numberFormat from '~/utilities/numberFormat';

const formatNumber = `0,0.[00000000000]`;

export default ( value, locale ) => {

    value = value * 1;
    value = `${value}` == `NaN` ? 0 : value;

    if( value ) {

        return numberFormat( value, formatNumber, locale );
    }

    return value;
};
import toAlias from '~/utilities/toAlias';

export default ( text: String = "", source: Array = [] ) => {

    source = text.length ? source.reduce( (result, item) => {

        if( toAlias( item.label.toLowerCase() ).includes(toAlias( text.toLowerCase() )) ) {

            result.push(item);
        }

        return result;
    }, [] ) : source;

    return source;
};
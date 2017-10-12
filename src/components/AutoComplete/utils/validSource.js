export default ( source: Array = [] ) => {

    source = source.reduce( (result, value) => {
			
        if( value ) {

            if( typeof value === "string" ) {

                result.push( {
                    label: value,
                    value: value
                } );
            } else if( typeof value === "object" && value.label && value.value ) {

                result.push( value );
            }
        }
        return result;
    }, [] );

    return source;
};
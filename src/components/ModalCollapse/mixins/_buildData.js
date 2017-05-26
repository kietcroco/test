import generateData from '../utils/generateData';

export default function( values: Array ) {

	this._dataSource = JSON.parse( JSON.stringify(this.props.source) );

	values = ( values && values.length && values ) 
				|| ( this.props.defaultValue && this.props.defaultValue.length && this.props.defaultValue )
				|| [];

	this._dataSource = generateData( this._dataSource, values.slice(), {
		delimiter: this.props.delimiter,
		separate: this.props.separate,
		labelDelimiter: this.props.labelDelimiter,
		labelSeparate: this.props.labelSeparate,
		showParent: this.props.showParent
	} );

	return this._dataSource;
};
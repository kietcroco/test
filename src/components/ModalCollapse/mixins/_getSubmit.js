import getSubmit from '../utils/getSubmit';

export default function() {

	return getSubmit( this._dataSource, {
		delimiter: this.props.delimiter,
		separate: this.props.separate,
		labelDelimiter: this.props.labelDelimiter,
		labelSeparate: this.props.labelSeparate,
		showParent: this.props.showParent
	} );
};
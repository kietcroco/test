export default function() {

	if( 
		this.props.onChange && 
		(
			this.props.value !== this.state.text
		)
	) {

		// trigger
		this.props.onChange( this.state.text, null, this.state.text );
	}

	// ẩn modal
	this.hide();
};
export default function (text) {

	this.setState({
		text
	});

	this.props.onChangeText && this.props.onChangeText(text);

	if( text.length >= this.props.minLength ) {

		// render gợi ý
		this._getSuggestions( text );
	}else {

		// render rỗng
		this._emptyList();
	}
};
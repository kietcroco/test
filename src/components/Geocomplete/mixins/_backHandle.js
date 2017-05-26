export default function () {

	if( this.props.backHandle && this.props.backHandle() ) {

		this.hide();
	} else if( !this.props.backHandle ){

		this.hide();
	}
};
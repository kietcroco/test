export default function (e) {

	this.hide();
	this.props.onRequestClose && this.props.onRequestClose(e);
};
export default function onPress() {

	!this.state.enterprise_seas_career.modalVisible && this.setState({
		enterprise_seas_career: {
			...this.state.enterprise_seas_career,
			modalVisible: true
		}
	});
};
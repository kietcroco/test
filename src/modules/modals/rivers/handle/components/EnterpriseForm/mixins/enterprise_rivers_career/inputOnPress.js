export default function onPress() {

	!this.state.enterprise_rivers_career.modalVisible && this.setState({
		enterprise_rivers_career: {
			...this.state.enterprise_rivers_career,
			modalVisible: true
		}
	});
};
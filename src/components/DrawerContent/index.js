import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './components/DrawerContent.scene';

const mapStateToProps = state => {

	return {
		token: state["authorization"],
		authIdentity: state["authIdentity"],
		currentLanguage: state["currentLanguage"]
	};
};

const mapDispatchToProps = dispatch => {

	return {
		dispatch
	};
};

// const mergeProps = () => {

// };

const options = {
	withRef: true,
	pure: false
};
export default connect( mapStateToProps, mapDispatchToProps, null, options )( Component );
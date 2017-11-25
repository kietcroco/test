import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../scenes/Seas.scene';
import actions from '../actions/seas.action';
import reducer from '../reducers/seas.reducer';

const key = reducer.$$key;

const mapStateToProps = state => {

	return {
		reducers: state[key],
		currentLanguage: state["currentLanguage"],
		token: state["authorization"],
		authIdentityUnActive: state["authIdentityUnActive"]
	};
};

const mapDispatchToProps = dispatch => {

	return {
		dispatch,
		actions: bindActionCreators(actions, dispatch)
	};
};

// const mergeProps = () => {

// };

const options = {
	withRef: true,
	pure: false
};
export default connect( mapStateToProps, mapDispatchToProps, null, options )( Component );
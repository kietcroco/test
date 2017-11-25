import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../scenes/Rivers.scene';
import actions from '../actions/rivers.action';
import reducer from '../reducers/rivers.reducer';

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
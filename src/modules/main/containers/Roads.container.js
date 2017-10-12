import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../scenes/Roads.scene';
import actions from '../actions/roads.action';
import reducer from '../reducers/roads.reducer';

const key = reducer.$$key;

const mapStateToProps = state => {

	return {
		reducers: state[key],
		currentLanguage: state["currentLanguage"]
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
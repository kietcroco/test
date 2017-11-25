import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../scenes/List.scene';
import actions from '../actions/list.action';
import reducer from '../reducers/list.reducer';

const key = reducer.$$key;

const mapStateToProps = state => {

	return {
		reducers: state[key],
		token: state["authorization"]
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
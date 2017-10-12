import { connect } from 'react-redux';

const mapStateToProps = state => {

	return {
		currentLanguage: state["currentLanguage"]
	};
};

// const mapDispatchToProps = dispatch => {

// 	return {
// 		dispatch
// 	};
// };

// const mergeProps = () => {

// };

const options = {
	withRef: true,
	pure: false
};

export default Component => {

    return connect( mapStateToProps, null, null, options )( Component );
};
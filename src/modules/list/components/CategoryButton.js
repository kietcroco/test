import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

class CategoryButton extends React.PureComponent {

	static displayName = "@CategoryButton";

	static propTypes = {
		style: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		children: React.PropTypes.string.isRequired,
		active: React.PropTypes.bool
	};

	static defaultProps = {
		active: false
	};

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.active !== nextProps.active ||
			this.props.children !== nextProps.children
		);
	}

	render() {

		const { onPress, children, active, style } = this.props;

		return (
			<TouchableOpacity style={[_styles.container, style, active && {
				backgroundColor: "#c4ced8"
			}]} onPress={ !active ? onPress : undefined }>
				<Text style={ _styles.label }>{ children }</Text>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		backgroundColor: "white",
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		elevation: 2,
		shadowOpacity: 1.0,
		marginLeft: 5,
		marginRight: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	label: {
		fontSize: 11,
		textAlignVertical: "center",
		textAlign: "center"
	}
};
export default CategoryButton;
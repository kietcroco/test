import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class CategorySelect extends React.PureComponent {

	static displayName = "@CategorySelect";

	static propTypes = {
		style: React.PropTypes.object,
		children: React.PropTypes.string,
		onPress: React.PropTypes.func
	};

	static defaultProps = {
		children: "- Chọn -"
	};

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.children !== nextProps.children ||
			this.props.style != nextProps.style ||
			this.props.onPress != nextProps.onPress
		);
	}

	render() {

		const { children, onPress, style } = this.props;

		return (
			<TouchableOpacity style={ [_styles.container, style] } onPress={ onPress }>
				<Text numberOfLines={1} style={ _styles.label }>{ children }</Text>
				<FAIcon name="angle-down" style={ _styles.icon }/>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: 30,
		borderWidth: 0.5,
		borderColor: "#b2cee6",
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		paddingLeft: 5,
		paddingRight: 18
	},
	label: {
		color: "white",
		fontSize: 12
	},
	icon: {
		color: "white",
		position: "absolute",
		right: 5,
		fontSize: 16
	}
};

export default CategorySelect;
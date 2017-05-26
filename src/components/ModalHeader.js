import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class ModalHeader extends React.PureComponent {

	static displayName = "@ModalHeader";

	static propTypes = {
		backHandle: React.PropTypes.func.isRequired,
		title: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node
		]),
		children: React.PropTypes.node,
		backgroundColor: React.PropTypes.string,
		color: React.PropTypes.string
	};

	static defaultProps = {
		backgroundColor: "#2672ba",
		color: "white"
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.title !== nextProps.title ||
			this.props.backHandle != nextProps.backHandle ||
			this.props.children != nextProps.children ||
			this.props.children != nextProps.backgroundColor ||
			this.props.color != nextProps.color
		);
	}

	render() {

		const { backHandle, title, children, backgroundColor, color } = this.props;
		
		return (
			<View style={ [_styles.container, { backgroundColor }] }>
				<TouchableOpacity style={ _styles.btnBack } onPress={ backHandle }>
					<FAIcon style={ [_styles.iconBack, {color}] } name="chevron-left"/>
				</TouchableOpacity>
				<View style={ _styles.titleWrapper }>
					{
						typeof title === "string" ?
							<Text style={ [_styles.title, {color}] } numberOfLines={1}>{ title }</Text>
						: title
					}
				</View>
				<View style={ _styles.headerRight }>
					{ children }
				</View>
			</View>
		);
	}
}

const _styles = {
	container: {
		height: 40,
		flexDirection: "row",
		backgroundColor: "#2672ba",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 0.5,
		borderBottomColor: "#cdcdcd"
	},
	btnBack: {
		width: 30,
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	iconBack: {
		textAlign: "center",
		textAlignVertical: "center",
		color: "white",
		fontSize: 16,
		marginTop: 2
	},
	titleWrapper: {
		height: "100%",
		justifyContent: "center",
		flex: 1
	},
	title: {
		textAlignVertical: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
		height: "100%",
		marginLeft: 5,
		marginRight: 5
	},
	headerRight: {
		height: "100%",
		justifyContent: "center"
	}
};

export default ModalHeader;
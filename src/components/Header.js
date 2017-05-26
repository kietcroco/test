/**
 * @flow
*/
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class Header extends React.PureComponent {

	static displayName = "@Header";

	render() {

		const { 
			navigation,
			navigationOptions: {
				headerRight,
				headerLeft,
				title, 
				titleImage
			},
			router
		} = this.props;

		const { state: {index, routes} } = navigation;

		let Title, HeaderLeft = headerLeft, HeaderRight = headerRight;

		if( !title && !titleImage ) {

			Title =	<Image style={ _styles.logo } source={ require("~/assets/images/logo.png") }/>
		} else if( titleImage ) {

			Title =	<Image style={ _styles.logo } source={ titleImage }/>;
		} else {

			Title =	<Text numberOfLines={1} style={ _styles.title }>{ title }</Text>
		}

		const childProps = {index, routes, router, navigation};

		if( typeof HeaderLeft === "function" ) {

			HeaderLeft = HeaderLeft.prototype.isReactComponent ? <HeaderLeft { ...childProps }/>: HeaderLeft(childProps);
		} else if( !HeaderLeft && index ) {

			HeaderLeft = (
				<TouchableOpacity style={ _styles.btnBack } onPress={ () => {
					
					navigation.goBack();
				} }>
					<FAIcon style={ _styles.iconBack } name="chevron-left"/>
				</TouchableOpacity>
			);
		}
		
		if( typeof HeaderRight === "function" ) {

			HeaderRight = HeaderRight.prototype.isReactComponent ? <HeaderRight { ...childProps }/>: HeaderRight(childProps);
		}

		return (
			<View style={ _styles.container }>
				<View style={ _styles.headerLeft }>
					{ HeaderLeft }
				</View>
				<View style={ [_styles.headerTitle, index && {left: 30}, ( !title && titleImage || !title ) && _styles.titleCenter] }>
					{ Title }
				</View>
				<View style={ _styles.headerRight }>
					{ HeaderRight }
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
		justifyContent: "space-between"
	},
	headerLeft: {
		justifyContent: "center",
		height: "100%"
	},
	btnBack: {
		width: 30,
		height: "100%",
		justifyContent: "center"
	},
	iconBack: {
		textAlign: "center",
		textAlignVertical: "center",
		color: "white",
		fontSize: 16,
		marginTop: 2
	},
	headerTitle: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center"
	},
	logo: {
		width: 60,
		resizeMode: "contain"
	},
	title: {
		textAlignVertical: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
		flex: 1,
		marginLeft: 5
	},
	headerRight: {
		justifyContent: "center",
		height: "100%"
	},
	titleCenter: {
		justifyContent: "center",
		alignItems: "center",
		left: 0
	}
};

export default Header;
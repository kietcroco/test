/**
 * @flow
*/
import PropTypes from 'prop-types';

import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { isReactComponent, isElement } from '~/library/componentDetect';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

class Header extends React.Component {

	static displayName = "@Header";

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		scene: PropTypes.object.isRequired,
		screenProps: PropTypes.object,
		getScreenDetails: PropTypes.func.isRequired
	};

	constructor(props) {
		super( props );

		this.state = {
			modalVisible: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			!recursiveShallowEqual( this.props.scene, nextProps.scene ) ||
			!recursiveShallowEqual( this.props.screenProps, nextProps.screenProps )
		);
	}


	_renderHeaderLeft( options: Object = {} ) {

		const {
			scene,
			navigation
		} = this.props;

		const { headerLeft: HeaderLeft } = options;

		if ( isReactComponent( HeaderLeft ) ) {

			return (
				<HeaderLeft { ...this.props }/>
			);
		}

		if( isElement( HeaderLeft ) ) {

			return HeaderRight;
		}

		if( typeof HeaderLeft === 'function' ) {

			return HeaderLeft(this.props);
		}

		if( scene.index !== 0 ) {

			return (
				<TouchableOpacity onPress={ () => {

					navigation.goBack();
				} } style={ _styles.btnBack }>

					<FAIcon style={ _styles.iconBack } name="chevron-left"/>
				</TouchableOpacity>
			);
		}

		return null;
	}

	_renderHeaderRight( options: Object = {} ) {

		const { headerRight: HeaderRight } = options;

		if ( isReactComponent( HeaderRight ) ) {

			return (
				<HeaderRight { ...this.props }/>
			);
		}

		if( isElement( HeaderRight ) ) {

			return HeaderRight;
		}

		if( typeof HeaderRight === 'function' ) {

			return HeaderRight(this.props);
		}

		return null;
	}

	render() {

		const {
			navigation,
			scene,
			getScreenDetails
		} = this.props;

		const { options = {} } = getScreenDetails( scene );
		const { title, titleImage } = options;
		let Title = null;

		if( !title && !titleImage ) {

			Title = (
				<Image style={ _styles.logo } source={ require("~/assets/images/logo.png") }/>
			);
		} else if( titleImage ) {

			Title =	(
				<Image style={ _styles.logo } source={ titleImage }/>
			)
		} else {

			Title =	<Text numberOfLines={1} style={ _styles.title }>{ title }</Text>
		}

		return (
			<View style={ _styles.container }>
				<StatusBar backgroundColor={ colors.primaryColor } hidden={Platform.OS === "ios"}/>
				<View style={ _styles.headerLeft }>
					{ this._renderHeaderLeft( options ) }
				</View>
				<View pointerEvents="box-none" style={ [_styles.headerTitle, !title && _styles.headerCenterTitle] }>
					{ Title }
				</View>
				<View style={ _styles.headerRight }>
					{ this._renderHeaderRight( options ) }
				</View>
			</View>
		);
	}
}

const _styles = {
	container: {
		height: sizes.headerHeight,
		flexDirection: "row",
		backgroundColor: colors.primaryColor,
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerLeft: {
		justifyContent: "center",
		height: "100%"
	},
	btnBack: {
		width: sizes.buttonNormal,
		height: "100%",
		justifyContent: "center"
	},
	iconBack: {
		textAlign: "center",
		textAlignVertical: "center",
		color: colors.secondColor,
		fontSize: 16 * scale,
		marginTop: 2 * scale
	},
	headerRight: {
		justifyContent: "center",
		height: "100%"
	},
	headerTitle: {
		flex: 1,
		justifyContent: "center",
		height: "100%"
	},
	logo: {
		width: 60 * scale,
		resizeMode: "contain"
	},
	title: {
		textAlignVertical: "center",
		color: colors.secondColor,
		fontWeight: "bold",
		fontSize: fontSizes.large,
		marginLeft: sizes.spacing
	},
	headerCenterTitle: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center"
	}
};

export default Header;
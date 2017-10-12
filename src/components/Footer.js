/**
 * @flow
*/
import PropTypes from 'prop-types';

import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { isReactComponent, isElement } from '~/library/componentDetect';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';

class Footer extends React.Component {

	static displayName = "@Footer";

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		scene: PropTypes.object.isRequired,
		screenProps: PropTypes.object,
		getScreenDetails: PropTypes.func.isRequired
	};

	shouldComponentUpdate(nextProps) {

		return (
			!recursiveShallowEqual( this.props.scene, nextProps.scene ) ||
			!recursiveShallowEqual( this.props.screenProps, nextProps.screenProps )
		);
	}

	render() {

		const {
			scene,
			getScreenDetails
		} = this.props;

		const { options: {
			footerContent: FooterContent
		} = {} } = getScreenDetails( scene );

		if ( isReactComponent( FooterContent ) ) {

			return (
				<FooterContent { ...this.props }/>
			);
		}

		if( isElement( FooterContent ) ) {

			return FooterContent;
		}

		if( typeof FooterContent === 'function' ) {

			return FooterContent(this.props);
		}

		return null;
	}
}

export default Footer;
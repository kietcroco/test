import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import CategoryButton from './CategoryButton';
import { translate } from '~/utilities/language';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { scale } from '~/configs/styles';

import mapCurrentLanguage from '~/utilities/mapCurrentLanguageToProps';

class Category extends React.Component {

	static displayName = "@Category";

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		source: PropTypes.object.isRequired
	};

	shouldComponentUpdate( nextProps ) {

		const { 
			navigation: {
				state: {
					params: {
						Exchange: nextExchange = "", 
						type: nextType = ""
					} = {} 
				} 
			} 
		} = nextProps;

		const { 
			navigation: {
				state: {
					params: {
						Exchange = "", 
						type = ""
					} = {} 
				} 
			} 
		} = this.props;

		return (
			Exchange !== nextExchange ||
			nextType !== type ||
			this.props.currentLanguage !== nextProps.currentLanguage ||
			!recursiveShallowEqual( this.props.source, nextProps.source )
		);
	}

	_buildSource( exchange: String = "", type: String = "" ) {
		return this.props.source[ exchange ];
	}

	_renderItem() {

		const { navigation } = this.props;
		const { state: { params: { Exchange = "", type = "" } = {} } } = navigation;

		const source = this._buildSource( Exchange, type );


		if( !source.category || source.category && !source.category.length ) {

			return null;
		}

		return source.category.map( item => {

			return (
				<CategoryButton 
					onPress 	= { () => navigation.setParams( item.params ) }
					active 		= { Exchange === item.params.Exchange && type === item.params.type }
					key 		= { `category-${item.params.Exchange}-${item.params.type}` }
				>{ translate( item.label ) }</CategoryButton>
			);
		} );
	}

	render() {

		const Items = this._renderItem();

		if( !Items ) {

			return null;
		}

		return (
			<ScrollView 
				style 							= { _style }
				horizontal 						= { true }
				keyboardDismissMode 			= "on-drag"
				keyboardShouldPersistTaps 		= "always"
				showsHorizontalScrollIndicator 	= { false }
				showsVerticalScrollIndicator 	= { false }
				directionalLockEnabled 			= { true }
			>
				{ Items }
			</ScrollView>
		);
	}
}

const _style = {
	backgroundColor: "transparent",
	paddingTop: 9 * scale,
	paddingBottom: 9 * scale,
	height: 40 * scale
};

export default mapCurrentLanguage(Category);
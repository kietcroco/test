import React from 'react';
import { ScrollView } from 'react-native';
import CategoryButton from './CategoryButton';
import { translate } from '~/utilities/language';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';

class Category extends React.PureComponent {

	static displayName = "@Category";

	static propTypes = {
		navigation: React.PropTypes.shape({
			dispatch: React.PropTypes.func.isRequired,
			goBack: React.PropTypes.func,
			navigate: React.PropTypes.func.isRequired,
			setParams: React.PropTypes.func.isRequired,
			state: React.PropTypes.shape({
				params: React.PropTypes.shape({
					Exchange: React.PropTypes.string,
					type: React.PropTypes.string // loại
				})
			}).isRequired,
		}).isRequired,
		source: React.PropTypes.object.isRequired
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
			>
				{ Items }
			</ScrollView>
		);
	}
}

const _style = {
	backgroundColor: "transparent",
	paddingTop: 9,
	paddingBottom: 9,
	height: 40
};

export default Category;
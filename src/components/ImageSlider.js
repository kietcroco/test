import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

class ImageSlider extends React.PureComponent {

	static displayName = "@ImageSlider";

	static propTypes = {
		sliderWidth: React.PropTypes.number,
		sliderHeight: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),
		autoplay: React.PropTypes.bool,
		autoplayDelay: React.PropTypes.number,
		autoplayInterval: React.PropTypes.number,
		source: React.PropTypes.arrayOf( React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object,
			React.PropTypes.number
		]) ).isRequired
	};

	static defaultProps = {
		sliderHeight: 160,
		autoplay: true,
		autoplayDelay: 500,
		autoplayInterval: 2500
	};
	constructor( props ) {
		super( props );

		this.state = {
			index: 0
		};

		this._timeoutAutoPlay = null;
		this._onScrollViewScroll = this._onScrollViewScroll.bind(this);
	}

	_restartAutoplay() {

		if( this._timeoutAutoPlay ) {
			clearTimeout( this._timeoutAutoPlay );
			this._timeoutAutoPlay = null;
		}

		this._timeoutAutoPlay = setTimeout( () => this.refs.carousel.startAutoplay(true), 1000 );
	}

	// _onSnapToItem( index: Number = 0 ) {

	// 	// this.setState({
	// 	// 	index
	// 	// });
	// }

	// _onThumbnailPress( index: Number = 0 ) {

	// 	this.refs.carousel.snapToItem(index);
	// 	this.refs.carousel.stopAutoplay();
	// 	this._restartAutoplay();
	// }

	_onScrollViewScroll() {

		this.setState({
			index: this.refs.carousel.currentIndex
		});
	}

	_renderEntry( entries: Array = [] ) {

		return entries.map( (source, index) => {

			if( typeof source === "string" ) {

				source = {uri: source};
			}

			return (
				<TouchableOpacity activeOpacity={1} key={`entry-${index}`} style={ _styles.entry }>
					<Image style={ _styles.illustration } source={ source }/>
				</TouchableOpacity>
			);
		} );
	}

	render() {

		const {
			sliderWidth = Dimensions.get('window').width,
			sliderHeight,
			autoplay,
			autoplayDelay,
			autoplayInterval,
			source
		} = this.props;

		const containerStyle = {
			width: sliderWidth,
			height: sliderHeight,
			position: "relative"
		};

		return (
			<View style={ containerStyle }>
				
				<Carousel
					ref 							= "carousel"
					sliderWidth 					= { sliderWidth }
					itemWidth 						= { sliderWidth }
					slideStyle 						= { {width: sliderWidth}}
					inactiveSlideScale 				= { 1 }
					inactiveSlideOpacity 			= { 1 }
					activeSlideOffset 				= { 0 }
					enableMomentum 					= { true }
					autoplay 						= { autoplay }
					autoplayDelay 					= { autoplayDelay }
					autoplayInterval 				= { autoplayInterval }
					showsHorizontalScrollIndicator 	= { false }
					snapOnAndroid 					= { true }
					removeClippedSubviews 			= { true }
					containerCustomStyle 			= { containerStyle }
					//contentContainerCustomStyle 	= { containerStyle }
					//onSnapToItem 					= { this._onSnapToItem }
					onScrollViewScroll 				= { this._onScrollViewScroll }
				>
					{
						this._renderEntry( source )
					}
				</Carousel>
				
				<View style={ _styles.thumbnailContainer }>
					
				</View>
			</View>
		);
	}
}

const _styles = {
	entry: {
		flex: 1
	},
	illustration: {
		flex: 1
	},
	thumbnailContainer: {
		position: "absolute",
		backgroundColor: "red",
		left: 0,
		right: 0,
		bottom: 10,
		height: 20
	}
};

export default ImageSlider;
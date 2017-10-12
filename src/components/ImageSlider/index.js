import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Image, Dimensions, ScrollView, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sizes, colors, scale, hitSlop, fontSizes } from '~/configs/styles';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import shallowEqual from 'fbjs/lib/shallowEqual';

import Gallery from 'image-gallery';

class ImageSlider extends React.Component {

	static displayName = "@ImageSlider";

	static propTypes = {
		sliderWidth: PropTypes.number, // chiều rộng slider
		sliderHeight: PropTypes.oneOfType([ // chiều cao slider
			PropTypes.number,
			PropTypes.string
		]),
		autoplay: PropTypes.bool, // tự động play
		autoplayDelay: PropTypes.number, // thời gian delay
		autoplayInterval: PropTypes.number, // thời gian chuyển slide
		initItem: PropTypes.number, // phần tử đầu tiên
		source: PropTypes.arrayOf( PropTypes.shape({
			caption: PropTypes.string, // tiêu đề
			source: PropTypes.oneOfType([
				PropTypes.string, // đường dẫn link
				PropTypes.object, // source
				PropTypes.number // required
			]).isRequired
		}) ).isRequired,
		activeItem: PropTypes.number // phần tử đang hiển thị
	};

	static defaultProps = {
		sliderHeight: 160 * scale,
		autoplay: true,
		autoplayDelay: 500,
		autoplayInterval: 2500,
		initItem: 0,
		activeItem: 0,
		source: []
	};

	constructor( props ) {
		super( props );

		this.state = {
			index: props.activeItem !== undefined ? props.activeItem : props.initItem,
			source: props.source,
			modalVisible: false,
			autoplay: false
		};

		this._closeHandle = this._closeHandle.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.activeItem !== nextProps.activeItem && nextProps.activeItem !== this.state.index ) {

			this.snapToItem( nextProps.activeItem );
		}

		if( this.props.source != nextProps.source && this.state.source != nextProps.source ) {

			this.setState({
				source: nextProps.source
			});
		}

		if( this.props.autoplay !== nextProps.autoplay ) {

			if( nextProps.autoplay ) {
				this.play();
			} else {
				this.pause();
			}
		}
	}

	get currentIndex() {

		return this.carousel.currentIndex;
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.index !== nextState.index ||
			this.state.modalVisible !== nextState.modalVisible ||
			this.state.autoplay !== nextState.autoplay ||
			this.state.source !== nextState.source ||
			!shallowEqual( this.props, nextProps )
		);
	}

	snapToItem( index: Number = 0 ) {

		//let autoplay = this.state.autoplay;

		//this._clearTime();
		this.carousel.snapToItem(index);
		//this.props.autoplay && autoplay && this.play();
	}

	validIndex(index: Number) {
		
		index = Math.min(this.state.source.length - 1, index);
		index = Math.max(0, index);
		return index;
	}

	next() {

		let nextPage = this.state.index + 1;
		if( this.validIndex( nextPage ) < nextPage ) {
			nextPage = 0;
		}

		this.snapToItem( nextPage );
	}

	previous() {

		let prevPage = this.state.index - 1;
		if( this.validIndex( prevPage ) > prevPage ) {

			prevPage = this.state.source.length;
		}
		this.snapToItem(prevPage);
	}

	pause() {

		this._clearTime();
		this.state.autoplay && this.setState({
			autoplay: false
		});
		//this.carousel.stopAutoplay();
	}

	play() {

		this._setTime();
		!this.state.autoplay && this.setState({
			autoplay: true
		});

		//this.carousel.startAutoplay( true );
	}

	_clearTime() {

		if( this._autoplayTimeOut ) {
			clearTimeout( this._autoplayTimeOut );
			this._autoplayTimeOut = undefined;
		}
		if( this._autoplayInterval ) {
			clearInterval( this._autoplayInterval );
			this._autoplayInterval = undefined;
		}
	}

	_setTime() {

		if( this._autoplayInterval ) {
			clearInterval( this._autoplayInterval );
			this._autoplayInterval = undefined;
		}
		this._autoplayInterval = setInterval( () => this.next(), this.props.autoplayInterval );
	}

	_onScrollViewScroll() {

		let autoplay = this.state.autoplay;

		this._clearTime();
		autoplay && this._setTime();

		this.state.index !== this.carousel.currentIndex && this.setState({
			index: this.carousel.currentIndex
		});
	}

	// onSnapToItem() {

	// 	let autoplay = this.state.autoplay;

	// 	this._clearTime();
	// 	this.props.autoplay && autoplay && this.play();

	// 	this.state.index !== this.carousel.currentIndex && this.setState({
	// 		index: this.carousel.currentIndex
	// 	});
	// }

	_closeHandle() {
		
		this.gallery.pause();
		this.gallery.resetHistoryImageTransform();
		const currentIndex = this.gallery.currentIndex;

		this.state.autoplay && this._setTime();

		this.setState({
			modalVisible: false
		});

		if( currentIndex !== this.state.index ) {

			this.snapToItem(currentIndex);
		}
	}

	_renderBullets( length: Number = 0 ) {

		const bullets = [];
		for( let i = 0; i < length; i++ ) {

			bullets.push(
				<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } onPress={ () => this.snapToItem( i ) } style={ i === this.state.index ? [_styles.bullets, {
					backgroundColor: colors.primaryColor
				}] : _styles.bullets } key={`bullets-${i}`}>
				</TouchableOpacity>
			);
		}

		return bullets;
	}

	_renderEntry( entries: Array = [] ) {

		return entries.map( ({source, caption}, index) => {

			if( typeof source === "string" ) {

				source = { uri: source };
			}
			
			return (
				<TouchableOpacity onPress={ () => {

					this.setState({
						modalVisible: true
					});
					//this.carousel.stopAutoplay();
					this._clearTime();
					setTimeout( () => {

						//this.gallery.setItem( index );
						if( this.state.autoplay ) {

							this.gallery.play();
						} else {
							
							this.gallery.pause();
						}
					} );
				} } activeOpacity={1} key={`entry-${index}`} style={ _styles.entry }>
					<Image onLoadStart={ () => {

						if( !this.state.source[ index ] ) {
				
							const newSource = this.state.source.slice();
							newSource[index] = {
								caption,
								source: require("~/assets/images/no-photo-available.png")
							};

							this.setState({
								source: newSource
							});
						}
					} } onError={ () => {
						const newSource = this.state.source.slice();
						//newSource.splice(index, 1);
						newSource[index] = {
							caption,
							source: require("~/assets/images/no-photo-available.png")
						};

						this.setState({
							source: newSource
						});
					} } style={ _styles.illustration } source={ source }/>
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
			initItem,
			//source
		} = this.props;

		const containerStyle = {
			width: sliderWidth,
			height: sliderHeight,
			position: "relative"
		};

		if( !this.state.source.length ) return null;

		return (
			<View style={ containerStyle }>
				
				<Carousel
					ref 							= { ref => { this.carousel = ref; } }
					sliderWidth 					= { sliderWidth }
					itemWidth 						= { sliderWidth }
					slideStyle 						= { {width: sliderWidth}}
					inactiveSlideScale 				= { 1 }
					inactiveSlideOpacity 			= { 1 }
					activeSlideOffset 				= { 0 }
					firstItem 						= { initItem }
					enableMomentum 					= { true }
					autoplay 						= { false }
					autoplayDelay 					= { autoplayDelay }
					autoplayInterval 				= { autoplayInterval }
					showsHorizontalScrollIndicator 	= { false }
					snapOnAndroid 					= { true }
					removeClippedSubviews 			= { true }
					containerCustomStyle 			= { containerStyle }
					//contentContainerCustomStyle 	= { containerStyle }
					//onSnapToItem 					= { this.onSnapToItem.bind(this) }
					onScroll 		 				= { this._onScrollViewScroll.bind(this) }
				>
					{
						this._renderEntry( this.state.source )
					}
				</Carousel>
				
				<ScrollView 
					style 							= { _styles.bulletsContainer }
					contentContainerStyle 			= { _styles.bulletsContainerContent }
					showsHorizontalScrollIndicator 	= { false }
					showsVerticalScrollIndicator 	= { false }
					horizontal 						= { true }
					directionalLockEnabled 			= { true }
				>
					{
						this._renderBullets( this.state.source.length )
					}
				</ScrollView>
				<Modal
					animationType 		= "fade"
					transparent 		= { true }
					visible 			= { this.state.modalVisible }
					onRequestClose 		= { this._closeHandle }
				>
					<View style={ _styles.zoomWrapper }>
						<Gallery
							source 			= { this.state.source }
							closeHandle 	= { this._closeHandle }
							hitSlop 		= { hitSlop }
							autoplay 		= { false }
							navigation 		= { true }
							buttonStyle 	= { _styles.buttonStyle }
							iconStyle 		= { _styles.iconStyle }
							titleStyle 		= { _styles.titleStyle }
							pagination 		= {true}
							paginationStyle = { _styles.paginationStyle }
							//imageStyle 		= {{}}
							navigationStyle = { _styles.navigationStyle }
							headStyle 		= { _styles.headStyle }
							autoplayDelay 	= { autoplayDelay }
							autoplayInterval= { autoplayInterval }
							initItem 		= { this.state.index }
							//onItemSelected 	= { () => {} }
							ref 			= { ref => { this.gallery = ref; } }
							onPlay 			= { () => !this.state.autoplay && this.setState({
								autoplay: true
							}) }
							onPause 		= { () => this.state.autoplay && this.setState({
								autoplay: false
							}) }
						/>
					</View>
				</Modal>
			</View>
		);
	}

	componentDidMount() {

		if( !this._autoplayTimeOut && this.props.autoplay && this.state.source.length > 1 ) {

			this.setState({
				autoplay: true
			});
			this._autoplayTimeOut = setTimeout( () => this.play(), this.props.autoplayDelay );
		}
	}

	componentWillUnmount() {
		
		this._clearTime();
		//this.carousel.stopAutoplay();
	}
}

const _styles = {
	entry: {
		flex: 1,
		position: "relative",
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: colors.secondBackgroundColor
	},
	illustration: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		//resizeMode: "contain"
		resizeMode: "cover"
	},
	bulletsContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 10 * scale
	},
	bulletsContainerContent: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	bullets: {
		width: 10 * scale,
		height: 10 * scale,
		borderRadius: 5 * scale,
		backgroundColor: colors.primaryBackgroundColor,
		marginLeft: 1 * scale,
		marginRight: 1 * scale
	},
	zoomWrapper: {
		flex: 1,
		position: "relative"
	},
	buttonStyle: {
		width: sizes.buttonNormal,
		height: sizes.buttonNormal,
		borderRadius: sizes.buttonNormal / 2,
		borderWidth: sizes.borderWidth,
		borderColor: colors.secondBorderColor
	},
	iconStyle: {
		fontSize: fontSizes.small,
		color: colors.secondColor
	},
	titleStyle: {
		fontSize: fontSizes.small,
		color: colors.secondColor
	},
	paginationStyle: {
		fontSize: fontSizes.small,
		color: colors.secondColor,
		fontWeight: "bold"
	},
	navigationStyle: {
		backgroundColor: colors.overlayColor
	},
	headStyle: {
		backgroundColor: colors.overlayColor
	}
};

export default ImageSlider;
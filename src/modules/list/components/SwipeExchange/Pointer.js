"use strict";
import React from 'react';
import { View, PanResponder, Animated } from 'react-native';
import Icon from './Icon';
import clamp from '~/utilities/clamp';

class Pointer extends React.Component {

	static displayName = '@swipe-exchange-pointer';

	static propTypes = {
		width: React.PropTypes.number.isRequired, // chiều dài swipe
		height: React.PropTypes.number.isRequired, // chiều cao swipe
		children: React.PropTypes.oneOf(['roads', 'rivers', 'seas']), // tên sàn
		onChange: React.PropTypes.func.isRequired // sự kiện change
	};

	static defaultProps = {
		children: "rivers"
	};

	constructor( props ) {
		super( props );

		this.state = {
			focus: false,
			land: props.children
		};

		this._panResponder = null;
		this._distance = ((props.width/2) - (props.height/2));

		const x = this.state.land === "roads" ? -this._distance : ( this.state.land === "seas" ? this._distance : 0 );

		this._panState = {
			animX: new Animated.Value( x ),
			dx: x
		};
	}

	componentWillReceiveProps(nextProps) {

		// nếu có thay đổi sàn
		if( this.props.children !== nextProps.children && nextProps.children !== this.state.land ) {

			this.setState({
				land: nextProps.children,
				focus: false
			});

			this._snap( nextProps.children );
		}

		// nếu thay đổi độ dài
		if( this.props.width !== nextProps.width || this.props.height !== nextProps.height ) {

			this._distance = ((nextProps.width/2) - (nextProps.height/2));
			this._snap( this.state.land );
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.focus !== nextState.focus ||
			this.state.land !== nextState.land ||
			this.props.width !== nextProps.width ||
			this.props.height !== nextProps.height ||
			this.props.children !== nextProps.children
			//this.props.onChange != nextProps.onChange
		);
	}

	_translateX( x: Number = 0 ) {

		// set vị trí pointer
		this.refs.pointer.setNativeProps({style: {transform: [{translateX: x}]}});
	}

	/**
	 * @todo: Hàm snap pointer vào vị trí sàn
	 * @author: Croco
	 * @since: 5-4-2017
	 * @param: land: tên sàn
	*/
	_snap( land: String = "rivers" ) {

		// tính x theo sàn
		const x = land === "roads" ? -this._distance : ( land === "seas" ? this._distance : 0 );

		// set lại vị trí
		x !== this._panState.animX._value && this._panState.animX.setValue(x);

		// gán dx
		this._panState.dx = this._panState.animX._value;

		this.state.focus && this.setState({
			focus: false
		});

		// trigger change
		if( land !== this.props.children && this.props.onChange ) {

			this.props.onChange( land );
		}
	}

	componentWillMount() {

		// khởi tạo các handle swipe
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => { // touch start

				!this.state.focus && this.setState({
					focus: true
				});
			},
			onPanResponderMove: (e, {dx}) => { // touch move

				let x = clamp(
					( this._panState.dx + dx ),
					-this._distance,
					this._distance	
				);

				x != this._panState.animX._value && this._panState.animX.setValue( x );
			},
			onPanResponderRelease: () => this._snap( this.state.land ), // touch end
			onResponderReject: () => this._snap( this.state.land ), // touch cancel
			onPanResponderTerminate: () => this._snap( this.state.land ),
			onShouldBlockNativeResponder: () => true
		});
	}

	componentDidMount() {

		// sự kiện anim change set lại vị trí 3 box
		this._panState.animX.addListener( ({value}) => {
			
			this._translateX( value );
			let x = this._distance / 2;

			// nếu duy chuyển qua roads và sàn hiện tại không phải roads
			if( this.state.land !== "roads" && value < -x ) {

				this.setState({
					land: "roads"
				});
			}else if( this.state.land !== "seas" && value > x ) { // nếu duy chuyển qua seas và sàn hiện tại không phải seas

				this.setState({
					land: "seas"
				});
			} else if( this.state.land !== "rivers" && value >= -x && value <= x ) {

				this.setState({
					land: "rivers"
				});
			}
		});
	}

	render() {

		return (
			<View
				{ ...this._panResponder.panHandlers }
				ref 	= "pointer"
				style 	= {[_style, {
					width: this.props.height,
					height: this.props.height,
					borderRadius: this.props.height / 2,
					transform: [{translateX: this._panState.animX._value}]
				}]}
			>
				<Icon
					active 	= { true }
					focus 	= { this.state.focus }
					size 	= { this.props.height }
				>{ this.state.land }</Icon>
			</View>
		);
	}

	componentWillUnmount() {

		delete this._panResponder;
		delete this._distance;
		this._panState.animX.removeAllListeners();
		this._panState.animX.stopAnimation();
		delete this._panState;
	}
}

const _style = {
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	zIndex: 2
};

export default Pointer;
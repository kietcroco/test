"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import line from './line.png';
import Icon from './Icon';
import Pointer from './Pointer';
import { scale, hitSlop } from '~/configs/styles';

class SwipeExchange extends React.Component {

	static displayName = '@SwipeExchange';

	static propTypes = {
		//style: PropTypes.object,
		children: PropTypes.oneOf(['roads', 'rivers', 'seas']), // tên sàn đang active
		onChange: PropTypes.func // event change
	};

	static defaultProps = {
		children: "rivers"
	};

	constructor( props ) {
		super( props );

		this.state = {
			land: props.children,
			//measured: false
		};

		// width = undefined;
		// height = undefined;
		this._onChange = this._onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		// nếu thay đổi sàn
		if( nextProps.children !== this.state.land ) {

			this.setState({
				land: nextProps.children
			});
		}

		// nếu thay đổi style thì tính khung swipe
		// if( this.props.style != nextProps.style ) {

		// 	this.setState({
		// 		measured: false
		// 	});
		// }
	}

	_onChange( land: String = "rivers" ) {

		 if( land !== this.state.land ) {

		 	this.setState({
				land
			}, () => {

				this.props.onChange && this.props.onChange( land );
			});
		 }
	}

	/**
	 * @todo: Hàm tính khung swipe
	 * @author: Croco
	 * @since: 5-4-2017
	*/
	// _measure() {
	// 	!this.state.measured && requestAnimationFrame( () => this.refs.container && this.refs.container.measure( (ox, oy, width = 320, height = 40, px, py) => {

	// 		width = width;
	// 		height = height;

	// 		this.setState({measured: true});
	// 	} ) );
	// }

	render() {

		const xScale = 0.85;
		const pointX = ( (width/2) - (height/2) ) / xScale;

		return (
			<Image
				ref 	= "container"
				style 	= { _style }
				source 	= { line }
			>
				<TouchableOpacity hitSlop={ hitSlop } onPress={ () => this._onChange('roads') } activeOpacity={0.6} style={{
					transform: [
						{scale: xScale},
						{translateX: -pointX}
					],
					width: height,
					height: height,
					borderRadius: height / 2,
					position: "absolute"
				}}>
					<Icon size={ height } visibility={ this.state.land !== "roads" }>roads</Icon>
				</TouchableOpacity>

				<TouchableOpacity hitSlop={ hitSlop } onPress={ () => this._onChange('rivers') } activeOpacity={0.6} style={{
					transform: [
						{scale: xScale}
					],
					width: height,
					height: height,
					borderRadius: height / 2,
					position: "absolute"
				}}>
					<Icon size={ height } visibility={ this.state.land !== "rivers" }>rivers</Icon>
				</TouchableOpacity>

				<TouchableOpacity hitSlop={ hitSlop } onPress={ () => this._onChange('seas') } activeOpacity={0.6} style={{
					transform: [
						{scale: xScale},
						{translateX: pointX}
					],
					width: height,
					height: height,
					borderRadius: height / 2,
					position: "absolute"
				}}>
					<Icon size={ height } visibility={ this.state.land !== "seas" }>seas</Icon>
				</TouchableOpacity>
				
				<Pointer width={ width } height={ height } onChange={ this._onChange }>{ this.state.land }</Pointer>
			</Image>
		);
	}

	// componentDidUpdate() {

	// 	this._measure();
	// }

	// componentDidMount() {

	// 	// tính độ dài
	// 	this._measure();
	// }
}

const width = Math.min( 320 * scale, Dimensions.get('window').width );
const height = 35 * scale;

const _style = {
	width,
	height,
	resizeMode: "cover",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "transparent"
};

export default SwipeExchange;
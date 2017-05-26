"use strict";
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import mergeStyle from '~/utilities/mergeStyle';
import line from './icons/line.png';
import Pointer from './Pointer';
import Icon from './Icon';

class SwipeExchange extends React.PureComponent {

	static displayName = '@swipe-exchange';

	static propTypes = {
		style: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		children: React.PropTypes.oneOf(['roads', 'rivers', 'seas']), // tên sàn đang active
		onChange: React.PropTypes.func // event change
	};

	static defaultProps = {
		children: "rivers"
	};

	constructor( props ) {
		super( props );

		this.state = {
			land: props.children,
			measured: false
		};

		this._width = undefined;
		this._height = undefined;
	}

	componentWillReceiveProps(nextProps) {

		// nếu thay đổi sàn
		if( nextProps.children !== this.state.land ) {

			this.setState({
				land: nextProps.children
			});
		}

		// nếu thay đổi style thì tính khung swipe
		if( this.props.style != nextProps.style ) {

			this.setState({
				measured: false
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.land !== nextState.land ||
			this.state.measured !== nextState.measured ||
			this.props.children !== nextProps.children ||
			!shallowEqualImmutable( this.props, nextProps )
		);
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
	_measure() {
		!this.state.measured && requestAnimationFrame( () => this.refs.container.measure( (ox, oy, width = 320, height = 40, px, py) => {

			this._width = width;
			this._height = height;

			this.setState({measured: true});
		} ) );
	}

	render() {

		const { style, children, onChange, ...otherProps } = this.props;

		if( !this.state.measured ) {

			return (
				<Image
					{ ...otherProps }
					ref 	= "container"
					style 	= { [ {
							width: 320,
							height: 40
						}, (Array.isArray(style) ? mergeStyle(style) : style), _style ] }
					source 	= { line }
				/>
			);
		}

		const scale = 0.6;
		const pointX = ( (this._width/2) - (this._height/2) ) / scale;

		return (
			<Image
				{ ...otherProps }
				ref 	= "container"
				style 	= { [ {
						width: this._width,
						height: this._height
					}, (Array.isArray(style) ? mergeStyle(style) : style), _style ] }
				source 	= { line }
			>

				<TouchableOpacity onPress={ () => this._onChange('roads') } activeOpacity={0.6} style={{
					transform: [
						{scale: scale},
						{translateX: -pointX}
					],
					width: this._height,
					height: this._height,
					borderRadius: this._height / 2,
					position: "absolute"
				}}>
					<Icon size={this._height} visibility={ this.state.land !== "roads" }>roads</Icon>
				</TouchableOpacity>

				<TouchableOpacity onPress={ () => this._onChange('rivers') } activeOpacity={0.6} style={{
					transform: [
						{scale: scale}
					],
					width: this._height,
					height: this._height,
					borderRadius: this._height / 2,
					position: "absolute"
				}}>
					<Icon size={this._height} visibility={ this.state.land !== "rivers" }>rivers</Icon>
				</TouchableOpacity>

				<TouchableOpacity onPress={ () => this._onChange('seas') } activeOpacity={0.6} style={{
					transform: [
						{scale: scale},
						{translateX: pointX}
					],
					width: this._height,
					height: this._height,
					borderRadius: this._height / 2,
					position: "absolute"
				}}>
					<Icon size={this._height} visibility={ this.state.land !== "seas" }>seas</Icon>
				</TouchableOpacity>

				<Pointer width={ this._width } height={ this._height } onChange={ this._onChange.bind(this) }>{ this.state.land }</Pointer>
			</Image>
		);
	}

	componentDidUpdate() {

		this._measure();
	}

	componentDidMount() {

		// tính độ dài
		this._measure();
	}
}

const _style = {
	resizeMode: "contain",
	justifyContent: "center",
	alignItems: "center"
};

export default SwipeExchange;
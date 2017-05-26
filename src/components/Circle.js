/**
 * @flow
*/
"use strict";
import React from 'react';
import { View } from 'react-native';
import mergeStyle from '~/utilities/mergeStyle';

class Circle extends React.PureComponent {

	static displayName = "@circle";

	static propTypes = {
		size: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),
		onLayout: React.PropTypes.func,
		style: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		children: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf( React.PropTypes.element )
		])
	};

	constructor( props ) {
		super( props );

		this.state = {
			circleStyle: undefined,
			size: props.size
		};
	}

	componentWillReceiveProps(nextProps) {

		if( 
			this.props.size !== nextProps.size && 
			nextProps.size !== this.state.size
		) {

			this.setState({
				size: nextProps.size
			});
		}

		if( 
			this.props.style != nextProps.style || 
			this.props.children != nextProps.children
		) {

			this.setState({
				size: "auto"
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.size !== nextState.size ||
			this.state.circleStyle != nextState.circleStyle ||
			this.props.size !== nextProps.size ||
			this.props.style != nextProps.style ||
			this.props.children != nextProps.children
		);
	}

	_getStyle( size: Number = 1 ) {

		return {
			width: size,
			height: size,
			borderRadius: (size*1) / 2,
			alignItems: 'center',
			justifyContent: 'center'
		};
	}

	render() {

		const { children, style, onLayout } = this.props;

		const natureStyle = Array.isArray(style) ? mergeStyle(style): style;
		let _computeSize, _style;

		// nếu là auto
		if( !this.state.size || this.state.size == "auto" ) {

			_computeSize = e => {
				const _size = (e.nativeEvent.layout.width + e.nativeEvent.layout.height) / 2;
				const _callBack = onLayout ? onLayout(e) : undefined;

				this.setState({
					circleStyle: this._getStyle( _size ),
					size: _size
				}, _callBack);
			};

			_style = [ natureStyle, this.state.circleStyle ];
		} else {

			_computeSize = onLayout;
			_style = [ natureStyle, this._getStyle( this.state.size ) ];
		}

		return (
			<View 
				style 			=	{ _style }
				onLayout 		=	{ _computeSize }
			>{ children }</View>
		);
	}
}

export default Circle;
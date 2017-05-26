import React from 'react';
import { Image } from 'react-native';
import icons from '~/assets/icons/izifix';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class IzifixIcon extends React.PureComponent {

	static displayName = '@IzifixIcon';

	static propTypes = {
		style: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		name: React.PropTypes.string,
		color: React.PropTypes.string,
		size: React.PropTypes.number
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.name !== nextProps.name ||
			this.props.color !== nextProps.color ||
			this.props.size !== nextProps.size ||
			this.props.style != nextProps.style
		);
	}

	render() {

		const { name, color, size, style } = this.props;
		const sizeCss = size && {
			width: size,
			height: size
		};
		const iconName = color === "white" ? `${name}_white` : name;

		if( icons[ iconName ] === undefined ){

			return (
				<FAIcon name={ name } size={ size } color={color} style={style}/>
			);
		}

		return (
			<Image source={ icons[ iconName ] } style={ [_style, style, sizeCss] }/>
		);
	}
}

const _style = {
	resizeMode: "contain",
};
export default IzifixIcon;
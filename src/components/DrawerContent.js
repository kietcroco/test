/**
 * @flow
*/
import React from 'react';
import { View, Text, Image } from 'react-native';
import defaultAvatar from '~/assets/images/user.png';

class DrawerContent extends React.PureComponent {

	static displayName = "@DrawerContent";

	static propTypes = {
		navigation: React.PropTypes.shape({
			dispatch: React.PropTypes.func.isRequired,
			goBack: React.PropTypes.func,
			navigate: React.PropTypes.func,
			setParams: React.PropTypes.func,
			state: React.PropTypes.shape({
				index: React.PropTypes.number.isRequired,
				routes: React.PropTypes.arrayOf( React.PropTypes.shape({
					index: React.PropTypes.number,
					key: React.PropTypes.string.isRequired,
					routeName: React.PropTypes.string.isRequired
				}) )
			}).isRequired,
		}).isRequired,
		router: React.PropTypes.shape({
			getActionForPathAndParams: React.PropTypes.func,
			getComponentForRouteName: React.PropTypes.func.isRequired,
			getComponentForState: React.PropTypes.func,
			getPathAndParamsForState: React.PropTypes.func,
			getScreenOptions: React.PropTypes.func,
			getStateForAction: React.PropTypes.func
		}).isRequired
	};

	render() {

		return (
			<View style={ _styles.container }>
				<View style={ _styles.header }>
					
					<View style={ _styles.info }>
						<View style={ _styles.avatarWrapper  }>
							<Image style={ _styles.avatar } source={ defaultAvatar }/>
						</View>
						<Text style={ _styles.name }>Nguyễn Văn Minh</Text>
					</View>
				</View>
			</View>
		);
	}
}

const _styles = {
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	header: {
		backgroundColor: "#2673bb",
		height: 120,
		flexDirection: "row"
	},
	info: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center"
	},
	avatarWrapper: {
		width: 60,
		height: 60,
		borderRadius: 30,
		padding: 2,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center"
	},
	avatar: {
		resizeMode: "contain",
		width: 45,
		height: 45,
		borderRadius: 22.5,
		justifyContent: "center",
		alignItems: "center"
	},
	name: {
		color: "white",
		fontWeight: "bold",
		fontSize: 15,
		textAlignVertical: "center",
		alignItems: "center"
	}
};

export default DrawerContent;
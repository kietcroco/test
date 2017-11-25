import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import Banner from '~/components/Banner';
import VehicleOpenForm from '../components/VehicleOpenForm';
import vehicleOpenService from '~/services/seas/vehicleOpen';
import _styles from '../assets/handleStyles';
import alertUtil from '~/utilities/alert';

class VehicleOpen extends React.Component {

	static displayName = '@VehicleOpenHandle';

	constructor(props) {
		super(props);

		this.state = {
			source: {},
			loading: true
		};

		this._onSubmit = this._onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.token !== nextProps.token) {

			this._loadSource();
		}
	}

	async _add(data: Object = {}) {

		!this.state.loading && this.setState({
			loading: true
		});

		try {
			const res = await vehicleOpenService.add(data);
			this.state.loading && this.setState({
				loading: false
			});

			if (res.status === 200 && res.data) {

				// nếu thành công
				if (res.data.STATUS === "OK" || res.data.STATUS === "NONAUTHORITATIVE" && res.data.data) {

					// nếu có account
					if (res.data.data.account) {

						// thông báo
						alertUtil({
							title: res.data.messageTitle || translate("#$seas$#Thông báo"),
							message: res.data.message || translate("#$seas$#Đăng tin thành công")
						});

						// nếu đã active
						if (res.data.data.account.status) {

							// dispatch reducer
							this.props.dispatch({
								type: "/seas/list#newOffers",
								payload: {
									data: res.data.data
								}
							});

							// qua trang chi tiết
							return this.props.navigation.replace("/seas/detail/vehicle-open", {
								source: res.data.data,
								id: res.data.data.id || res.data.data.vehicle_open_seas_id
							});
						}

						// nếu chưa active và có mobile chuyển qua trang active
						if (!res.data.data.account.status && res.data.data.account.account_mobile) {

							return this.props.navigation.replace("/member/active", {
								account_mobile: res.data.data.account.account_mobile
							});
						}
					}
				}
			}

			// thông báo
			return alertUtil({
				title: res.data.messageTitle || translate("#$seas$#Thông báo"),
				message: res.data.message || translate("#$seas$#Đăng tin không thành công")
			});

		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Đăng tin không thành công")
			});
		}

		this.state.loading && this.setState({
			loading: false
		});
	}

	async _update(id, data: Object = {}) {

		!this.state.loading && this.setState({
			loading: true
		});

		try {

			const res = await vehicleOpenService.update(id, data);

			this.state.loading && this.setState({
				loading: false
			});

			if (res.status === 200 && res.data) {

				// nếu thành công
				if (res.data.STATUS === "OK" || res.data.STATUS === "NONAUTHORITATIVE" && res.data.data) {

					// nếu có account
					if (res.data.data.account) {

						// thông báo
						alertUtil({
							title: res.data.messageTitle || translate("#$seas$#Thông báo"),
							message: res.data.message || translate("#$seas$#Sửa tin thành công")
						});

						// nếu đã active
						if (res.data.data.account.status) {

							// dispatch reducer
							this.props.dispatch({
								type: "/seas/list#update",
								payload: {
									data: res.data.data
								}
							});

							// qua trang chi tiết
							return this.props.navigation.replace("/seas/detail/vehicle-open", {
								source: res.data.data,
								id: res.data.data.id || res.data.data.vehicle_open_seas_id
							}, 2);
						}

						// nếu chưa active và có mobile chuyển qua trang active
						if (!res.data.data.account.status && res.data.data.account.account_mobile) {

							return this.props.navigation.replace("/member/active", {
								account_mobile: res.data.data.account.account_mobile
							});
						}
					}
				}
			}

			// thông báo
			return alertUtil({
				title: res.data.messageTitle || translate("#$seas$#Thông báo"),
				message: res.data.message || translate("#$seas$#Sửa tin không thành công")
			});
		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Sửa tin không thành công")
			});
		}

		this.state.loading && this.setState({
			loading: false
		});
	};

	_onSubmit(data: Object = {}) {

		const {
			params: {
				id
			} = {}
		} = this.props.navigation.state || {};
		if (id) {

			return this._update(id, data);
		}

		return this._add(data);
	}


	async _loadSource() {

		!this.state.loading && this.setState({
			loading: true
		});

		try {

			const {
				params: {
					id
				} = {}
			} = this.props.navigation.state || {};

			const res = await vehicleOpenService.handle(id);

			this.state.loading && this.setState({
				loading: false
			});

			if (res.status === 200 && res.data) {

				if (res.data.STATUS === "OK" || res.data.STATUS === "NONAUTHORITATIVE") {

					return this.setState({
						source: res.data.data || {},
						loading: false
					});
				}
			}

			return alertUtil({
				title: res.data.messageTitle || translate("#$seas$#Lỗi"),
				message: res.data.message || translate("#$seas$#Kết nối không thành công"),
				actions: [
					{
						text: 'OK',
						onPress: () => this.props.navigation.goBack(),
						style: 'cancel'
					}
				]
			});

		} catch (e) {

			alertUtil({
				title: translate("#$seas$#Lỗi"),
				message: translate("#$seas$#Kết nối không thành công"),
				actions: [
					{
						text: 'OK',
						onPress: () => this.props.navigation.goBack(),
						style: 'cancel'
					}
				]
			});
		}

		// this.state.loading && this.setState({
		// 	loading: false
		// });

		this.props.navigation.goBack();
	}

	render() {

		const {
				params: {
					id: isUpdate
				} = {}
			} = this.props.navigation.state || {};

		return (
			<ScrollView
				style={_styles.wrapper}
				horizontal={false}
				keyboardDismissMode="interactive"
				keyboardShouldPersistTaps="always"
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={_styles.container}
			>
				<Banner exchange="seas">{translate("#$seas$#Chào tàu")}</Banner>
				<Text style={_styles.title}>{translate("#$seas$#Mời bạn đăng tin")}</Text>
				<VehicleOpenForm
					source={this.state.source}
					onSubmit={this._onSubmit}
					loading={this.state.loading}
					isUpdate={!!isUpdate}
				/>
			</ScrollView>
		);
	}

	componentDidMount() {

		this._loadSource();
	}
}

export default VehicleOpen;
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { translate } from '~/utilities/language';
import Banner from '~/components/Banner';
import BiddingForm from '../components/BiddingForm';
import BiddingService from '~/services/rivers/bidding';
import _styles from '../assets/handleStyles';
import Registry from '~/library/Registry';
import alertUtil from '~/utilities/alert';

class Bidding extends React.Component {

	static displayName = '@BiddingHandle';

	constructor(props) {
		super(props);

		this.state = {
			source: {},
			loading: true
		};

		this._onSubmit = this._onSubmit.bind(this);
		this._loadSource = this._loadSource.bind(this);
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

			const res = await BiddingService.add(data);

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
							message: res.data.message || translate("Đăng tin thành công"),
							title: res.data.messageTitle || translate("Thông báo")
						});

						// nếu đã active
						if (res.data.data.account.status) {

							// dispatch reducer
							this.props.dispatch({
								type: "/rivers/list#newOffers",
								payload: {
									data: res.data.data
								}
							});

							// qua trang chi tiết
							return this.props.navigation.replace("/rivers/detail/bidding", {
								source: res.data.data,
								id: res.data.data.id || res.data.data.bidding_rivers_id
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
				title: res.data.messageTitle || translate("Thông báo"),
				message: res.data.message || translate("Đăng tin không thành công")
			});

		} catch (e) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Đăng tin không thành công")
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

			const res = await BiddingService.update(id, data);

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
							title: res.data.messageTitle || translate("Thông báo"),
							message: res.data.message || translate("Sửa tin thành công")
						});

						// nếu đã active
						if (res.data.data.account.status) {

							// dispatch reducer
							this.props.dispatch({
								type: "/rivers/list#update",
								payload: {
									data: res.data.data
								}
							});

							// qua trang chi tiết
							return this.props.navigation.replace("/rivers/detail/bidding", {
								source: res.data.data,
								id: res.data.data.id || res.data.data.bidding_rivers_id
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
				title: res.data.messageTitle || translate("Thông báo"),
				message: res.data.message || translate("Sửa tin không thành công")
			});
		} catch (e) {

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Sửa tin không thành công")
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

			const res = await BiddingService.handle(id);

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
				title: res.data.messageTitle || translate("Lỗi"),
				message: res.data.message || translate("Kết nối không thành công"),
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
				title: translate("Lỗi"),
				message: translate("Kết nối không thành công"),
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
				<Banner exchange="rivers">{translate("Cần thuê sà làn")}</Banner>
				<Text style={_styles.title}>{translate("Mời bạn đăng tin")}</Text>
				<BiddingForm
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

export default Bidding;
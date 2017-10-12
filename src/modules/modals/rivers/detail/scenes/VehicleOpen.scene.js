import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
	InteractionManager
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import ImageSlider from '~/components/ImageSlider';
import MenuAction from '~/components/MenuAction';
import RowContent from '~/components/RowContent/Rivers';
import RowPoster from '~/components/RowPoster';
import RowItem from '~/components/RowItem/Rivers';
import Share from '~/components/Share';
import FooterContact from '~/components/FooterContact';
import vehicleOpenService from '~/services/rivers/vehicle-open';
import { translate } from '~/utilities/language';
import fetchData from '../utilities/fetchData';
import getImagesFromSource from '../utilities/getImagesFromSource';
import _styles from '../assets/detailStyles';
import ActionButton from '~/components/ActionButton/Button';
import Registry from '~/library/Registry';
import alertUtil from '~/utilities/alert';
import { hitSlop } from '~/configs/styles';

class VehicleOpen extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const {
			source: {
				urlDetail,
				vehicle_open_rivers_title: title,
				exchanges,
				vehicle_open_rivers_contact_phone: phoneNumber,
				vehicle_open_rivers_contact_email: email,
				vehicle_open_rivers_skype: skype,
				vehicle_open_rivers_contact_by: contactBy,
				vehicle_open_rivers_is_deleted: isDelete,
				vehicle_open_rivers_created_by: createdBy,
				vehicle_open_rivers_id: id,
				vehicle_open_rivers_code: code,
				vehicle_open_rivers_description: description,
				vehicle_open_rivers_creation_time: creationTime
			} = {},
		} = navigation.state.params;

		var authIdentity = Registry.get('authIdentity');
		var isMenuAction = false;

		if (authIdentity && authIdentity.account_id == createdBy) {
			isMenuAction = true;
		}

		return ({
			title,
			headerRight: (
				<View style={_styles.headerRight}>
					<TouchableOpacity hitSlop={hitSlop} style={_styles.headerButton}>
						<FAIcon name="heart-o" style={_styles.headerIcon} />
					</TouchableOpacity>

					{
						!!title && !!urlDetail && (
							<Share
								style={_styles.headerButton}
								url={urlDetail}
								title={title}
								message={title}
							>
								<MTIcon name="share" style={_styles.headerIcon} />
							</Share>
						)
					}

					{!!isMenuAction && <MenuAction onDelete={() => {

						_onDelete(id, navigation);

					}} onEdit={() => {
						navigation.navigate('/rivers/handle/vehicle-open', { id: id })
					}} />}
				</View>
			),
			footerContent: (
				<View style={_styles.footer} pointerEvents="box-none">
					<FooterContact
						phoneNumber 	= { phoneNumber }
						email 			= { email }
						skype 			= { skype }
						contactBy 		= { contactBy }
						code 			= { code }
						description 	= { description }
						creationTime 	= { creationTime }
						link 			= { urlDetail }
						id 				= { id }
						title 			= { title }
						exchange 		= { exchanges }
					/>
					<ActionButton onPress={() => navigation.navigate('/rivers/handle/vehicle-open')} style={_styles.actionButton} />
				</View>
			)
		});
	};

	componentWillReceiveProps(nextProps) {

		if (this.props.token !== nextProps.token) {

			fetchData(vehicleOpenService, nextProps.navigation);
		}

		const { state: { params: { loaded = false, refreshed = false, source: nextSource = {} } = {} } } = nextProps.navigation;
		const { state: { params: { source = {} } = {} } } = this.props.navigation;

		if (source.id !== nextSource.id /*|| (!loaded && !refreshed)*/) {
			fetchData(vehicleOpenService, nextProps.navigation);
		}
	}

	_renderTags(tags: Array = []) {

		return tags.map((tag, index) => {

			if (!tag) return null;

			return (
				<Text key={`tags-${index}`} style={_styles.tag}>{tag}</Text>
			);
		});
	}

	_renderRelations(relations: Array = []) {

		if (!relations || !relations.length) {

			return (
				<View style={_styles.relationNotFound}>
					<Text style={_styles.textRelationNotFound}>{translate("Không có tin nào")}</Text>
				</View>
			);
		}
		return relations.map((post, index) => {

			return (
				<RowItem key={`RelationsItem-Rivers-${index}`} source={post} onPress={() => {
					setTimeout(() => this.props.navigation.replace("/rivers/detail/vehicle-open", {
						source: post,
						id: post.id || post.vehicle_open_rivers_id
					}), 10);
				}} />
			);
		});
	}

	render() {

		const {
			navigation
		} = this.props;

		const { state: { params: { source, loaded = false, refreshed = false } } } = navigation;
		const images = getImagesFromSource(source, source.vehicle_open_rivers_title);
		const tags = (source.vehicle_open_rivers_tag || "").split(",");

		return (
			<ScrollView
				style={_styles.wrapper}
				refreshControl={
					<RefreshControl
						refreshing={loaded && !refreshed}
						onRefresh={() => fetchData(vehicleOpenService, navigation, true)}
						colors={_styles.refreshColor}
					/>
				}
				horizontal={false}
				keyboardDismissMode="interactive"
				keyboardShouldPersistTaps="always"
				showsHorizontalScrollIndicator={false}
				directionalLockEnabled={true}
			>
				{
					images && images.length ? <ImageSlider source={images} /> : null
				}

				{
					(!loaded || loaded && !!source.account) &&
					<RowPoster loading={!loaded} source={source.account || {}} navigation={navigation} />
				}


				<View style={_styles.contentContainer}>
					<RowContent source={source} style={ _styles.rowContent }/>
				</View>

				<View style={_styles.noteWrapper}>
					<Text style={_styles.dividerTitle}>{translate("Ghi chú")}</Text>
					{!!source.vehicle_open_rivers_want_transport_cargo && 
						<Text style={_styles.text}>{`- ${translate("Loại hàng mong muốn chở")}: ${source.vehicle_open_rivers_want_transport_cargo}`}</Text>}
					{!!source.vehicle_open_rivers_want_discharge_place && 
						<Text style={_styles.text}>{`- ${translate("Nơi trả hàng mong muốn")}: ${source.vehicle_open_rivers_want_discharge_place}`}</Text>}
					<Text style={_styles.text}>{source.vehicle_open_rivers_information || source.vehicle_open_rivers_description}</Text>

					<View style={ _styles.viewedContainer }>
						<FAIcon name="eye" style={ _styles.viewedIcon }> {source.vehicle_open_rivers_viewed || 1}</FAIcon>
					</View>
				</View>
				{/*
				<View style={_styles.tagContainer}>
					<View style={_styles.dividerContainer}>
						<Text style={_styles.dividerTitle}>{translate("Tag")}</Text>
						<FAIcon name="eye" style={ _styles.viewedIcon }> {source.vehicle_open_rivers_viewed || 1}</FAIcon>
					</View>
					<View style={_styles.tagContent}>
						{this._renderTags(tags)}
					</View>
				</View>
				*/}
				<View style={_styles.relationsContainer}>
					<Text style={_styles.dividerRelations}>{translate("Tin liên quan")}</Text>
					{
						!loaded ?
							<ActivityIndicator /> :
							this._renderRelations(source.post_relations)
					}
				</View>
			</ScrollView>
		);
	}

	componentDidMount() {

		InteractionManager.runAfterInteractions(() => fetchData(vehicleOpenService, this.props.navigation));
	}

}

var _onDelete = async (id: Number = {}, navigation) => {

	try {
		//console.log({ 'id': id });
		const res = await vehicleOpenService.remove(id);
		//console.log({ 'res': res });

		if (res.status === 200) {

			if (res.data.STATUS === "OK") {

				// dispatch reducer
				navigation.dispatch({
					type: "/rivers/list#remove",
					payload: {
						id
					}
				});

				alertUtil({
					title: res.data.messageTitle || translate("Thông báo"),
					message: res.data.message || translate("Xoá tin thành công"),
				});

				return navigation.goBack();
			}
		}

		return alertUtil({
			title: res.data.messageTitle || translate("Thông báo"),
			message: res.data.message || translate("Xoá tin không thành công"),
		});
	} catch (e) {

		alertUtil({
			title: translate("Lỗi"),
			message: translate("Xoá tin không thành công")
		});
	}
}

export default VehicleOpen;
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
//import RowContent from '~/components/RowContent/Roads';
import RowPoster from '~/components/RowPoster';
import RowItem from '~/components/RowItem/Roads';
import Share from '~/components/Share';
import FooterContact from '~/components/FooterContact';
import enterpriseService from '~/services/roads/enterprise';
import { translate } from '~/utilities/language';
import fetchData from '../utilities/fetchData';
import getImagesFromSource from '../utilities/getImagesFromSource';
import _styles from '../assets/detailStyles';
import ActionButton from '~/components/ActionButton/Button';
import Registry from '~/library/Registry';
import alertUtil from '~/utilities/alert';
import { hitSlop } from '~/configs/styles';

class Enterprise extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { state: { params: { source = {} } = {} } = {} } = navigation;

		const {
			urlDetail,
			enterprise_roads_title: title,
			exchanges,
			enterprise_roads_is_deleted: isDelete,
			enterprise_roads_created_by: createdBy,
			enterprise_roads_id: id,
			account: {
				account_phone: phoneNumber,
				account_phone: email,
				account_company_name,
				account_company_name_acronym,
				account_skype: skype
			} = {},
			enterprise_roads_description: description,
			enterprise_roads_creation_time: creationTime
		} = source;

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

					{!!isMenuAction && <MenuAction onEdit={() => {
						navigation.navigate('/roads/handle/enterprise', { id: id })
					}} />}
				</View>
			),
			footerContent: (
				<View style={_styles.footer} pointerEvents="box-none">
					<FooterContact
						phoneNumber 	= { phoneNumber }
						email 			= { email }
						skype 			= { skype }
						contactBy 		= { phoneNumber ? 0 : null }
						code 			= { account_company_name || account_company_name_acronym }
						description 	= { description }
						creationTime 	= { creationTime }
						link 			= { urlDetail }
						id 				= { id }
						title 			= { title }
						exchange 		= { exchanges }
					/>
					<ActionButton onPress={() => navigation.navigate('/roads/handle/enterprise')} style={_styles.actionButton} />
				</View>
			)
		});
	};

	componentWillReceiveProps(nextProps) {

		if (this.props.token !== nextProps.token) {

			fetchData(enterpriseService, nextProps.navigation);
		}

		const { state: { params: { loaded = false, refreshed = false, source: nextSource = {} } = {} } } = nextProps.navigation;
		const { state: { params: { source = {} } = {} } } = this.props.navigation;

		if ( source.id !== nextSource.id /*|| (!loaded && !refreshed)*/ ) {
			fetchData(enterpriseService, nextProps.navigation);
		}
	}

	// _renderTags(tags: Array = []) {

	// 	return tags.map((tag, index) => {

	// 		if (!tag) return null;

	// 		return (
	// 			<Text key={`tags-${index}`} style={_styles.tag}>{tag}</Text>
	// 		);
	// 	});
	// }

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
				<RowItem key={`RelationsItem-Roads-${index}`} source={post} onPress={() => {
					setTimeout(() => this.props.navigation.replace("/roads/detail/enterprise", {
						source: post,
						id: post.id || post.enterprise_roads_id
					}), 10);
				}} />
			);
		});
	}

	render() {

		const {
			navigation
		} = this.props;

		const { state: { params: { source = {}, loaded = false, refreshed = false } } } = navigation;
		const images = getImagesFromSource(source, source.enterprise_roads_title);
		//const tags = (source.enterprise_roads_tag || "").split(",");

		// let enterprise_roads_career = source.enterprise_roads_career ? source.enterprise_roads_career.split(';') : [];
		// enterprise_roads_career = enterprise_roads_career.map(value => {

		// 	var label = {
		// 		"SERVICE": "Sản xuất - thương mại",
		// 		"BARGES": "Vận tải đường sông",
		// 		"LOGISTICS": "Logistics",
		// 		"": "Khác"
		// 	};

		// 	value = label[value];

		// 	return value;

		// });

		const extraPoster = [{
			label: translate("Ngành nghề"),
			value: source.enterprise_roads_career
		}];

		return (
			<ScrollView
				style                          = {_styles.wrapper}
				refreshControl                 = {
					<RefreshControl
						refreshing                   = {loaded && !refreshed}
						onRefresh                    = {() => fetchData(enterpriseService, navigation, true)}
						colors                       = {_styles.refreshColor}
					/>
				}
				horizontal                     = {false}
				keyboardDismissMode            = "interactive"
				keyboardShouldPersistTaps      = "always"
				showsHorizontalScrollIndicator = {false}
				directionalLockEnabled         = {true}
			>
				{
					images && images.length ? <ImageSlider source={images} /> : null
				}

				{
					(!loaded || loaded && !!source.account) &&
					<RowPoster 
						showAvatar = {false} 
						loading    = {!loaded} 
						extra      = {extraPoster} 
						source     = {source.account || {}} 
						navigation = {navigation} 
					/>
				}

				<View style={[_styles.contentContainer]}>
					<RowItem source={source} style={{ flex: 7 }} />
				</View>

				<View style={_styles.noteWrapper}>
					<Text style={_styles.dividerTitle}>{translate("Thông tin")}</Text>
					<Text style={_styles.text}>{source.account && source.account.account_company_introduce || source.enterprise_roads_description}</Text>

					<View style={ _styles.viewedContainer }>
						<FAIcon name="eye" style={ _styles.viewedIcon }> {source.enterprise_roads_viewed || 1}</FAIcon>
					</View>
				</View>
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

		InteractionManager.runAfterInteractions(() => fetchData(enterpriseService, this.props.navigation));
	}

}

var _onDelete = async (id: Number = {}, navigation) => {

	try {
		const res = await enterpriseService.remove(id);

		if (res.status === 200) {

			if (res.data.STATUS === "OK") {

				// dispatch reducer
				navigation.dispatch({
					type: "/roads/list#remove",
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

export default Enterprise;
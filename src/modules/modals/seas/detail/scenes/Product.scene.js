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
import RowContent from '~/components/RowContent/Seas';
import RowPoster from '~/components/RowPoster';
import RowItem from '~/components/RowItem/Seas';
import Share from '~/components/Share';
import FooterContact from '~/components/FooterContact';
import productService from '~/services/seas/product';
import { translate } from '~/utilities/language';
import fetchData from '../utilities/fetchData';
import getImagesFromSource from '../utilities/getImagesFromSource';
import _styles from '../assets/detailStyles';
import ActionButton from '~/components/ActionButton/Button';
import Registry from '~/library/Registry';
import alertUtil from '~/utilities/alert';
import { hitSlop } from '~/configs/styles';

class Product extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const {
			source: {
				urlDetail,
				product_seas_title: title,
				exchanges,
				product_seas_contact_phone: phoneNumber,
				product_seas_contact_email: email,
				product_seas_skype: skype,
				product_seas_contact_by: contactBy,
				product_seas_is_deleted: isDelete,
				product_seas_created_by: createdBy,
				product_seas_id: id,
				product_seas_code: code,
				product_seas_description: description,
				product_seas_creation_time: creationTime
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

					{!!isMenuAction && <MenuAction 
						onDelete={() => {

							_onDelete(id, navigation);

						}} 
						onEdit={() => {
							navigation.navigate('/seas/handle/product', { id: id })
						}} 
						labelEdit={ translate("#$seas$#Sửa tin") }
						labelDelete={ translate("#$seas$#Xoá") }
						delMessageTitle={ translate("#$seas$#Cảnh báo") }
						delMessage={ `${translate("#$seas$#Bạn có thật sự muốn xoá")}?` }
						delCancelLabel={ translate("#$seas$#Hủy") }
						delOkLabel={"OK"}
					/>
					}
				</View>
			),
			footerContent: (
				<View style={_styles.footer} pointerEvents="box-none">
					<FooterContact
						labelPhone 	= { translate("#$seas$#Gọi điện") }
						labelSMS 	= { translate("#$seas$#Nhắn tin") }
						//labelEmail 	= { translate("#$seas$#Email") }
						//labelSkype  = { translate("#$seas$#Chat") }
						
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
					<ActionButton
						onPress = {() => navigation.navigate('/seas/handle/product')}
						style   = {_styles.actionButton}
						label   = { translate("#$seas$#Đ.tin") }
					/>
				</View>
			)
		});
	};

	componentWillReceiveProps(nextProps) {

		if (this.props.token !== nextProps.token) {

			fetchData(productService, nextProps.navigation);
		}

		const { state: { params: { loaded = false, refreshed = false, source: nextSource = {} } = {} } } = nextProps.navigation;
		const { state: { params: { source = {} } = {} } } = this.props.navigation;

		if (source.id !== nextSource.id /*|| (!loaded && !refreshed)*/) {
			fetchData(productService, nextProps.navigation);
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
					<Text style={_styles.textRelationNotFound}>{translate("#$seas$#Không có tin nào")}</Text>
				</View>
			);
		}
		return relations.map((post, index) => {

			return (
				<RowItem key={`RelationsItem-Seas-${index}`} source={post} onPress={() => {
					setTimeout(() => this.props.navigation.replace("/seas/detail/product", {
						source: post,
						id: post.id || post.product_seas_id
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
		const images = getImagesFromSource(source, source.product_seas_title);
		const tags = (source.product_seas_tag || "").split(",");

		return (
			<ScrollView
				style                          = {_styles.wrapper}
				refreshControl                 = {
					<RefreshControl
						refreshing                   = {loaded && !refreshed}
						onRefresh                    = {() => fetchData(productService, navigation, true)}
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
						loading     = {!loaded} 
						source      = {source.account || {}} 
						navigation  = {navigation} 
						labelFollow = { translate("#$seas$#Theo dõi") }
					/>
				}

				<View style={_styles.contentContainer}>
					<RowContent source={source} style={ _styles.rowContent }/>
				</View>
				<View style={_styles.noteWrapper}>
					<Text style={_styles.dividerTitle}>{translate("#$seas$#Ghi chú")}</Text>
					<Text style={_styles.text}>{source.product_seas_information || source.product_seas_description}</Text>

					<View style={ _styles.viewedContainer }>
						<FAIcon name="eye" style={ _styles.viewedIcon }> {source.product_seas_viewed || 1}</FAIcon>
					</View>
				</View>
				{/*
				<View style={_styles.tagContainer}>
					<View style={_styles.dividerContainer}>
						<Text style={_styles.dividerTitle}>{translate("Tag")}</Text>
						<FAIcon name="eye" style={ _styles.viewedIcon }> {source.product_seas_viewed || 1}</FAIcon>
					</View>
					<View style={_styles.tagContent}>
						{this._renderTags(tags)}
					</View>
				</View>
				*/}
				<View style={_styles.relationsContainer}>
					<Text style={_styles.dividerRelations}>{translate("#$seas$#Tin liên quan")}</Text>
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

		InteractionManager.runAfterInteractions(() => fetchData(productService, this.props.navigation));
	}

}

var _onDelete = async (id: Number = {}, navigation) => {

	try {
		//console.log({ 'id': id });
		const res = await productService.remove(id);
		//console.log({ 'res': res });

		if (res.status === 200) {

			if (res.data.STATUS === "OK") {

				// dispatch reducer
				navigation.dispatch({
					type: "/seas/list#remove",
					payload: {
						id
					}
				});

				alertUtil({
					title: res.data.messageTitle || translate("#$seas$#Thông báo"),
					message: res.data.message || translate("#$seas$#Xoá tin thành công"),
				});

				return navigation.goBack();
			}
		}

		return alertUtil({
			title: res.data.messageTitle || translate("#$seas$#Thông báo"),
			message: res.data.message || translate("#$seas$#Xoá tin không thành công"),
		});
	} catch (e) {

		alertUtil({
			title: translate("#$seas$#Lỗi"),
			message: translate("#$seas$#Xoá tin không thành công")
		});
	}
}

export default Product;
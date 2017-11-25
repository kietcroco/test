/**
 * @flow
 */
"use strict";
import React from 'react';
import { 
	InteractionManager, 
	ActivityIndicator, 
	AsyncStorage, 
	//BackHandler, 
	View,
	Linking
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Navigator from './drawer';
import ReducerRegistry from '~/library/ReducerRegistry';
import thunk from 'redux-thunk';
//import { logger, rafScheduler, timeoutScheduler, vanillaPromise, readyStatePromise } from '~/middleware';
//import { logger } from '~/middleware';
import screenTracking from '~/middleware/screenTracking';
//import PushNotification from 'react-native-push-notification';
import Registry from '~/library/Registry';
import { NavigationActions } from 'react-navigation';
import './applicationReducer';
import { translate, setCurrentLanguage, addEventListener as langAddEventListener, removeAllEventListener as langRemoveAllEventListener } from '~/utilities/language';
//import alertUtil from '~/utilities/alert';
import { autoRehydrate } from 'redux-persist';
import persistStore from '~/utilities/persistStore';
import OneSignal from 'react-native-onesignal';
import login from '~/services/member/login';
import notificationSubscriber from '~/services/notification/subscriber';
import notificationTracker from '~/services/notification/tracker';
import WaitingEvent from '~/library/WaitingEvent';
import getNavigateActionFromUrl from '~/utilities/getNavigateActionFromUrl';


class Application extends React.Component {

	static displayName = '@Application';

	constructor(props) {
		super(props);

		this.store = createStore(ReducerRegistry.getReducers(), {}, compose(
			// next => (reducer, initialState, enhancer) => {

			// 	return next(reducer, initialState, enhancer);
			// },
			applyMiddleware(

				thunk,
				screenTracking
				//routerNavigate,
				// rafScheduler,
				// timeoutScheduler,
				// vanillaPromise,
				// readyStatePromise,
				//logger
			),
			autoRehydrate()
		));

		this.state = {
			loading: true
		};

		this.authorization = Registry.get('authorization');
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.loading !== nextState.loading
		);
	}

	render() {

		if (this.state.loading) {

			return (
				<View style={ _styles.container }>
					<ActivityIndicator
						animating 	= {true}
						size 		= "large"
					/>
				</View>
			);
		}

		return (
			<Provider store={ this.store }>
				<Navigator />
			</Provider>
		);
	}

	componentDidMount() {

		this.initEvent();

		WaitingEvent.removeEventListener( 'linking-url', this._handleOpenURL, this, true );
		WaitingEvent.addEventListener( 'linking-url', this._handleOpenURL, this, true );

    	Linking.getInitialURL().then(
			(url: string) => url && this._handleOpenURL(url)
		);

		WaitingEvent.removeEventListener('oneSignal-ids', this._onNotificationIds, this, true);
		WaitingEvent.addEventListener('oneSignal-ids', this._onNotificationIds, this, true);

		
		InteractionManager.runAfterInteractions(() => setTimeout( async () => {

			try {

				// sync local store
				await this.persistStore();
			} catch(e) {}

			try {

				// đăng nhập
				await this.autoLogin();
			} catch (e) {}

			// đăng ký notification
			WaitingEvent.removeEventListener('oneSignal-received', this._onNotificationReceived, this, true);
			WaitingEvent.removeEventListener('oneSignal-opened', this._onNotificationOpened, this, true);

			WaitingEvent.addEventListener('oneSignal-received', this._onNotificationReceived, this, true);
			WaitingEvent.addEventListener('oneSignal-opened', this._onNotificationOpened, this, true);

			this.setState({
				loading: false
			});

		}, 70));
	}

	componentWillUnmount() {

		this.removeEvent();
	}

	persistStore = async () => {

		const restoredState = await persistStore( this.store, {
			storage: AsyncStorage,
			whitelist: [
				"currentLanguage",
				"$$navigation",
				"authIdentityUnActive"
			]
		} );

		try {
			const lastExchangeVisit = await AsyncStorage.getItem('lastExchangeVisit') || null;

			// lấy sàn cuối cùng truy cập
			// chỉ để dùng check hiển thị modal không ảnh hưởng đến chọn sàn
			//if( lastExchangeVisit ) {

				Registry.set("exchange", lastExchangeVisit);
			//}
		} catch (e) {}

		// đổi ngôn ngữ hiện tại
		if( restoredState && restoredState.currentLanguage ){

			setCurrentLanguage( restoredState.currentLanguage );
		}
		return restoredState;

	};


	autoLogin = async () => {

		const authorization = await AsyncStorage.getItem('authorization');
		Registry.set('authorization', authorization);

		if (authorization) {

			await login.login();
		}

		return authorization;

	};

	initEvent() {

		// this._backCounter = 0;
		// this._backTimeout = undefined;
		// this._alertIsShow = false;
		// this.backHandler = BackHandler.addEventListener('hardwareBackPress', (e, b) => {
			
		// 	this._backCounter++;

		// 	// nếu back về 2 lần
		// 	if( this._backCounter >= 2 && !this._alertIsShow ) {

		// 		this._alertIsShow = true;

		// 		// hiển thị thông báo
				
		// 		alertUtil({
		// 			title: translate("Thông báo"),
		// 			message: `${translate("Bạn có muốn thoát ứng dụng")}?`,
		// 			actions: [
		// 				{text: 'OK', onPress: () => {

		// 					this._alertIsShow = false;
		// 					BackHandler.exitApp();








		// 				}},
		// 				{text: 'Cancel', onPress: () => {


		// 					if( this._backTimeout ) {
		// 						clearTimeout( this._backTimeout );
		// 						this._backTimeout = undefined;
		// 						this._backCounter = 0;




		// 					}

		// 					this._alertIsShow = false;

		// 				}, style: 'cancel'}

		// 			]
		// 		});

		// 		return true;


		// 	}
			
		// 	// clear time out
		// 	if( this._backTimeout ) {
		// 		clearTimeout( this._backTimeout );
		// 		this._backTimeout = undefined;
















		// 	}


		// 	// set time out đề nhận biết double click back
		// 	this._backTimeout = setTimeout( () => {




		// 		if( this._backTimeout ) {
		// 			clearTimeout( this._backTimeout );
		// 			this._backTimeout = undefined;
		// 		}
		// 		this._backCounter = 0;
		// 	}, 250 );

		// 	this.store.dispatch( NavigationActions.back() );
		// 	return true;
		// });
		
		// sự kiện chọn sàn
		Registry.addEventListener("change", "exchange", async exchange => {





			try {

				if(exchange){
					return await AsyncStorage.setItem('lastExchangeVisit', exchange);
				}
				return await AsyncStorage.removeItem('lastExchangeVisit');
			} catch(e) {}
		});

		// sự kiện đổi token
		Registry.addEventListener("change", "authorization", async authorization => {

			if(this.authorization !== authorization) {

				// xoá số thông báo chưa đọc
				Registry.delete('unreadNotification');

				try {

					if( Registry.get('notificationPlayerID') ) {

						// đăng ký nhận notification		
						await notificationSubscriber.subscrice();


						if( authorization ) {

							// lấy số thông báo chưa đọc
							await notificationTracker.getUnread();
						}
					}
				} catch(e) {}
			} 
			this.authorization = authorization;

			this.store.dispatch({
				type: "setAuthorization",
				payload: authorization
			});
		});

		// sự kiện xoá token
		Registry.addEventListener("delete", "authorization", () => {

			this.store.dispatch({
				type: "deleteAuthorization"
			});
		});

		// set lại số thông báo chưa đọc
		Registry.addEventListener("change", "unreadNotification", unreadNotification => {

			this.store.dispatch({
				type: "setUnreadNotification",
				payload: unreadNotification
			});
		});

		// set lại số thông báo chưa đọc
		Registry.addEventListener("delete", "unreadNotification", () => {

			this.store.dispatch({
				type: "unsetUnreadNotification",
				payload: 0
			});
		});

		// sự kiện sửa account
		Registry.addEventListener("change", "authIdentity", authIdentity => {

			this.store.dispatch({
				type: "setAuthIdentity",
				payload: authIdentity
			});
		});

		// sự kiện xoá account
		Registry.addEventListener("delete", "authIdentity", () => {

			this.store.dispatch({
				type: "deleteAuthIdentity"
			});
		});

		// sự kiện switch ngôn ngữ
		this._languageEvent = langAddEventListener( locale => {

			this.store.dispatch({
				type: "setCurrentLanguage",
				payload: locale
			});
		} );

		


	
	
	
		// xoá thông báo
		//OneSignal.clearOneSignalNotifications();

		// huỷ thông báo
		//OneSignal.cancelNotification(id);

		// đăng ký notification
		//OneSignal.addEventListener('received', this._onNotificationReceived);
        //OneSignal.addEventListener('opened', this._onNotificationOpened);
        // OneSignal.addEventListener('registered', this.onNotificationRegistered);
        // OneSignal.addEventListener('ids', this._onNotificationIds);

		// Linking.addEventListener('url', ({ url }: { url: string }) => {
		// 	this._handleOpenURL(url);
		// });

	}

	removeEvent() {

		Registry.removeAllEventListener();

		//langRemoveAllEventListener();
		this._languageEvent && this._languageEvent();
		
		// if( this.backHandler && this.backHandler.remove ){

		// 	this.backHandler.remove();


		// }

		// clear time out
		// if( this._backTimeout ) {
		// 	clearTimeout( this._backTimeout );
		// 	this._backTimeout = undefined;


		// }

		//OneSignal.removeEventListener('received', this._onNotificationReceived);
        //OneSignal.removeEventListener('opened', this._onNotificationOpened);
        // OneSignal.removeEventListener('registered', this.onRegistered);
        // OneSignal.removeEventListener('ids', this.onIds);

        //Linking.removeEventListener('url', this._handleOpenURL);


	}
	
	_handleOpenURL = ( url = "" ) => {

		// set ngôn ngữ
		let matchLang = url.match(/\/(en|vi)\//);
		if( matchLang && matchLang.length == 2 && matchLang[1] ) {

			setCurrentLanguage( matchLang[1] );
		}
		const action = getNavigateActionFromUrl( url );
		if( action ) {

			return this.store.dispatch(NavigationActions.navigate( action ));
		}

		Linking.canOpenURL( url ).then( supported => (supported && Linking.openURL(url)) )
								.catch(() => {})
		;
	};

	_onNotificationReceived = async ( notification ) => {

		if( 
			notification && 
			notification.payload && 
			notification.payload.notificationID
		 ) {

		 	try {
			 	await notificationTracker.received( notification.payload.notificationID );
			 	Registry.set('unreadNotification', (Registry.get('unreadNotification') * 1 || 0) + 1);

			 	// lấy thông báo
		 		const res = await notificationTracker.get({
		 			notification_id: notification.payload.notificationID
		 		});

		 		// dispatch qua list thông báo
		 		if( res.status == 200 && res.data && res.data.data ) {

			 		this.store.dispatch({
						type: "/notification/list#newOffers",
						payload: {
							data: res.data.data
						}
					});
		 		}
		 	} catch(e){}


		}


	}

	_onNotificationOpened = async ( openResult ) => {

		if( 
			openResult && 
			openResult.notification &&
			openResult.notification.payload && 
			openResult.notification.payload.notificationID
		) {

			try {


			 	const unreadNotification = (Registry.get('unreadNotification') * 1 || 0) - 1;
			 	Registry.set('unreadNotification', unreadNotification >= 0 ? unreadNotification : 0);
			 	await notificationTracker.opened( openResult.notification.payload.notificationID );
			} catch(e) {}

			if( openResult.notification.payload.additionalData && openResult.notification.payload.additionalData.url ) {
		 		this._handleOpenURL( openResult.notification.payload.additionalData.url );
		 	}

		}


	}

	// onNotificationRegistered = ( notifData ) => {

	// 	console.log( 'onNotificationRegistered', notifData );
	// };

	_onNotificationIds = ( device ) => {


		Registry.set('notificationPlayerID', device.userId);


		// đăng ký nhận notification		
		//notificationSubscriber.subscrice();
	};
}

// chuông (Android only)
//OneSignal.enableSound(true);

// rung (Android only)
//OneSignal.enableVibrate(true);

// khi app đang mở (Android only): 0: none, 1: inapp alert, 2: notification
OneSignal.inFocusDisplaying(0);

// cho phép nhận
OneSignal.setSubscription(true);




// sự đăng ký lên onesignal
const registeredHandle = e => WaitingEvent.dispatch('oneSignal-registered', e);
OneSignal.removeEventListener('registered', registeredHandle);
OneSignal.addEventListener('registered', registeredHandle);

// sự lấy id
const idsHandle = e => WaitingEvent.dispatch('oneSignal-ids', e);
OneSignal.removeEventListener('ids', idsHandle);

OneSignal.addEventListener('ids', idsHandle);

// sự lấy nhận thông báo
const receivedHandle = e => WaitingEvent.dispatch('oneSignal-received', e);
OneSignal.removeEventListener('received', receivedHandle);
OneSignal.addEventListener('received', receivedHandle);

// sự lấy open
const openedHandle = e => WaitingEvent.dispatch('oneSignal-opened', e);
OneSignal.removeEventListener('opened', openedHandle);
OneSignal.addEventListener('opened', openedHandle);


// sự kiện linking
const linkingHandle = e => WaitingEvent.dispatch('linking-url', e && e.url || "");
Linking.removeEventListener('url', linkingHandle);
Linking.addEventListener('url', linkingHandle);

const _styles = {
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
};

export default Application;
/**
 * @flow
 */
"use strict";
import React from 'react';
import { 
	InteractionManager, 
	ActivityIndicator, 
	AsyncStorage, 
	BackHandler, 
	View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Navigator from './drawer';
import ReducerRegistry from '~/library/ReducerRegistry';
import SplashScreen from 'react-native-smart-splash-screen';
import codePush from "react-native-code-push";
import thunk from 'redux-thunk';
//import { logger, rafScheduler, timeoutScheduler, vanillaPromise, readyStatePromise } from '~/middleware';
//import { logger } from '~/middleware';
//import PushNotification from 'react-native-push-notification';
import login from '~/services/member/login';
import Registry from '~/library/Registry';
import { NavigationActions } from 'react-navigation';
import './applicationReducer';
import { translate, setCurrentLanguage, addEventListener as langAddEventListener, removeAllEventListener as langRemoveAllEventListener } from '~/utilities/language';
import alertUtil from '~/utilities/alert';
import { autoRehydrate, purgeStoredState } from 'redux-persist';
import persistStore from '~/utilities/persistStore';
import codePushAlert from '~/utilities/codePushAlert';
import Downloader from '~/components/Downloader';

class Application extends React.Component {

	static displayName = '@Application';

	constructor(props) {
		super(props);

		this.store = createStore(ReducerRegistry.getReducers(), {}, compose(
			// next => (reducer, initialState, enhancer) => {

			// 	return next(reducer, initialState, enhancer);
			// },
			applyMiddleware(

				thunk
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
			loading: true,
			downloader: false,
			totalByte: 0,
			currentByte: 0
		};
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.currentByte != nextState.currentByte ||
			this.state.loading !== nextState.loading ||
			this.state.totalByte != nextState.totalByte ||
			this.state.downloader !== nextState.downloader
		);
	}

	render() {

		if (this.state.loading) {

			return (
				<View style={ _styles.container }>
					<ActivityIndicator
						animating={true}
						size="large"
					/>
					<Downloader
						visible 		= { this.state.downloader }
						current 		= { this.state.currentByte }
						total 			= { this.state.totalByte }
					/>
				</View>
			);
		}

		return (
			<View style={ _styles.containerProvider }>
				<Provider store={this.store}>
					<Navigator />
				</Provider>
				<Downloader
					visible 		= { this.state.downloader }
					current 		= { this.state.currentByte }
					total 			= { this.state.totalByte }
				/>
			</View>
		);
	}

	async persistStore() {

		const restoredState = await persistStore( this.store, {
			storage: AsyncStorage,
			whitelist: [
				"currentLanguage",
				"$$navigation"
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
	}

	async autoLogin() {

		const authorization = await AsyncStorage.getItem('authorization');
		Registry.set('authorization', authorization);

		if (authorization) {

			await login.login();
		}

		return authorization;
		//await login.login('66666','666666');
	}

	async purgeStoredState() {

		return await purgeStoredState({
			storage: AsyncStorage
		}, [
			"$$navigation"
		]);
	}

	async checkForUpdate() {

		// cài đặt ngay sau khi download dùng cho package bắt buộc
		let resolvedInstallMode = codePush.InstallMode.IMMEDIATE;

		// số giây tối thiểu ứng dụng cần phải chạy nền trước khi khởi động lại
		let minimumBackgroundDuration = 0;

		// thông báo cho code push app vẫn còn chạy ))
		await codePush.notifyAppReady();

		//console.log(`codePush.SyncStatus.CHECKING_FOR_UPDATE`);

		// kiểm tra bản cập nhật
		const remotePackage = await codePush.checkForUpdate(null, update => {

			if( !update ) {

				//console.log(`codePush.SyncStatus.UP_TO_DATE`);
				return codePush.SyncStatus.UP_TO_DATE;
			}

			let buttons = [
				{
					text: translate("OK"),
					onPress: () => {

						if( update.isMandatory ) {

							BackHandler.exitApp();
						}
						//console.log(`codePush.SyncStatus.UPDATE_IGNORED`);
					}
				}
			];

			// nếu không phải bắt buộc
			if( !update.isMandatory ) {

				buttons.push({
					text: translate("Bỏ qua"),
					onPress: () => {

						//console.log(`codePush.SyncStatus.UPDATE_IGNORED`);
					}
				});
			}

			// codePushAlert.alert(
			// 	`${translate("Update available")} v${newVersion}`,
			// 	update.description || translate("Cùng trải nghiệm phiên bản mới"),
			// 	buttons
			// );
			codePushAlert.alert(
				`${translate("Cập nhật mới")} v${newVersion}`,
				translate("Vui lòng cập nhật phiên bản mới"),
				buttons
			);
			return codePush.SyncStatus.UPDATE_IGNORED;
		});
		
		// kiểm tra bản mới đã từng cài đặt bị lỗi
		const updateShouldBeIgnored = remotePackage && remotePackage.failedInstall;

		var currentPackage;

		if( remotePackage && remotePackage.failedInstall ) {

			if( !currentPackage ) {

				currentPackage = await codePush.getCurrentPackage();
				//console.log( "currentPackage", currentPackage );
			}

			if( currentPackage && currentPackage.isFirstRun ) {

				alertUtil({
					title: translate("Thông báo"),
					message: `${translate("Cập nhật không thành công")}!`,
					actions: [
						{text: 'OK', onPress: () => {}}
					]
				});
			}
		}

		//console.log('remotePackage', remotePackage);

		// nếu không có bản mới hoặc bản mới bị lỗi
		if ( !remotePackage || updateShouldBeIgnored ) {

			if( !currentPackage ) {

				currentPackage = await codePush.getCurrentPackage();
				//console.log( "currentPackage", currentPackage );
			}
			

			if (currentPackage && currentPackage.isPending) {

				// đã cài đặt
				//console.log(`codePush.SyncStatus.UPDATE_INSTALLED`);
				return codePush.SyncStatus.UPDATE_INSTALLED;
			} 

			if( currentPackage && currentPackage.isFirstRun ) {

				try {

					await this.purgeStoredState();
				} catch(e) {

				}

				alertUtil({
					title: translate("Thông báo"),
					message: `${translate("Cập nhật thành công")}!`,
					actions: [
						{text: 'OK', onPress: () => {}}
					]
				});
			}
			
			// đã là phiên bản mới nhất
			//console.log(`codePush.SyncStatus.UP_TO_DATE`);
			return codePush.SyncStatus.UP_TO_DATE;
		}

		//console.log( "remotePackage", remotePackage );

		// nếu có bản mới và có link download
		if( remotePackage && remotePackage.download && remotePackage.downloadUrl ) {

			// xử lý version name
			// let newVersion = remotePackage.appVersion.split(".");
			// newVersion[ newVersion.length - 1 ] = remotePackage.label.replace(/\D+/, "");
			// newVersion = newVersion.join('.');
			let newVersion = `${remotePackage.appVersion}#${remotePackage.label.replace(/\D+/, "")}`;

			return await new Promise( ( res, rej ) => {

				// nút nhấn
				let buttons = [
					{
						text: translate("Cài đặt"),
						onPress: async () => {

							//console.log(`codePush.SyncStatus.DOWNLOADING_PACKAGE`);

							// hiển thị downloader
							this.setState({
								downloader: true,
								totalByte: remotePackage.packageSize || 0,
								currentByte: 0
							});

							// download package
							const localPackage = await remotePackage.download( ({
								totalBytes: totalByte = 0,
								receivedBytes: currentByte = 0
							}) => {
								
								// set lại thanh download
								this.setState({
									totalByte,
									currentByte
								});
							} );

							// tắt download
							this.setState({
								downloader: false
							});

							// nếu có install
							if( localPackage && localPackage.install ) {

								//console.log( "localPackage", localPackage );

								//console.log(`codePush.SyncStatus.INSTALLING_UPDATE`);
								await localPackage.install(resolvedInstallMode, minimumBackgroundDuration, () => {

									//console.log(`codePush.SyncStatus.UPDATE_INSTALLED`);
								});

								res( codePush.SyncStatus.UPDATE_INSTALLED );
								return codePush.SyncStatus.UPDATE_INSTALLED;
							}
							
							//console.log(`codePush.SyncStatus.UNKNOWN_ERROR`);
							rej( codePush.SyncStatus.UNKNOWN_ERROR );
							return codePush.SyncStatus.UNKNOWN_ERROR;
						}
					}
				];

				// nếu phiên bản không bắt buộc
				if( !remotePackage.isMandatory ) {

					// thêm nút bỏ qua
					buttons.push({
						text: translate("Bỏ qua"),
						onPress: () => {

							//console.log(`codePush.SyncStatus.UPDATE_IGNORED`);
							res( codePush.SyncStatus.UPDATE_IGNORED );
						}
					});
				}

				// hiển thị bảng thông báo
				//console.log(`codePush.SyncStatus.AWAITING_USER_ACTION`);
				// codePushAlert.alert(
				// 	`${translate("Update available")} v${newVersion}`,
				// 	remotePackage.description || translate("Vui lòng cập nhật lên phiên bản mới"),
				// 	buttons
				// );
				codePushAlert.alert(
					`${translate("Cập nhật mới")} v${newVersion}`,
					translate("Vui lòng cập nhật phiên bản mới"),
					buttons
				);
			} );
		}

		// lỗi không xác định
		//console.log(`codePush.SyncStatus.UNKNOWN_ERROR`);
		return codePush.SyncStatus.UNKNOWN_ERROR;
	}

	componentDidMount() {

		this.initEvent();

		InteractionManager.runAfterInteractions(() => setTimeout( async () => {

			SplashScreen.close({
				animationType: SplashScreen.animationType.scale,
				duration: 850,
				delay: 500
			});

			try {

				await this.checkForUpdate();
			} catch(e) {}

			try {

				await this.persistStore();
			} catch(e) {}

			try {

				await this.autoLogin();
			} catch (e) {}

			this.setState({
				loading: false
			});

		}, 70));
	}

	componentWillUnmount() {

		this.removeEvent();
	}

	removeEvent() {

		Registry.removeAllEventListener();

		//langRemoveAllEventListener();
		this._languageEvent && this._languageEvent();
		
		if( this.backHandler && this.backHandler.remove ){

			this.backHandler.remove();
		}

		// clear time out
		if( this._backTimeout ) {
			clearTimeout( this._backTimeout );
			this._backTimeout = undefined;
		}
	}

	initEvent() {

		this._backCounter = 0;
		this._backTimeout = undefined;
		this._alertIsShow = false;
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', (e, b) => {
			
			this._backCounter++;

			// nếu back về 2 lần
			if( this._backCounter >= 2 && !this._alertIsShow ) {

				this._alertIsShow = true;

				// hiển thị thông báo
				
				alertUtil({
					title: translate("Thông báo"),
					message: `${translate("Bạn có muốn thoát ứng dụng")}?`,
					actions: [
						{text: 'OK', onPress: () => {

							this._alertIsShow = false;
							BackHandler.exitApp();
						}},
						{text: 'Cancel', onPress: () => {

							if( this._backTimeout ) {
								clearTimeout( this._backTimeout );
								this._backTimeout = undefined;
								this._backCounter = 0;
							}

							this._alertIsShow = false;

						}, style: 'cancel'}
					]
				});

				return true;
			}
			
			// clear time out
			if( this._backTimeout ) {
				clearTimeout( this._backTimeout );
				this._backTimeout = undefined;
			}

			// set time out đề nhận biết double click back
			this._backTimeout = setTimeout( () => {

				if( this._backTimeout ) {
					clearTimeout( this._backTimeout );
					this._backTimeout = undefined;
				}
				this._backCounter = 0;
			}, 250 );

			this.store.dispatch( NavigationActions.back() );
			return true;
		});

		// sự kiện chọn sàn
		Registry.addEventListener("change", "exchange", async exchange => {

			try {

				await AsyncStorage.setItem('lastExchangeVisit', exchange);
			} catch(e) {}
		});

		// sự kiện đổi token
		Registry.addEventListener("change", "authorization", authorization => {

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
	}
}

const _styles = {
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	containerProvider: {
		flex: 1
	}
};

// export default codePush({ 
//   updateDialog: {
// 		updateTitle: translate("Có phiên bản mới"),
// 		optionalUpdateMessage: translate("Bạn cần cài đặt phiên bản mới"),
// 		optionalIgnoreButtonLabel: translate("Bỏ qua"),
// 		optionalInstallButtonLabel: translate("Đồng ý"),
//   }, 
//   installMode: codePush.InstallMode.IMMEDIATE,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START 
// })(Application);

export default Application;
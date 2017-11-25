/**
 * @flow
 */
import React from 'react';
import { 
	AppRegistry, 
	View,
	ActivityIndicator,
	InteractionManager,
	//BackHandler,
	AsyncStorage
} from 'react-native';
import Application from './src';
import alertUtil from '~/utilities/alert';
import Downloader from '~/components/Downloader';
import { translate } from '~/utilities/language';
import codePushAlert from '~/utilities/codePushAlert';
import { purgeStoredState } from 'redux-persist';
//import SplashScreen from 'react-native-smart-splash-screen';
import codePush from "react-native-code-push";

// bỏ qua yellow box các lỗi về debugger
console.ignoredYellowBox = ["Remote debugger", "Debugger and device times"];

class Loader extends React.Component {

	static displayName = '@Loader';

	constructor(props) {
		super(props);

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
			<Application { ...this.props }/>
		);
	}

	componentDidMount() {

		InteractionManager.runAfterInteractions(() => setTimeout( async () => {

			// SplashScreen.close({
			// 	animationType: SplashScreen.animationType.scale,
			// 	duration: 850,
			// 	delay: 500
			// });

			try {

				await this.checkForUpdate();
			} catch(e) {}

			this.setState({
				loading: false
			});

		}, 70));
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

						//if( update.isMandatory ) {

							//BackHandler.exitApp();
						//}
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
			// 	update.description || translate("Vui lòng cập nhật trên chợ ứng dụng"),
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
				} catch (e) {
					
				}

				// alertUtil({
				// 	title: translate("Thông báo"),
				// 	message: `${translate("Cập nhật thành công")}!`,
				// 	actions: [
				// 		{text: 'OK', onPress: () => {}}
				// 	]
				// });
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

							var localPackage;

							// hiển thị downloader
							this.setState({
								downloader: true,
								totalByte: remotePackage.packageSize || 0,
								currentByte: 0
							});

							// download package
							localPackage = await remotePackage.download( ({
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
							}, async () => {

								// nếu có install
								if (localPackage && localPackage.install) {

									//console.log( "localPackage", localPackage );

									//console.log(`codePush.SyncStatus.INSTALLING_UPDATE`);
									await localPackage.install(resolvedInstallMode, minimumBackgroundDuration, () => {

										//console.log(`codePush.SyncStatus.UPDATE_INSTALLED`);
									});

									res(codePush.SyncStatus.UPDATE_INSTALLED);
									return codePush.SyncStatus.UPDATE_INSTALLED;
								}

								//console.log(`codePush.SyncStatus.UNKNOWN_ERROR`);
								rej(codePush.SyncStatus.UNKNOWN_ERROR);
								return codePush.SyncStatus.UNKNOWN_ERROR;
							});
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

	async purgeStoredState() {

		return await purgeStoredState({
			storage: AsyncStorage
		}, [
			"$$navigation"
		]);
	}
}

const _styles = {
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
};

//codePush({ 
//   updateDialog: {
// 		updateTitle: translate("Có phiên bản mới"),
// 		optionalUpdateMessage: translate("Bạn cần cài đặt phiên bản mới"),
// 		optionalIgnoreButtonLabel: translate("Bỏ qua"),
// 		optionalInstallButtonLabel: translate("Đồng ý"),
//   }, 
//   installMode: codePush.InstallMode.IMMEDIATE,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START 
// })(Application)

AppRegistry.registerComponent('Izifix', () => Loader);
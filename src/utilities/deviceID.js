import DeviceInfo from 'react-native-device-info';

// thông tin thiết bị
export default JSON.stringify({
	uniqueID: DeviceInfo.getUniqueID(),
	manufacturer: DeviceInfo.getManufacturer(),
	brand: DeviceInfo.getBrand(),
	model: DeviceInfo.getModel(),
	deviceId: DeviceInfo.getDeviceId(),
	systemName: DeviceInfo.getSystemName(),
	systemVersion: DeviceInfo.getSystemVersion(),
	bundleId: DeviceInfo.getBundleId(),
	buildNumber: DeviceInfo.getBuildNumber(),
	version: DeviceInfo.getVersion(),
	readableVersion: DeviceInfo.getReadableVersion(),
	deviceName: DeviceInfo.getDeviceName(),
	userAgent: DeviceInfo.getUserAgent(),
	isEmulator: DeviceInfo.isEmulator(),
	isTablet: DeviceInfo.isTablet()
});
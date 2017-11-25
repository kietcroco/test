import { NavigationActions } from 'react-navigation';
//import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import getRoute from '~/utilities/getRoute';
import DeviceInfo from 'react-native-device-info';
import {
    Analytics,
    Hits as GAHits,
    Experiment as GAExperiment
} from 'react-native-google-analytics';
import { googleAnalyticsID } from '~/configs/application';

const readableVersion = DeviceInfo.getReadableVersion();
const bundleId = DeviceInfo.getBundleId();
const clientId = DeviceInfo.getUniqueID();
const userAgent = DeviceInfo.getUserAgent();
const version = 1;

ga = new Analytics(googleAnalyticsID, clientId, version, userAgent);

const screenTracking = ({ getState }) => next => (action) => {
    if (
        action.type !== NavigationActions.INIT
        && action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK
        && action.type !== NavigationActions.RESET
        && action.type !== NavigationActions.SET_PARAMS
        && action.type !== (NavigationActions.REPLACE || "Navigation/REPLACE")
    ) {
        return next(action);
    }

    const currentScreen = getRoute(getState()["$$navigation"]);

    const result = next(action);

    const nextScreen = getRoute(getState()["$$navigation"]);

    if (action.type == NavigationActions.SET_PARAMS) {

        var {
            params: {
                Exchange,
                type
            } = {},
            routeName
        } = currentScreen || {};

        var {
            params: {
                Exchange: nextExchange,
                type: nextType
            } = {},
            routeName: nextRouteName
        } = nextScreen || {};

        if (Exchange != nextExchange || type != nextType || routeName != nextRouteName) {

            var screenView = new GAHits.ScreenView(
                "IZIFIX",
                `${nextRouteName}${nextExchange ? '/' + nextExchange : ''}/${nextType || ''}`,
                readableVersion,
                bundleId
            );
            ga.send(screenView);
        }

        return result;
    }

    var {
        params: {
            id,
            type
        } = {},
        routeName
    } = currentScreen || {};

    var {
        params: {
            id: nextId
        } = {},
        routeName: nextRouteName
    } = nextScreen || {};
    if (routeName != nextRouteName || (routeName == nextRouteName && id != nextId)) {

        var screenView = new GAHits.ScreenView(
            nextRouteName,
            `${nextRouteName}/${nextId || ''}`,
            readableVersion,
            bundleId
        );
        ga.send(screenView);
    }

    return result;
};

export default screenTracking;
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

export default (options: Object) => {

    const navigation = addNavigationHelpers(options);

    navigation.replace = (routeName: String, params: Object = {}, replaceNum: Number = 1, action: Object) => {

        const newAction =  NavigationActions.navigate({
            routeName,
            params,
            replaceNum,
            action
        });
        newAction.type = "Navigation/REPLACE";

        navigation.dispatch(  newAction  );
    };

    return navigation;
};
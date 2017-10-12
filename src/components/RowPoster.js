"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MTIcons from 'react-native-vector-icons/MaterialIcons';
import { translate } from '~/utilities/language';
import CircleAvatar from '~/components/CircleAvatar';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class RowPoster extends React.Component {

    static displayName = "@RowPoster";

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        source: PropTypes.object.isRequired, // account object
        onPress: PropTypes.func,
        loading: PropTypes.bool,
        navigation: PropTypes.object.isRequired,
        showAvatar: PropTypes.bool,
        extra: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.element,
                label: PropTypes.string,
                value: PropTypes.string
            })
        ),
        labelFollow: PropTypes.string
    };

    static defaultProps = {
        showAvatar: true,
        labelFollow: translate('Theo dõi')
    };

    shouldComponentUpdate(nextProps) {

        return (
            this.props.loading !== nextProps.loading ||
            this.props.labelFollow !== nextProps.labelFollow ||
            this.props.showAvatar !== nextProps.showAvatar ||
            this.props.extra != nextProps.extra ||
            !recursiveShallowEqual(this.props.source, nextProps.source)
        );
    }

    // _extractExtraSource() {
    //     var obj = this.props.extraLabel;
    //     var extraLabel = [];

    //     if (obj) {

    //         for (let key in obj) {
    //             if (obj.hasOwnProperty(key)) {
    //                 let data = obj[key].join(';');
    //                  //console.log(data);
    //                 if (data) {
    //                     extraLabel.push(
    //                         <Text key={key} style={_styles.txtName}>
    //                             {
    //                                 ((key == 'career') ? translate('Ngành : ') : "") + data
    //                             }
    //                         </Text>
    //                     );
    //                 }
    //             }
    //         }
    //     }

    //     return extraLabel;
    // }

    _renderInfo(source) {

        const name = (source.account_company_name || source.account_contact || source.account_fullname);

        return (
            <View>
                <Text style={_styles.txtName}>{name}</Text>
                {
                    this.props.extra && this.props.extra.map( (item, index) => {

                        if( item && item.value ) {

                            return (
                                <View style={ _styles.row } key={ `extra-${index}` }>
                                    { 
                                        item.icon ||  
                                         !!item.label && 
                                         <Text style={ _styles.text }>{ item.label }: </Text>
                                    }
                                    
                                    <Text style={ _styles.text }>{ item.value }</Text>
                                </View>
                            );
                        }
                    } )
                }
                {/*
                    !!source.account_company_address && <View style={ _styles.row }>
                        <MTIcons name="place" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_company_address }</Text>
                    </View>
                }
                {
                    !!source.account_tax_code && <View style={ _styles.row }>
                        <FAIcon name="id-card-o" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_tax_code }</Text>
                    </View>
                }
                {
                    !!source.account_website && <View style={ _styles.row }>
                        <FAIcon name="globe" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_website }</Text>
                    </View>
                }
                {
                    !!source.account_email && <View style={ _styles.row }>
                        <MTIcons name="email" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_email }</Text>
                    </View>
                }
                {
                    !!source.account_mobile || !!source.account_phone && <View style={ _styles.row }>
                        <MTIcons name="phone" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_phone }</Text>
                        {
                            !!source.account_phone && !!source.account_mobile &&
                                <Text>{ " - " }</Text>
                        }
                        <Text>{ source.account_mobile }</Text>
                    </View>
                }
                {
                    !!source.account_skype && <View style={ _styles.row }>
                        <FAIcon name="skype" style={ _styles.iconInfo }/>
                        <Text style={ _styles.text }>{ source.account_skype }</Text>
                    </View>
                */}
            </View>
        );
    }

    render() {

        const {
            style,
            source = {},
            onPress,
            loading,
            showAvatar,
            labelFollow
		} = this.props;

        const avatar = Array.isArray(source.avatar) ?
            source.avatar[0] : null;
        const id = source.id || source.account_id;

        //var isShowingAvatar = (showAvatar === false) ? showAvatar : true;

        return (
            <View style={style ? [_styles.wrapper, style] : _styles.wrapper}>

                {
                    !!showAvatar && <CircleAvatar source={avatar} size={30} onPress={() => {

                        if( loading ) {

                            return;
                        }
                        this.props.navigation.navigate('/member/detail', { id });
                    }} />
                }

                <TouchableOpacity style={_styles.infoWrapper} onPress={ loading ? undefined : (() => {
                    
                    this.props.navigation.navigate('/member/detail', { id });
                }) }>
                    {
                        loading ?
                            <ActivityIndicator /> :
                            this._renderInfo(source)
                    }
                </TouchableOpacity>
                <View style={_styles.handleWrapper}>
                    <TouchableOpacity hitSlop={hitSlop} activeOpacity={loading ? 1 : colors.activeOpacity} style={loading ? [_styles.btnHandle, _styles.btnHandleDisable] : _styles.btnHandle} onPress={loading ? onPress : undefined}>
                        <MTIcons name="add" style={_styles.icoHandle} />
                        <Text style={_styles.labelHandle}>{ labelFollow }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const _styles = {
    wrapper: {
        flexDirection: 'row',
        padding: sizes.margin,
        borderTopWidth: sizes.borderWidth,
        borderTopColor: colors.primaryBorderColor
    },
    circleAvatar: {
        height: 30 * scale,
        width: 30 * scale
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    },
    infoWrapper: {
        flex: 4,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: sizes.margin,
        marginRight: sizes.margin
    },
    txtName: {
        fontWeight: 'bold',
        fontSize: fontSizes.normal,
        color: colors.boldColor
    },
    iconInfo: {
        color: colors.primaryColor,
        fontSize: fontSizes.normal,
        marginRight: sizes.spacing,
        textAlign: "center",
        textAlignVertical: "center"
    },
    handleWrapper: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'flex-end',
        marginLeft: sizes.margin,
        marginRight: sizes.margin
    },
    btnHandle: {
        height: 20 * scale,
        width: 80 * scale,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15 * scale,
        flexDirection: 'row',
        backgroundColor: colors.primaryColor,
    },
    btnHandleDisable: {
        backgroundColor: colors.disableColor
    },
    labelHandle: {
        color: colors.secondColor,
        fontSize: fontSizes.small
    },
    icoHandle: {
        color: colors.secondColor,
        fontSize: 10 * scale,
        paddingRight: 3 * scale
    },
    text: {
        color: colors.normalColor,
        fontSize: fontSizes.normal
    }
};

export default RowPoster;
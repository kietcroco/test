import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';
import defaultSource from '~/assets/images/no_image.png';

class Avatar extends React.Component {

    static displayName = '@Avatar';

    static propTypes = {
        children: PropTypes.string, // mã tin
        source: PropTypes.oneOfType([ // hình
            PropTypes.string,
            PropTypes.number,
            PropTypes.object
        ]), 
        isHandle: PropTypes.bool, // có thêm nút chọn hình
        defaultSource: PropTypes.oneOfType([ // hình khi bị lỗi
            PropTypes.object,
            PropTypes.number
        ]),
        ticket: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        children: "",
        isHandle: false,
        defaultSource,
        ticket: ""
    };

    constructor(props) {
        super(props);

        let source = props.isHandle ? null : props.defaultSource;
        if( typeof props.source === "string" ) {

            source = {uri: props.source};
        } else if( props.source ){

            source = props.source;
        }

        this.state = {
            source
        };

        this._onError = this._onError.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if( this.props.source != nextProps.source && this.state.source != nextProps.source ) {

            let source = nextProps.isHandle ? null : nextProps.defaultSource;
            if( typeof nextProps.source === "string" ) {

                source = {uri: nextProps.source};
            } else if( nextProps.source ){

                source = nextProps.source;
            }
            
            this.setState({
                source
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return (
            this.state.source != nextState.source ||
            this.props.children != nextProps.children ||
            this.props.isHandle != nextProps.isHandle ||
            this.props.defaultSource != nextProps.defaultSource
        );
    }

    _onError(e) {

        this.setState({
            source: this.props.defaultSource
        });

        this.props.onError && this.props.onError(e);
    }

    render() {

        const { children, source, isHandle, ticket, onPress } = this.props;
        const Wrapper = isHandle ? TouchableOpacity : View;

        return (
            <View style={ _styles.wrapper }>
                <Wrapper style={ _styles.imageWrapper } onPress={ onPress }>
                    <Image source={ this.state.source } style={ _styles.image } onError={ this._onError } />
                    {
                        isHandle && 
                            <MTIcon name="add-a-photo" style={ _styles.iconHandle } />
                    }
                </Wrapper>
                {
                    !!children && <Text style={ _styles.textChildren }>{ children }</Text>
                }

                {
                    !!ticket && <Text style={ _styles.ticket }>{ ticket }</Text>
                }
                
                
            </View>
        );
    }
}

const _styles = {
    wrapper: {
        width: 90 * scale,
        height: 90 * scale,
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.secondBackgroundColor
    },
    imageWrapper: {
        flex: 8,
        backgroundColor: colors.secondBackgroundColor,
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.primaryBorderColor,
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "cover"
    },
    textChildren: {
        flex: 2,
        backgroundColor: colors.codeBackground,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: fontSizes.small,
        fontWeight: "bold",
        color: colors.boldColor
    },
    iconHandle: {
        fontSize: 30 * scale,
        position: "absolute"
    },
    ticket: {
        width: "100%",
        height: fontSizes.small + ( 5 * scale ),
        fontSize: fontSizes.small,
        backgroundColor: colors.highlightColor,
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "center",
        transform: [
            {rotate: "-45deg"}
        ],
        position: "absolute",
        top: 15 * scale,
        left: "-24%",
        color: colors.secondColor
    }
};

export default Avatar;
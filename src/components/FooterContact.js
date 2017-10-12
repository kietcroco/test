import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Chat from '~/components/Contact/Chat';
import Email from '~/components/Contact/Email';
import Phone from '~/components/Contact/Phone';
import Sms from '~/components/Contact/Sms';
import { sizes, colors } from '~/configs/styles';
import { translate } from '~/utilities/language';
import toAlias from '~/utilities/toAlias';

class FooterContact extends React.Component {

	static displayName = "@FooterContact";

	static propTypes = {
		skype: PropTypes.string,
		email: PropTypes.string,
		phoneNumber: PropTypes.string,
		contactBy: PropTypes.number,
		labelPhone: PropTypes.string,
		labelSMS: PropTypes.string,
		labelEmail: PropTypes.string,
		labelSkype: PropTypes.string,
		code: PropTypes.string,
		description: PropTypes.string,
		creationTime: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		link: PropTypes.string,
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		title: PropTypes.string,
		exchange: PropTypes.string
	};

	static defaultProps = {
		code: "",
		description: "",
		creationTime: (new Date()).getTime() / 1000,
		link: "",
		id: "",
		title: "",
		exchange: "RIVERS_PRODUCT_OFFER"
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.phoneNumber !== nextProps.phoneNumber ||
			this.props.skype !== nextProps.skype ||
			this.props.email !== nextProps.email ||
			this.props.code !== nextProps.code ||
			this.props.description !== nextProps.description ||
			this.props.exchange !== nextProps.exchange ||
			this.props.creationTime !== nextProps.creationTime ||
			this.props.link !== nextProps.link ||
			this.props.id !== nextProps.id ||
			this.props.title !== nextProps.title ||
			this.props.contactBy !== nextProps.contactBy ||
			this.props.labelPhone !== nextProps.labelPhone ||
			this.props.labelSMS !== nextProps.labelSMS ||
			this.props.labelEmail !== nextProps.labelEmail ||
			this.props.labelSkype !== nextProps.labelSkype
		);
	}

	render() {

		const {
			skype,
			email,
			phoneNumber,
			contactBy,
			labelPhone,
			labelSMS,
			labelEmail,
			labelSkype,
			code,
			exchange,
			description,
			link
		} = this.props;

		if( 
			!phoneNumber &&
			!email &&
			!skype
		) {

			return null;
		}

		let content = `${ (isSeas(exchange) ? translate("Liên hệ") : "Liên hệ") } ${ getExchangeName( exchange ) } ${ code } ${ translate("trên izifix.com") }`;

		return (
			<View style={ _styles.container }>
				{
					!!phoneNumber && (contactBy === 0 || contactBy === 1) &&
						<Phone label={ labelPhone } phoneNumber={ phoneNumber }/>
				}
				{
					!!phoneNumber && (contactBy === 0 || contactBy === 2) &&
						<Sms 
							label 		= { labelSMS } 
							phoneNumber = { phoneNumber }
							body 		= { toAlias( content, false ) }
						/>
				}
				{
					!!email &&
						<Email 
							label 		= { labelEmail } 
							to 			= {[ email ]}
							subject 	= { content }
							body 		= { `${ description } - ${ link }` }
						/>
				}
				{
					!!skype &&
						<Chat 
							label 		= { labelSkype } 
							users 		= {[ skype ]}
							topic 		= { content }
						/>
				}
			</View>
		);
	}
}

const isSeas = ( exchange ) => {

	return `${ exchange }`.includes("SEAS_");
};

const getExchangeName = ( exchange = "RIVERS_PRODUCT_OFFER" ) => {

	switch( exchange ) {

		case "RIVERS_VEHICLE_HOLLOW":

			return "S.lan chạy rỗng";

		case "RIVERS_PRODUCT_OFFER":

			return "Hàng - offer";

		case "RIVERS_VEHICLE_OPEN":

			return "Sà lan - open";

		case "RIVERS_PURCHASE":

			return "Mua bán - S&P";

		case "RIVERS_BIDDING":

			return "Cần thuê Sà lan";

		case "RIVERS_ENTERPRISE":

			return "Doanh nghiệp đường sông";

		case "ROADS_VEHICLE_HOLLOW":

			return "Xe chạy rỗng";

		case "ROADS_PRODUCT_OFFER":

			return "Hàng - offer";

		case "ROADS_VEHICLE_OPEN":

			return "Xe - open";

		case "ROADS_PURCHASE":

			return "Mua bán - S&P";

		case "ROADS_CONTAINER":

			return "Container - offer";

		case "ROADS_ENTERPRISE":

			return "Doanh nghiệp đường sông";

		case "SEAS_VEHICLE_HOLLOW":

			return translate("#$seas$#Tàu chạy rỗng");

		case "SEAS_PRODUCT_OFFER":

			return translate("#$seas$#Chào hàng");

		case "SEAS_VEHICLE_OPEN":

			return translate("#$seas$#Chào tàu");

		case "SEAS_PURCHASE":

			return translate("#$seas$#Mua bán tàu (S&P)");

		case "SEAS_CONTAINER":

			return translate("#$seas$#Container");

		case "SEAS_ENTERPRISE":

			return `${ translate("#$seas$#Doanh nghiệp") } ${ translate("#$seas$#Đường Biển") }`;

		default:

			return "";
	}
};

const _styles = {
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingLeft: sizes.margin,
		paddingRight: sizes.margin,
		height: sizes.footerHeight,
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		backgroundColor: colors.secondBackgroundColor
	}
};

export default FooterContact;
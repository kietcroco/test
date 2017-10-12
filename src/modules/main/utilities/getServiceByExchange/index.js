import riversExchange from './rivers';
import roadsExchange from './roads';
import seasExchange from './seas';

export default (master, slave) => {
    switch (master) {

        case 'RIVERS':
            return riversExchange(slave);

        case 'ROADS':
            return roadsExchange(slave);

        case 'SEAS':
            return seasExchange(slave);

        default:
            return {};
    }
}
import { translate } from '~/utilities/language';

export default (beforMin = true, min = 1980, max = (new Date()).getFullYear()) => {
    // const yearNow = (new Date()).getFullYear();
    // const yearMilestones = 1980;

    const yearNow = (new Date()).getFullYear();
    const yearMilestones = min;

    const yearSource = [];

    for (let year = yearNow; year >= yearMilestones; year--) {

        yearSource.push({ 
            value: `${year}`, 
            label: `${year}`
        });
    }

    if ( beforMin ) {

        yearSource.push({
            value: `${yearMilestones - 1}`, 
            label: `${beforMin === true ? translate('Trước năm') : beforMin} ${yearMilestones}`
        });
    }

    return yearSource;
};
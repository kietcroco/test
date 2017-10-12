import { translate } from '~/utilities/language';

export default () => {
    const yearNow = (new Date()).getFullYear();
    const yearMilestones = 1980;

    const yearSource = [];

    for (let year = yearNow; year >= yearMilestones; year--) {

        yearSource.push({ 
            value: `${year}`, 
            label: `${year}`
        });
    }

    yearSource.push({
        value: `${yearMilestones - 1}`, 
        label: `${translate('#$seas$#Trước năm')} ${yearMilestones}`
    });

    return yearSource;
};
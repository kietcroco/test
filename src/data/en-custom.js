//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

// ;(function (global, factory) {
//    typeof exports === 'object' && typeof module !== 'undefined'
//        && typeof require === 'function' ? factory(require('../moment')) :
//    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
//    factory(global.moment)
// }(this, (function (moment) { 'use strict';

export default moment => {

    var enCt = moment.defineLocale('en-custom', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : '1"',
            mm : '%d"',
            h : '1 hr',
            hh : '%d hrs',
            d : '1 day',
            dd : '%d days',
            M : '1 month',
            MM : '%d months',
            y : '1 year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 0, // Monday is the first day of the week.
            doy : 6  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enCt;
}

// })));

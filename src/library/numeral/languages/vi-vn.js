/*! 
 * numeral.js language configuration
 * language : viet nam
 * author : Crocodile
 * since : 01/03/2016
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'nghìn',
            million: 'triệu',
            billion: 'tỷ',
            trillion: 'nghìn tỷ'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: 'vnđ'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('vi-vn', language);
    }
}());

/**
 * addCommas(nbr) accepts a number and returns a string equivalent 
 *  of the number with comma separations added at thousands, millions, billions, etc.
 * @param {*} nbr the number to convert and add commas
 * @returns a string equivalent of the input. 
 */
function addCommas(nbr) {

    const SEP = ",";

    if (isNaN(nbr)) {
        // return text of whatever was passed in.
        return `${nbr}`;

    } else {
        // We have a number.

        let sign = "";
        let strNbr = nbr.toString();

        // remember sign and convert to a string of a positive number
        if (nbr < 0) {
            sign = "-";
            strNbr = (nbr * -1).toString();
        }

        // decimal point is the starting
        let idxStart = strNbr.indexOf(".");
        if (idxStart === -1) {
            // use the length at start since no decimal point
            idxStart = strNbr.length
        }

        // Move throught string 3 characters at a time from RIGHT to LEFT 
        //  and add a comma
        for (let i = idxStart - 3; i > 0; i = i - 3) {
            strNbr = strNbr.slice(0, i) + SEP + strNbr.slice(i);
        }

        return `${sign}${strNbr}`

    }

}

module.exports = addCommas;
// Extract just the Time (HH:MM:SS) from a Date Object
function extractTimeFromDateObject(dateObj) {
    
    let timeString = '';
    let hoursString = new Date(dateObj).getHours();
    let minutesString = new Date(dateObj).getMinutes();
    let secondsString = new Date(dateObj).getSeconds();
    hoursString = hoursString < 10 ? '0' + hoursString : hoursString
    minutesString = minutesString < 10 ? '0' + minutesString : minutesString
    secondsString = secondsString < 10 ? '0' + secondsString : secondsString

    timeString += hoursString + ':' + minutesString + ':' + secondsString
    return timeString;
};

export { extractTimeFromDateObject }

class TimeUtil{
    static translateMinutesFromStringToMillis(stringTime){
        let splitArray = stringTime.split(":");
        let minutes = Number.parseInt(splitArray[0]);
        let seconds = Number.parseInt(splitArray[1]);
        return 1000*60*minutes + 1000*seconds;
    }
}

module.exports = TimeUtil;
/* Your Code Here */

function createEmployeeRecord(information){
    return  {
        firstName: information[0],
        familyName: information[1],
        title: information[2],
        payPerHour: information[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(infoArray) {
    const recordArray = [];
    infoArray.forEach(element => {
        recordArray.push(createEmployeeRecord(element));
    });
    return recordArray;
}

function createTimeInEvent(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return this;
}

function createTimeOutEvent(date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return this;
}

function hoursWorkedOnDate(date) {
    const eventsIn = this.timeInEvents;
    const eventsOut = this.timeOutEvents;
    const index = eventsIn.findIndex(element => element.date === date);
    return (eventsOut[index].hour - eventsIn[index].hour)/100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date)*this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

function findEmployeeByFirstName(srcArray,firstName) {
    return srcArray.find(element => element.firstName === firstName);
}

function calculatePayroll(records) {
    return records.reduce((accumulator, record) => {
        return accumulator + allWagesFor.call(record);
    },0)
}
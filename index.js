// Your code here
const createEmployeeRecord = function(e) {
    e.firstName = e[0];
    e.familyName = e[1];
    e.title = e[2];
    e.payPerHour = e[3];
    e.timeInEvents = [];
    e.timeOutEvents = [];
    return e
}

const createEmployeeRecords = function(records) {
    return records.map(emp => createEmployeeRecord(emp))
}

const createTimeInEvent = function(record, dateTime) {
    const [date, hour] = dateTime.split(' ')

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return record
}


const createTimeOutEvent = function(record, dateTime) {
    const [date, hour] = dateTime.split(' ');

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })

    return record
}

const hoursWorkedOnDate = function(record, dateCheck) {
    let timeIn = record.timeInEvents.find(e => e.date === dateCheck)

    let timeOut = record.timeOutEvents.find(e => e.date === dateCheck)

    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(record, date) {
    return (hoursWorkedOnDate(record, date) * record.payPerHour)
}

const allWagesFor = function(employee){
    let datesWorked = employee.timeInEvents.map(event => event.date)

    return datesWorked.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee, date)
    }, 0)
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}

const calculatePayroll = function(employees){
    return employees.reduce(function(total, e) {
        return total + allWagesFor(e)
    }, 0)
}
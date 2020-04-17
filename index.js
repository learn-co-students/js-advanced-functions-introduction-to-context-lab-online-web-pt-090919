function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

function createEmployeeRecords(dataByRow) {
    return dataByRow.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,

    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let clockedInAt = employeeRecord.timeInEvents.filter(getDate)[0].hour;
    let clockedOutAt = employeeRecord.timeOutEvents.filter(getDate)[0].hour;
    let totalHoursForDate;

    totalHoursForDate = (clockedOutAt - clockedInAt) / 100;
    return totalHoursForDate

    function getDate(e) {
        if (e.date === date) {
            return e.date;
        }
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.map(getDaysWageTotal).reduce(getTotalWage)

    function getDaysWageTotal(clockIn) {
        return wagesEarnedOnDate(employeeRecord, clockIn.date)
    }

    function getTotalWage(wage, total = 0) {
        return wage + total
    }
}

function calculatePayroll(employeeRecord) {
    const totalPay = employeeRecord.reduce(((total, record) => total + allWagesFor(record)), 0)
    return totalPay
}

function findEmployeeByFirstName(employeeRecord, firstName) {
    return employeeRecord.find(record => record.firstName === firstName)
}
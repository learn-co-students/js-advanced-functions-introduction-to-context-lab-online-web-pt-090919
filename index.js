// Your code here

function createEmployeeRecord(employeeArray) {
    return {
        timeInEvents: [],
        timeOutEvents: [],
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],

    }
}

function createEmployeeRecords(allEmployeeArrays) {

    return allEmployeeArrays.map(employeeArray => {

        return createEmployeeRecord(employeeArray)

    });
}

function createTimeInEvent(employee, dateStam) {
    //this should be different!
    employee.timeInEvents.push(createEvent("TimeIn", dateStam))

    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    //this should be different!
    employee.timeOutEvents.push(createEvent("TimeOut", dateStamp))
    //this should be different!
    return employee
}

function createEvent(type, dateStamp) {
    //this should be different!
    const [year, month, day, hour] = dateStamp.split(/[\s-]/g)

    const event = {
        type: type,
        hour: parseInt(hour),
        date: `${year}-${month}-${day}`
    }

    return event
}

function hoursWorkedOnDate(employee, date) {

    const eventOnDate = function (event) { return event.date === date }

    const inTime = employee.timeInEvents.find(eventOnDate).hour;
    //this should be different!
    const outTime = employee.timeOutEvents.find(eventOnDate).hour;

    return (outTime - inTime) / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {

    const reducer = (totalWages, timeOutEvent) => {
        return totalWages + wagesEarnedOnDate(employee, timeOutEvent.date)
    }

    return employee.timeOutEvents.reduce(reducer, 0);
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => {
        return employee.firstName === firstName
    });
}

function calculatePayroll(allEmployees) {

    const reducer = (totalWages, employee) => {
        return totalWages + allWagesFor(employee)
    }

    return allEmployees.reduce(reducer, 0)
}
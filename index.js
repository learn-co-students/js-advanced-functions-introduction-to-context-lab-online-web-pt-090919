// Your code here
function createEmployeeRecord(array) {
    var employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
      };
    return employee  
}

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(employee, time) {
    var thing = {
        type: "TimeIn",
        hour: Number(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    employee.timeInEvents.push(thing)
    return employee
}

function createTimeOutEvent(employee, time) {
    var thing = {
        type: "TimeOut",
        hour: Number(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    employee.timeOutEvents.push(thing)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    var i
    for (i = 0; i < employee.timeOutEvents.length; i++) {
        if (employee.timeOutEvents[i].date == date) {
            var a = employee.timeOutEvents[i].hour
            var b = employee.timeInEvents[i].hour
            var c = (a - b) / 100
            return c
        }
      }
}

function wagesEarnedOnDate(employee, date) {
    var amount = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return amount
}

function allWagesFor(employee) {
    var dates = employee.timeInEvents.map(x => x.date);
    var wages = dates.map(x => wagesEarnedOnDate(employee, x))
    var allWages = wages.reduce(function(a, b){
        return a + b;
    }, 0);
    return allWages
}

function findEmployeeByFirstName(employees, name) {
    for (var i=0; i < employees.length; i++) {
        if (employees[i].firstName === name) {
            return employees[i];
        }
    }
}

function calculatePayroll(employees) {
    var payarray = employees.map(x => allWagesFor(x))
    var payroll = payarray.reduce(function(a, b){
        return a + b;
    }, 0);
    return payroll
}
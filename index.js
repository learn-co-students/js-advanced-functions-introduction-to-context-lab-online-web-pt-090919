// Your code here

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employees) {
    return employees.map(emp => createEmployeeRecord(emp));
};

function createTimeInEvent(empRecord, timeIn) {
    let dateHour = timeIn.split(" ");
    empRecord.timeInEvents.push({type: "TimeIn", date: dateHour[0], hour: parseInt(dateHour[1])});
    return empRecord;
};

function createTimeOutEvent(empRecord, timeOut) {
    let dateHour = timeOut.split(" ");
    empRecord.timeOutEvents.push({type: "TimeOut", date: dateHour[0], hour: parseInt(dateHour[1])});
    return empRecord;
};

function hoursWorkedOnDate(empRecord, date) {
    let inEvent = empRecord.timeInEvents.find(element => element.date === date);
    let outEvent = empRecord.timeOutEvents.find(element => element.date === date);
    return (outEvent.hour - inEvent.hour)/100;
};

function wagesEarnedOnDate(empRecord, date) {
    return (empRecord.payPerHour * (hoursWorkedOnDate(empRecord, date)));
};

function allWagesFor(empRecord) {

    const dates = empRecord.timeInEvents.map(element => element.date);

    const reducer = (accumulator, date) => accumulator + wagesEarnedOnDate(empRecord, date);

    return dates.reduce(reducer, 0);

};

function calculatePayroll(employees) {
    return employees.reduce((x,y) => x+allWagesFor(y), 0);
};

function findEmployeeByFirstName(employees, name) {
    return employees.find(empRecord => empRecord.firstName === name);
};
// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
  return {
    "firstName": firstName, 
    "familyName": familyName,
    "title": title,
    "payPerHour": payPerHour,
    "timeInEvents": [],
    "timeOutEvents": []
  }
}

function createEmployeeRecords(info){
  return info.map(createEmployeeRecord)
}

function createTimeInEvent(record, date){
  let timeInEvent = {
    type: "TimeIn",
    date: date.split(" ")[0],
    hour: parseInt(date.split(" ")[1])
  }
  record.timeInEvents.push(timeInEvent)
  return record
}

function createTimeOutEvent(record, date){
  let timeOutEvent = {
    type: "TimeOut",
    date: date.split(" ")[0],
    hour: parseInt(date.split(" ")[1])
  }
  record.timeOutEvents.push(timeOutEvent)
  return record
}

function hoursWorkedOnDate(empRecord, date){
  const timeIn = empRecord.timeInEvents.find(e => e.date === date)
  const timeOut = empRecord.timeOutEvents.find(e => e.date === date)
  const hoursWorked = (timeOut.hour - timeIn.hour) / 100
  return hoursWorked
}

function wagesEarnedOnDate(empRecord, date){
  let hoursWorked = hoursWorkedOnDate(empRecord, date)
  let payOwed = hoursWorked * empRecord.payPerHour
  return payOwed
}

function allWagesFor(empRecord){
  const datesWorked = empRecord.timeInEvents.map(event => event.date)
  const wagesOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(empRecord, date))
  const totalWages = wagesOnDatesWorked.reduce(((total, earning) => total + earning), 0)
    return totalWages
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(record => record.firstName === firstName)
}

function calculatePayroll(employeeRecords) {
    const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)), 0)
    return totalPay
}
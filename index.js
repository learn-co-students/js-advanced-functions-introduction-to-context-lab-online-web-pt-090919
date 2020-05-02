// Your code here
const createEmployeeRecord = (array) => {
    let employees = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employees
}

const createEmployeeRecords = (data) => {
        return data.map(item => {
            return createEmployeeRecord(item)       
       })
}

const createTimeInEvent = (record, dateTime) => {
   const [date, time] = dateTime.split(' ')
   
   record.timeInEvents.push({
    type: 'TimeIn',
    date,
    hour: parseInt(time, 10),  
    })
    return record
}

const createTimeOutEvent = (record, dateTime) => {
    const [date, time] = dateTime.split(' ')

    record.timeOutEvents.push({
        type: 'TimeOut', 
        date: date,
        hour: parseInt(time, 10)
    })
    return record
}

const hoursWorkedOnDate = (record, dateMatch) => {
    let timeIn = record.timeInEvents.find(e => e.date === dateMatch)
    let timeOut= record.timeOutEvents.find(e => e.date === dateMatch)
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (record, dateTime) => {
    return (hoursWorkedOnDate(record, dateTime) * record.payPerHour)
}
const allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map(e => 
         e.date
    )
    return eligibleDates.reduce(function(amount, d) {
        return amount + wagesEarnedOnDate(employee, d)
    }, 0)
}

const calculatePayroll = (employee) => {
    return employee.reduce(function(amount, e) {
        return amount + allWagesFor(e)
    }, 0)
}

const findEmployeeByFirstName = (sourceArray, firstName) => {
    return sourceArray.find(function(e){
        return e.firstName === firstName
    })
}
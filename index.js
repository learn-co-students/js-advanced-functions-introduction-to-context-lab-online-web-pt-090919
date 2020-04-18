// Your code here

function createEmployeeRecord(args){
 return {
   firstName: args[0],
   familyName: args[1],
   title: args[2],
   payPerHour: args[3],
   timeInEvents: [],
   timeOutEvents: []
 }
}

function createEmployeeRecords(record){
  return record.map(function(args){
    return createEmployeeRecord(args)
  })
}

function createTimeInEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ");
  
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, soughtDate){
  let wage = hoursWorkedOnDate(employee, soughtDate)
  * employee.payPerHour
  return parseFloat(wage.toString())
}

function allWagesFor(employee){
  let dates = employee.timeInEvents.map(function(e){
    return e.date
  })
  
  let pay = dates.reduce(function(memo, i){
    return memo + wagesEarnedOnDate(employee, i)
  }, 0)
  return pay
}

function calculatePayroll(record){
  return record.reduce(function(memo, i){
    return memo + allWagesFor(i)
  }, 0)
}

function findEmployeeByFirstName(src, firstName){
  return src.find(function(record){
    return record.firstName === firstName
  })
  
}
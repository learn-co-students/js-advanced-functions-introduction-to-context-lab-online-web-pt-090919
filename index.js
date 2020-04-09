// Your code here
const createEmployeeRecord = (arr) => {
     let employee = {
          firstName: arr[0],
          familyName: arr[1],
          title: arr[2],
          payPerHour: arr[3],
          timeInEvents: [],
          timeOutEvents: []
     };
     return employee;
};

const createEmployeeRecords = (arrOfarrs) => {
     return arrOfarrs.map(createRecord);
};

const createTimeInEvent = (empRec, dateStamp) => {
     let type = "TimeIn";
     let hour = parseInt(dateStamp.split(" ")[1]);
     let date = dateStamp.split(" ")[0];
     let punchIn = {
          type,
          hour,
          date,
     };
     empRec.timeInEvents.push(punchIn);
     return empRec;
};

const createTimeOutEvent = (empRec, dateStamp) => {
     let type = "TimeOut";
     let hour = parseInt(dateStamp.split(" ")[1]);
     let date = dateStamp.split(" ")[0];
     let punchOut = {
          type,
          hour,
          date,
     };
     empRec.timeOutEvents.push(punchOut);
     return empRec;
};

const hoursWorkedOnDate = (empRec, date) => {
     let timeInhour = empRec.timeInEvents.filter(getDate)[0].hour;
     let timeOutHour = empRec.timeOutEvents.filter(getDate)[0].hour;
     let total;

     total = (timeOutHour - timeInhour) / 100;
     return total;

     function getDate(event) {
          if (event.date === date) {
               return event.date;
          }
     }
};

const wagesEarnedOnDate = (empRec, date) => {
     return hoursWorkedOnDate(empRec, date) * empRec.payPerHour;
};

const allWagesFor = (empRec) => {
     return empRec.timeInEvents.map(getDaysWageTotals).reduce(getTotalWage);

     function getDaysWageTotals(punch) {
          return wagesEarnedOnDate(empRec, punch.date);
     }
};

const findEmployeeByFirstName = (srcArray, firstName) => {
     return srcArray.find(emplObj => emplObj.firstName === firstName)
};

const calculatePayroll = (arrOfEmpRecs) => {
     return arrOfEmpRecs.map(getAllWages).reduce(getTotalWage)
};

// ITERATION HELPER METHODS IF CAN BE USED BY OTHER FUNCTIONS

function getTotalWage(wage, total = 0) {
     return wage + total;
} // used by > func calculatePayroll() < and > func allWagesFor() <

function getAllWages(emp) {
     return allWagesFor(emp)
} // used by: calculatePayroll()

function createRecord(arr) {
     return createEmployeeRecord(arr);
} // used by: createEmployeeRecords()
"use strict";
//Index Signatures
//In TypeScript, an index signature defines the types 
// for properties within an object where the exact property names 
// are not known ahead of time. It allows for defining a consistent type 
// for all values associated with dynamically named keys.
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
console.log(todaysTransactions.Pizza);
console.log(todaysTransactions['Pizza']);
let prop = 'Pizza';
const todaysTransactions2 = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
console.log(todaysTransactions2[prop]);
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};
console.log(todaysNet(todaysTransactions2));
//if you remove Job, it will give you an error
//but you can add a new property
const todaysTransactions3 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Salary: 400
};
console.log(todaysNet(todaysTransactions3));
const student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};
//console.log(student.test)  //this is acceptable as a by product of index signature!
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
//if we didn't have index signature, we have to use "assertion"
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
//if you are not sure what Interface student comes from, you can also use typeof keyword
Object.keys(student).map(key => {
    console.log(student[key]);
});
//function
const logStudentKey = (student, key) => {
    console.log(`Student ${key}: ${student[key]}`);
};
//call the function
logStudentKey(student, 'GPA');
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
};
for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue]);
}
//3:01:54

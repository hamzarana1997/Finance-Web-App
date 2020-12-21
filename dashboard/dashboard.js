// getMonth();
// getIncome();
getIncome();
getExpense();
getUserData();
getRecentIncome();
getRecentExpense();
// user data getting from firebase
function getUserData() {
  const userId = localStorage.getItem("userId");
  firebase
    .firestore()
    .collection("user")
    .doc(userId)
    .get()
    .then(function (snapshot) {
      const userData = snapshot.data();
      document.getElementById("userName").innerHTML = userData.fullname;
    });
}
const userId = localStorage.getItem("userId");

let array1 = [];
let array2 = [];
let c = [];
let d = [];
let e = [];
pra();

function pra() {
  firebase
    .firestore()
    .collection("transaction")

    .where("userId", "==", userId)
    // .where("type", "==", "income")
    .orderBy("month", "asc")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        // console.log(doc.data());
        const data = doc.data();
        const type = data.type;
        //   console.log(data.month);
        // const month = data.month;
        // const income = data.amount;
        let monthIncome = "";
        let monthExpense = "";
        let monthAmountIncome = "";
        let monthAmountExpense = "";
        if (type == "income") {
          monthIncome = data.month;
          monthAmountIncome = data.amount;
          d.push(monthAmountIncome);
          if (monthIncome == 0) {
            array1.push("january");
          } else if (monthIncome == 1) {
            array1.push("feb");
          } else if (monthIncome == 2) {
            array1.push("mar");
          } else if (monthIncome == 3) {
            array1.push("april");
          } else if (monthIncome == 4) {
            array1.push("may");
          } else if (monthIncome == 5) {
            array1.push("june");
          } else if (monthIncome == 6) {
            array1.push("july");
          } else if (monthIncome == 7) {
            array1.push("aug");
          } else if (monthIncome == 8) {
            array1.push("sep");
          } else if (monthIncome == 9) {
            array1.push("oct");
          } else if (monthIncome == 10) {
            array1.push("nov");
          } else if (monthIncome == 11) {
            array1.push("dec");
          } else {
            return;
          }
        } else {
          monthExpense = data.month;
          monthAmountExpense = data.amount;
          e.push(monthAmountExpense);
          if (monthExpense == 0) {
            array2.push("january");
          } else if (monthExpense == 1) {
            array2.push("feb");
          } else if (monthExpense == 2) {
            array2.push("mar");
          } else if (monthExpense == 3) {
            array2.push("april");
          } else if (monthExpense == 4) {
            array2.push("may");
          } else if (monthExpense == 5) {
            array2.push("june");
          } else if (monthExpense == 6) {
            array2.push("july");
          } else if (monthExpense == 7) {
            array2.push("aug");
          } else if (monthExpense == 8) {
            array2.push("sep");
          } else if (monthExpense == 9) {
            array2.push("oct");
          } else if (monthExpense == 10) {
            array2.push("nov");
          } else if (monthExpense == 11) {
            array2.push("dec");
          } else {
            return;
          }
        }
        c = array1.concat(array2).unique();
        console.log(c);
        console.log(array1);
        console.log(array2);

        // console.log(monthIncome);
        // console.log(monthExpense);
        // b.push(income);
        // console.log(month);

        // if (month == 0) {
        //   a = myPush();
        // } else if (month == 1) {
        //   a = myPush();
        // } else if (month == 2) {
        //   a = myPush();
        // } else if (month == 3) {
        //   a = myPush();
        // } else if (month == 4) {
        //   a = myPush();
        // } else if (month == 5) {
        //   a = myPush();
        // } else if (month == 6) {
        //   a = myPush();
        // } else if (month == 7) {
        //   a = myPush();
        // } else {
        //   return;
        // }

        // if (monthIncome == 0) {
        //   a.push("january");
        // } else if (monthIncome == 1) {
        //   a.push("feb");
        // } else if (monthIncome == 2) {
        //   a.push("mar");
        // } else if (monthIncome == 3) {
        //   a.push("april");
        // } else if (monthIncome == 4) {
        //   a.push("may");
        // } else if (monthIncome == 5) {
        //   a.push("june");
        // } else if (monthIncome == 6) {
        //   a.push("july");
        // } else if (monthIncome == 7) {
        //   a.push("aug");
        // } else {
        //   return;
        // }

        // var months = new Array();
        // months[0] = "January";
        // months[1] = "February";
        // months[2] = "March";
        // months[3] = "April";
        // months[4] = "May";
        // months[5] = "June";
        // months[6] = "July";
        // months[7] = "August";
        // months[8] = "September";
        // months[9] = "October";
        // months[10] = "November";
        // months[11] = "December";
        // var monthss = months[month];
        // console.log(monthss);
        // let a = [];

        // a = [monthss];

        //   console.log(a);
      });

      // firebase
      //   .firestore()
      //   .collection("transaction")

      //   .where("userId", "==", userId)
      //   .where("type", "==", "expense")
      //   .orderBy("month", "asc")
      //   .get()
      //   .then(function (snap) {
      //     snap.forEach(function (doc) {
      //       // console.log(doc.data());
      //       const data = doc.data();
      //       //   console.log(data.month);
      //       // const month = data.month;
      //       const expense = data.amount;
      //       c.push(expense);
      //       console.log(expense);
      //     });
      //   });

      // firebase
      //   .firestore()
      //   .collection("transaction")

      //   .where("userId", "==", userId)
      //   .where("type", "==", "expense")
      //   .orderBy("month", "asc")
      //   .get()
      //   .then(function (snap) {
      //     snap.forEach(function (doc) {
      //       // console.log(doc.data());
      //       const data1 = doc.data();
      //       //   console.log(data.month);
      //       // const month = data.month;
      //       const expense = data1.amount;
      //       c.push(expense);
      //     });
      //   });

      console.log(c);
      var ctxL = document.getElementById("lineChart").getContext("2d");
      new Chart(ctxL, {
        type: "line",
        data: {
          labels: c,
          datasets: [
            {
              label: "Income",
              data: d,
              backgroundColor: ["rgba(142, 249, 138, 0.3)"],
              borderColor: ["rgba(0,153,0,1)"],
              borderWidth: 2,
            },
            {
              label: "Expense",
              data: e,
              backgroundColor: ["rgba(255, 66, 66, 0.3)"],
              borderColor: ["rgba(215, 15, 15, 1)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    });
}

// function getMonth() {
//   const userId = localStorage.getItem("userId");
//   firebase
//     .firestore()
//     .collection("transaction")
//     .where("userId", "==", userId)

//     .get()
//     .then(function (snap) {
//       snap.forEach(function (doc) {
//         // console.log(doc.data());
//         const data = doc.data();
//         console.log(data.month);
//         const month = data.month;

//         // let a = [];
//         // a.push(month);
//         // console.log(a);
//       });
//     });

// }

// function pra2() {

//   firebase
//     .firestore()
//     .collection("transaction")

//     .where("userId", "==", userId)
//     .where("type", "==", "expense")
//     .orderBy("month", "asc")
//     .get()
//     .then(function (snap) {
//       snap.forEach(function (doc) {
//         // console.log(doc.data());
//         const data = doc.data();
//         //   console.log(data.month);
//         const month = data.month;
//         const expense = data.amount;
//         c.push(expense);
//       });
//     });
// }
// function merge_array(array1, array2) {
//   var arr = array1.concat(array2);
//   var len = arr.length;
//   var assoc = {};

//   while (len--) {
//     var item = arr[len];

//     if (!assoc[item]) {
//       c.unshift(item);
//       assoc[item] = true;
//     }
//   }

//   return c;
// }

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

function getIncome() {
  const userId = localStorage.getItem("userId");
  let ai = document.getElementById("totalIncome");
  let allIncome = 0;
  firebase
    .firestore()
    .collection("transaction")
    .where("userId", "==", userId)
    .where("type", "==", "income")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        const data = doc.data();
        const income = data.amount;
        console.log(income);
        allIncome = +allIncome + +income;
        console.log(allIncome);
        ai.innerHTML = allIncome;
      });
    });
}

function getExpense() {
  const userId = localStorage.getItem("userId");
  let ai = document.getElementById("totalExpense");
  let allExpense = 0;
  firebase
    .firestore()
    .collection("transaction")
    .where("userId", "==", userId)
    .where("type", "==", "expense")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        const data = doc.data();
        const income = data.amount;
        console.log(income);
        allExpense = +allExpense + +income;
        // console.log(allExpense);
        ai.innerHTML = allExpense;
      });
    });
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function getRecentIncome() {
  const table = document.getElementsByTagName("tbody")[0];
  const userId = localStorage.getItem("userId");
  table.innerHTML = "";

  firebase
    .firestore()
    .collection("transaction")
    .where("userId", "==", userId)
    .where("type", "==", "income")
    .limit(5)
    .orderBy("date", "desc")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        console.log(doc.data());
        const data = doc.data();

        const row = document.createElement("TR");

        const amount = document.createElement("TD");
        const category = document.createElement("TD");
        const arrowUp = document.createElement("TD");
        arrowUp.setAttribute("class", "fa fa-fw fa-arrow-up");
        arrowUp.setAttribute("style", "color:green;");

        amount.innerHTML = data.amount;
        category.innerHTML = data.category;

        row.appendChild(amount);
        row.appendChild(category);
        row.appendChild(arrowUp);

        table.appendChild(row);
      });
    });
}

function getRecentExpense() {
  const table = document.getElementById("rex");
  const userId = localStorage.getItem("userId");
  table.innerHTML = "";

  firebase
    .firestore()
    .collection("transaction")
    .where("userId", "==", userId)
    .where("type", "==", "expense")
    .limit(5)
    .orderBy("date", "desc")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        console.log(doc.data());
        const data = doc.data();

        const row = document.createElement("TR");

        const amount = document.createElement("TD");
        const category = document.createElement("TD");
        const arrowUp = document.createElement("TD");
        arrowUp.setAttribute("class", "fa fa-fw fa-arrow-down");
        arrowUp.setAttribute("style", "color:red;");
        amount.innerHTML = data.amount;
        category.innerHTML = data.category;

        row.appendChild(amount);
        row.appendChild(category);
        row.appendChild(arrowUp);

        table.appendChild(row);
      });
    });
}
//  logout function
function logout() {
  window.location.replace("../transaction/login.html");
}

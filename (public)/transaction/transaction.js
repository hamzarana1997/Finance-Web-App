// getUser();
getUserData();
// monthYear();
getTransaction();

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
// function getUser() {
//   const user = JSON.parse(localStorage.getItem("name"));
//   const userElement = document.getElementById("user");
//   userElement.innerHTML = user;
// }

function monthYear() {
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const d = new Date();
  const cMonth = d.getMonth();
  const cYear = d.getFullYear();
  month.value = cMonth;
  year.value = cYear;
}

// income function
function addIncome() {
  const userId = localStorage.getItem("userId");
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").valueAsDate;
  let category = document.getElementById("category").value;
  var d = new Date(date);
  var month = d.getMonth();
  // console.log(d.getMonth());
  // console.log(d);
  // console.log(amount);
  // console.log(category);
  if (amount == "" || description == "" || date == "" || category == "") {
    // alert("please fill all fields");
    swal({
      icon: "warning",
      title: "You Must Fill All Fields!",
    });
  } else {
    firebase
      .firestore()
      .collection("transaction")
      .add({
        amount,
        description,
        date,
        category,
        userId,
        type: "income",
        month,
      })
      .then(function () {
        // alert("transaction successful");
        swal({
          icon: "success",
          title: "Transaction Successful",
        });
        clearIncomeForm();
        getTransaction();
        $("#incomeModal").modal("hide");
      });
  }
  // firebase
  //   .firestore()
  //   .collection("transaction")
  //   .add({
  //     amount,
  //     description,
  //     date,
  //     category,
  //     type: "income",
  //   })
  //   .then(function () {
  //     alert("transaction successful");
  //     clearIncomeForm();
  //     $("#incomeModal").modal("hide");
  //   });
}

// logout function
function logout() {
  window.location.replace("../index.html");
}

// clear form function
function clearIncomeForm() {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "";

  document.getElementById("amount-expense").value = "";
  document.getElementById("description-expense").value = "";
  document.getElementById("date-expense").value = "";
  document.getElementById("category-expense").value = "";
  document.getElementById("image").value = "";
}

// expense function
function addExpense() {
  const userId = localStorage.getItem("userId");
  let amount = document.getElementById("amount-expense").value;
  let description = document.getElementById("description-expense").value;
  let date = document.getElementById("date-expense").valueAsDate;
  let category = document.getElementById("category-expense").value;
  let image = document.getElementById("image").files[0];
  // var storageRef = firebase.storage().ref();
  // storageRef.put(image).then(function (response) {
  //   console.log(response)
  //   response.ref.getDownloadURL().then(function(url){

  //   })
  // });

  var d = new Date(date);
  let t = d.getSeconds();
  var month = d.getMonth();
  // console.log(amount);
  // console.log(category);
  if (amount == "" || description == "" || date == "" || category == "") {
    // alert("please fill all fields");
    swal({
      icon: "warning",
      title: "You Must Fill All Fields!",
    });
  } else {
    const storageRef = firebase.storage().ref(`expense/${Date.now()}.jpg`);
    storageRef.put(image).then(function (response) {
      response.ref.getDownloadURL().then(function (url) {
        firebase
          .firestore()
          .collection("transaction")
          .add({
            amount,
            description,
            date,
            category,
            userId,
            type: "expense",
            month,
            recepit: url,
          })
          .then(function () {
            // alert("transaction successful");
            swal({
              icon: "success",
              title: "Transaction Successful",
            });
            clearIncomeForm();
            getTransaction();
            $("#expenseModal").modal("hide");
          });
      });
    });
  }
}

// get transaction
function getTransaction() {
  const table = document.getElementsByTagName("tbody")[0];
  const userId = localStorage.getItem("userId");
  table.innerHTML = "";

  firebase
    .firestore()
    .collection("transaction")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        console.log(doc.data());
        const data = doc.data();

        const row = document.createElement("TR");
        const type = document.createElement("TD");
        const amount = document.createElement("TD");
        const category = document.createElement("TD");
        const date = document.createElement("TD");
        const arrow = document.createElement("TD");
        const arrow1 = document.createElement("TD");

        const image = document.createElement("TD");
        if (data.type == "income") {
          arrow.setAttribute("class", "fa fa-fw fa-arrow-up");
          arrow.setAttribute("style", "color:green;");
          arrow1.setAttribute("class", "fa fa-fw fa-arrow-right");
          arrow1.setAttribute("style", "color:green;");
        } else {
          arrow.setAttribute("class", "fa fa-fw fa-arrow-down");
          arrow.setAttribute("style", "color:red;");
          arrow1.setAttribute("class", "fa fa-fw fa-arrow-left");
          arrow1.setAttribute("style", "color:red;");
        }

        type.innerHTML = data.type;
        amount.innerHTML = data.amount;
        category.innerHTML = data.category;
        date.innerHTML = data.date.toDate();
        if (data.recepit == null) {
          image.innerHTML = `<img src="" width="100px"/>`;
        } else {
          image.innerHTML = `<img src="${data.recepit}"width="50" height="50"/>`;
        }
        // image.innerHTML = `<img  src="${data.recepit}" width="50" height="50" />`;

        row.appendChild(arrow1);
        row.appendChild(type);
        row.appendChild(amount);
        row.appendChild(category);
        row.appendChild(date);
        row.appendChild(image);
        row.appendChild(arrow);

        table.appendChild(row);
      });
    });
}

// filter button function
function filter() {
  const type = document.getElementById("filter-type").value;
  if (type == "all") {
    return getTransaction();
  }

  const table = document.getElementsByTagName("tbody")[0];
  const userId = localStorage.getItem("userId");
  table.innerHTML = "";

  firebase
    .firestore()
    .collection("transaction")

    .where("type", "==", type)
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        const data = doc.data();
        const row = document.createElement("TR");
        const type = document.createElement("TD");
        const amount = document.createElement("TD");
        const category = document.createElement("TD");
        const date = document.createElement("TD");
        const arrow = document.createElement("TD");
        const arrow1 = document.createElement("TD");

        const image = document.createElement("TD");
        if (data.type == "income") {
          arrow.setAttribute("class", "fa fa-fw fa-arrow-up");
          arrow.setAttribute("style", "color:green;");
          arrow1.setAttribute("class", "fa fa-fw fa-arrow-right");
          arrow1.setAttribute("style", "color:green;");
        } else {
          arrow.setAttribute("class", "fa fa-fw fa-arrow-down");
          arrow.setAttribute("style", "color:red;");
          arrow1.setAttribute("class", "fa fa-fw fa-arrow-left");
          arrow1.setAttribute("style", "color:red;");
        }

        type.innerHTML = data.type;
        amount.innerHTML = data.amount;
        category.innerHTML = data.category;
        date.innerHTML = data.date.toDate();
        if (data.recepit == null) {
          image.innerHTML = `<img src="" width="100px"/>`;
        } else {
          image.innerHTML = `<img src="${data.recepit}"width="50" height="50"/>`;
        }

        row.appendChild(arrow1);
        row.appendChild(type);
        row.appendChild(amount);
        row.appendChild(category);
        row.appendChild(date);
        row.appendChild(image);
        row.appendChild(arrow);
        table.appendChild(row);
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
$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
    },
    function (start, end, label) {
      console.log(
        "A new date selection was made: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD")
      );
    }
  );
});

// function submit() {

//   // if (name == "" || password == "") {
//   //   alert("please fill all fields");
//   // } else {
//   //   localStorage.setItem("name", JSON.stringify(name));
//   //   window.location.replace("transaction.html");
//   // }

// }
// console.log(firebase);
// function subnmit(){
// var email = document.getElementById("email").value;
// var password = document.getElementById("password").value;
// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });
// }

// Sign up function
console.log(firebase.firestore);
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullname = document.getElementById("fullname").value;
  const age = document.getElementById("age").value;
  console.log(email, password);
  if (email == "" || password == "" || fullname == "" || age == "") {
    swal({
      icon: "warning",
      title: "You Must Fill All Fields!",
    });
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      const userId = user.user.uid;
      // firebase.firestore().collection("user").add({
      firebase
        .firestore()
        .collection("user")
        .doc(userId)
        .set({
          email,
          fullname,
          age,
        })
        .then(function () {
          swal({
            icon: "success",
            title: "Successfully Registered",
            timer: 3000,
            showConfirmButton: false,
          });
        });
      window.location.replace("login.html");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // ...
      swal({
        icon: "warning",
        title: errorMessage,
      });
    });
}

// Sign in function
function signin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userResponse) {
      // alert("successfully logged in");
      const userId = userResponse.user.uid;
      localStorage.setItem("userId", userId);
      location.href = "transaction.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        icon: "warning",
        title: "You Must Fill All Fields!",
      });
      // ...
    });
}

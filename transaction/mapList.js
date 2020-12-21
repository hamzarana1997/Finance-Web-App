// var val1 = +prompt("enter 1st value");
// var ope = prompt("enter 1st operator");
// var val2 = +prompt("enter 2nd value");
// var res = 0;
// function calc(val1, ope, val2, res) {
//   if (ope == "+") {
//     return (res = val1 + val2);
//   } else if (ope == "-") {
//     return (res = val1 - val2);
//   } else if (ope == "*") {
//     return (res = val1 * val2);
//   } else if (ope == "/") {
//     return (res = val1 / val2);
//   } else {
//     return "incorrect operator";
//   }
// }
// alert(calc(val1, ope, val2, res));

var base = +prompt("enter base");
var perp = +prompt("enter perp");
var h = 0;
function hype(h) {
  function square(base, perp) {
    var a = Math.pow(base, 2);
    var b = Math.pow(perp, 2);
    return a + b;
  }

  return (h = Math.sqrt(square(base, perp)));
}
console.log(hype(h));

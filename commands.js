import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const keys = [
  "js-0",
  "js-1",
  "js-2",
  "js-3",
  "js-4",
  "js-5",
  "js-6",
  "js-7",
  "js-8",
  "js-9",
  "js-+",
  "js--",
  "js-*",
  "js-/",
  "js-.",
  "js-=",
];
let cmds = "";
keys.forEach((key) => {
  const cmd = key.substring(3, 4);
  if (cmd === "=") {
    document.getElementById(key).addEventListener("click", function () {
      compute();
    });
  } else {
    document.getElementById(key).addEventListener("click", function () {
      command(cmd);
    });
  }
});

const day = dayjs().format("HH:mm:ss - dddd, MM/D");
document.querySelector(".css-day").innerHTML = day;

function resetColor() {
  keys.forEach((key) => {
    document.getElementById(key).classList.remove("color-onclick");
  });
}
function changeColor(cmd) {
  keys.forEach((key) => {
    if (key.substring(3, 4) === cmd) {
      document.getElementById(key).classList.add("color-onclick");
    }
  });
}
function command(cmd) {
  resetColor();
  changeColor(cmd);
  cmds += cmd;
  const result = document.querySelector(".js-result");
  result.innerHTML = cmds;
}
function compute() {
  const result = document.querySelector(".js-result");
  resetColor();
  document.getElementById("js-=").classList.add("color-onclick");
  result.innerHTML = cmds;
  cmdsParse();
  cmds = "";
}
function getNumbers(operatorList) {
  let nums = [];
  let previousIndex = 0;
  let operant = undefined;
  operatorList.forEach((oper, index) => {
    operant = cmds.slice(previousIndex, oper.index);
    nums.push(Number(operant));
    previousIndex = oper.index + 1;
  });
  operant = cmds.slice(previousIndex, cmds.length);
  nums.push(Number(operant));
  return nums;
}
function myfun(ch, index, array) {
  return ch.operator === "*" || ch.operator === "/";
}
function operation() {
  const operatorList = [];
  for (let i = 0; i < cmds.length; i++) {
    if (
      cmds[i] === "+" ||
      cmds[i] === "-" ||
      cmds[i] === "*" ||
      cmds[i] === "/"
    ) {
      let oper = {
        operator: cmds[i],
        index: i,
      };
      operatorList.push(oper);
    }
  }
  const nums = getNumbers(operatorList);
  while (operatorList.find(myfun)) {
    for (let i = 0; i < operatorList.length; i++) {
      if (operatorList[i].operator === "*") {
        let newNum = nums[i] * nums[i + 1];
        nums[i] = newNum;
        nums.splice(i + 1, 1);
        operatorList.splice(i, 1);
        break;
      } else if (operatorList[i].operator === "/") {
        let newNum = nums[i] / nums[i + 1];
        nums[i] = newNum;
        nums.splice(i + 1, 1);
        operatorList.splice(i, 1);
        break;
      }
    }
  }
  let result = nums[0];
  for (let i = 0; i < operatorList.length; i++) {
    if (operatorList[i].operator === "+") {
      result += nums[i + 1];
    } else if (operatorList[i].operator === "-") {
      result -= nums[i + 1];
    }
  }
  return result;
}
function cmdsParse() {
  const result = document.querySelector(".js-result");
  const data = operation();
  if (data !== undefined) result.innerHTML = cmds + "=" + data.toFixed(2);
}

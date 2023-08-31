
function reverseStr(str) {
    //   return str.split("").reverse().join("")

    let listOfChars = str.split("");
    let reverseListOfChars = listOfChars.reverse();
    let reversedStr = reverseListOfChars.join("");
    return reversedStr
}
// console.log(reverseStr("hello"))

// ..............................................................................................


function isPalindrome(str) {
    let reverse = reverseStr(str)
    return str === reverse;
}
// console.log(isPalindrome('121'))

// .................................................................................

function convertDateToStr(date) {
    let dateStr = { day: "", month: "", year: "" };
    if (date.day < 10) {
        dateStr.day = "0" + date.day
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

// let date = {
//     day: 13, month: 3, year: 2020
// }
// console.log(convertDateToStr(date));

// ...........................................................................


function convertDateToStr(date) {
    let dayStr = String(date.day).padStart(2, '0');
    let monthStr = String(date.month).padStart(2, '0');
    let yearStr = String(date.year);

    return {
        day: dayStr,
        month: monthStr,
        year: yearStr
    };
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


// let date = {
//     day: 2,
//     month: 11,
//     year: 2020
// };

// console.log(getAllDateFormats(date));



function checkPalindromeForAllDateFormats(date) {
    let listOfPalindromes = getAllDateFormats(date);
    let flag = false;
    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break
        }
    }
    return flag
}

// let date = {
//     day: 2,
//     month: 11,
//     year: 2020
// };

// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// console.log(isLeapYear(2030));
function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;

            if (month > 12) {
                month = 1; // Reset month to 1 when it exceeds 12
                year++;
            }
        }
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// let date = {day:31,month:1,year:2020};
// console.log(getNextDate(date));

// ..........................................

function getNextPalindromeDate(date) {
    let ctr = 0;
    let nextDate = getNextDate(date);

    while (1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

let date = {
    day: 31, month: 12, year: 2020
}

// console.log(getNextPalindromeDate(date));


// .............................................................


let dateInputRef = document.querySelector("#date");
let showBtnRef = document.querySelector("#button");
let resultRef = document.querySelector("#result");

function clickHandler(e) {

    // console.log(dateInputRef.value);
    e.preventDefault();

    let bdayStr = dateInputRef.value

    if (bdayStr !== "") {
        let listOfDate = bdayStr.split("-");
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        // console.log(date);

        let isPalindrome = checkPalindromeForAllDateFormats(date);
        // console.log(isPalindrome);
        if (isPalindrome) {
            resultRef.innerText = "Yay! Your Birthday is a Palindrome !! 🤩🥳 ";
            // confetti({
            //     particleCount: 100,
            //     spread: 70,
            //     origin: { y: 0.6 },
            // });
        }



        else {
            let [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You Missed by ${ctr} days!`
        }
    }
}

showBtnRef.addEventListener("click", clickHandler);






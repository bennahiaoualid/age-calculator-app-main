let calcBtn = document.getElementById("calc");
let inputs = document.querySelectorAll(".input div input");
inputs.forEach(element=>{
    element.addEventListener("focus",event=>{
        event.currentTarget.parentElement.classList.remove("error");
    })
})

calcBtn.addEventListener("click",()=>{
    console.log("clicked")
    //let inputs = document.querySelectorAll(".input div input");
    let year = parseInt(inputs[2].value);
    let month = parseInt(inputs[1].value);
    let day = parseInt(inputs[0].value);
    if (inputCheck(year,month,day)){
        let age = diffDate(new Date(year,month-1,day));
        document.getElementById("year-res").innerHTML = age[0] ;
        document.getElementById("month-res").innerHTML = age[1] ;
        document.getElementById("day-res").innerHTML = age[2] ;
    }
})

function inputCheck(year,month,day){
    let res = true
    let msg = ""
    inputs.forEach((element)=>{
        res = true
        if (element.value == ""){
            msg = "This field is required";
            res = false;
        }
        else if (!Number.isInteger(parseInt(element.value))){
            msg = `Must be a valid ${element.id}`;
            res = false;
        }
        else{
            if( element.id == "year"){
                let currentYear = new Date();
                if(year > currentYear.getFullYear()){
                    msg = "Must be in the past";
                    res = false;
                }  
            }
            else if (element.id == "month") {
                if( month > 12 || month < 1){
                    msg = "Must be a valid month";
                    res = false;
                }  
            }
            else if (element.id == "day"){
                if( !isValidDate(day, month, year)){
                    msg = "Must be a valid day";
                    res = false;
                }  
            }
        }
        if (!res){
            element.parentElement.querySelector(".error-msg").innerHTML = msg;
            element.parentElement.classList.add("error");
        }

    })
    return res
}

function isValidDate(day, month, year) {
    // Array of days in each month (0 for February, to be handled separately)
    const daysInMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    // Check if the year is a leap year
    const isLeapYear = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
  
    // Update the number of days in February based on the leap year
    daysInMonth[1] = isLeapYear ? 29 : 28;
  
    // Check if the day is valid for the given month and year
    return day > 0 && day <= daysInMonth[month - 1];
  }

function diffDate(date){
    let currentDate = new Date();
    ///date = new Date(date);
    const timeDiff = currentDate.getTime() - date.getTime();

    // Calculate the difference in years, months, and days
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    return [years, months, days];
}
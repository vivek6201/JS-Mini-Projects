const displayPass = document.querySelector('#displayPass');

const copyPass = document.querySelector('#copyPass');
const lenDisplay = document.querySelector('[data-passLen]');
const inputSlider = document.querySelector('#inputSlider');
const generatePassBtn = document.querySelector('#generatePass');
const lowerCheck = document.querySelector("#lowercase");
const upperCheck = document.querySelector("#uppercase");
const numCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copyTxt = document.querySelector("#copyTxt");
const symbols = "!@#$%^&*()_+-=*/.,?;':{}[]";

// Setting Default Value
let password = "";
let passwordLen = 10;
let checkCount = 1;
handleSlider();


// Creating Functions
function handleSlider(){
    inputSlider.value = passwordLen;
    lenDisplay.innerHTML = passwordLen;
}

function getRndIntegers(min,max){
    return  Math.floor(Math.random() * (max-min)) + min;
}

function getLowercaseLetters(){
    let min = 97;
    let max = 123;

    return String.fromCharCode(getRndIntegers(min,max));
}

function getUppercaseLetters(){
    let min = 41;
    let max = 91;

    return String.fromCharCode(getRndIntegers(min,max));
}

function getRndNumbers(){
    return getRndIntegers(0,9);
}

function getRndSymbols(){
    return symbols.charAt(getRndIntegers(0,symbols.length+1));
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(password);
        copyTxt.innerText="copied";
    } 
    catch (err) {
        copyTxt.innerText="Failed";
        console.log("error occurred while copying text to clipboard",err);
    }

    copyTxt.classList.remove("hidden");
    setTimeout(()=>{
        copyTxt.classList.add("hidden");
    },2000);
}

function handleCheckChange(){
    checkCount = 0; 
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();
    }
}

//Adding Event listeners
inputSlider.addEventListener("input",(e) =>{
    passwordLen = e.target.value;
    handleSlider();    
})

copyPass.addEventListener("click",()=>{
    if(displayPass.value !== ""){
        copyContent();
    }
});

allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener("change",handleCheckChange);
})


generatePassBtn.addEventListener("click",()=>{
    if(checkCount <= 0) return;

    handleCheckChange();

    //reset Password
    password = "";

    let funcArr = [];

    if(lowerCheck.checked)
        funcArr.push(getLowercaseLetters);

    if(upperCheck.checked)
        funcArr.push(getUppercaseLetters);

    if(numCheck.checked)
        funcArr.push(getRndNumbers);

    if(symbolCheck.checked)
        funcArr.push(getRndSymbols);

    // include compulsory pass
    for(let i in funcArr){
        password += funcArr[i]();
    }


    //include remaining letters
    for(let i = 0; i< passwordLen - funcArr.length; i++){
        let randIndex = getRndIntegers(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //suffling the generated Pass
    // password = sufflePass();

    //show in Ui
    displayPass.value = password;


})




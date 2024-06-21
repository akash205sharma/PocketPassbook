console.log("Radhe Radhe");
// console.log(localStorage);

var income = 0;
var exp = 0;
// var n=0;


function givevalue(s) {
    if (localStorage.getItem(s) == undefined || localStorage.getItem(s) == "NaN")
        return 0;
    else return parseFloat(localStorage.getItem(s));
}


// let data=[
    [100,"Food","2024-06-18 11:27","red|-"],
    [100,"Food","2024-06-18 11:27","grn|+"]
// ]

// let d=[200,"Food","2024-06-18 11:27"]
// data.push(d);
// data+=["100","Food","2024-06-18 11:27"]
// localStorage.setItem('data',JSON.stringify(data));
// console.log(JSON.parse(localStorage.getItem('data')));

function displaydash() {
    document.querySelector(".income").querySelector(".data").outerHTML = `<span class="data">${givevalue('income')}</span>`
    document.querySelector(".exp").querySelector(".data").outerHTML = `<span class="data">${givevalue('exp')}</span>`
    document.querySelector(".savings").querySelector(".data").outerHTML = `<span class="data">${givevalue('income') - givevalue('exp')}</span>`
}
function displayhistory() {
    if (localStorage.getItem('data') != null) {
        let data = JSON.parse(localStorage.getItem('data'))
        data.forEach((row) => {
            document.querySelector(".history").children[1].innerHTML +=
                `<li>
                    <span class="amount ${row[3].split('|')[0]}"> ${row[3].split('|')[1]} ${row[0]}</span> 
                    <span class="info">${row[1]}</span>
                    <span class="date">${(row[2]).split('T')[0]} ${(row[2]).split('T')[1]}</span>
                </li>`
        });
    }
}
function clrhistory(){
    document.querySelector(".history").children[1].innerHTML=
    `<div class="nohistory">---- No History available ---- </div>`;
}

displaydash()
displayhistory()


function Addincome() {
    if (document.querySelector("#income_amt").value === "") alert("Enter Amount");
    else {
        let amt = parseFloat(document.querySelector("#income_amt").value);
        let info = document.querySelector("#income_info").value;
        let date = document.querySelector("#income_date").value;
        info = info.slice(0, 1).toUpperCase() + info.slice(1)
        if (date === '') date = "---T"

        document.querySelector(".history").children[1].innerHTML +=
            `<li>
                    <span class="amount">+ ${amt}</span> 
                        <span class="info">${info}</span>
                        <span class="date">${(date).split('T')[0]} ${(date).split('T')[1]}</span>
                </li>`

        // store  transactions data in local storage
        let d = [`${amt}`, `${info}`, `${date}`,"grn|+"]
        if (localStorage.getItem('data') != null) {
            let data = JSON.parse(localStorage.getItem('data'))
            data.push(d);
            localStorage.setItem('data', JSON.stringify(data));
        }
        else {
            localStorage.setItem('data', JSON.stringify([d]));
        }



        income = amt + givevalue('income')
        // console.log(income);

        localStorage.setItem('income', income);
        exp=localStorage.getItem('exp');
        document.querySelector(".income").querySelector(".data").outerHTML = `<span class="data">${income}</span>`
        document.querySelector(".savings").querySelector(".data").outerHTML = `<span class="data">${income - exp}</span>`


        // emty the input boxes
        document.querySelector("#income_amt").value = ''
        document.querySelector("#income_info").value = ''
        document.querySelector("#income_date").value = ''
    }
}
function Addexp() {
    if (document.querySelector("#exp_amt").value === "") alert("Enter Amount");
    else {
        let amt = parseFloat(document.querySelector("#exp_amt").value);
        let info = document.querySelector("#exp_info").value;
        let date = document.querySelector("#exp_date").value;
        info = info.slice(0, 1).toUpperCase() + info.slice(1)
        if (date === '') date = "---T"

        document.querySelector(".history").children[1].innerHTML +=
            `<li>
                    <span class="amount red">- ${amt}</span> 
                        <span class="info">${info}</span>
                        <span class="date">${(date).split('T')[0]} ${(date).split('T')[1]}</span>
                </li>`

        // store  transactions data in local storage
        let d = [`${amt}`, `${info}`, `${date}`,"red|-"]
        if (localStorage.getItem('data') != null) {
            let data = JSON.parse(localStorage.getItem('data'))
            data.push(d);
            localStorage.setItem('data', JSON.stringify(data));
        }
        else {
            localStorage.setItem('data', JSON.stringify([d]));
        }

        exp = amt + givevalue('exp')
        localStorage.setItem('exp', exp);

        income=localStorage.getItem('income');

        document.querySelector(".exp").querySelector(".data").outerHTML = `<span class="data">${exp}</span>`
        document.querySelector(".savings").querySelector(".data").outerHTML = `<span class="data">${income - exp}</span>`


        // refressing Input Boxes
        document.querySelector("#exp_amt").value = ''
        document.querySelector("#exp_info").value = ''
        document.querySelector("#exp_date").value = ''
    }
}
function clr(){
    if(confirm("Do You Want To Clear all Transaction History")){
        localStorage.removeItem('data');
        clrhistory()
        console.log("History Cleared");
    }
}
function del(){
    if(confirm("Do You Want To Delete all History")){
        console.log("All payments Deleted")
        localStorage.clear()
        displaydash()
        clrhistory()
    }
}


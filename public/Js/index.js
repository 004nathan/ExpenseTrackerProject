
var xValues = ["Savings","expenses","Investment"];
var yValues = [10,50,20];
var barColors = [
    'rgba(32, 137, 56, 1)',
    'rgba(255, 84, 98, 1)',
    'rgba(255, 206, 86, 1)'
];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues,
      borderWidth: 0.5
    }]
  },
  options: {
    title: {
      display: true,
    },
    legend: {
        labels: {
            fontColor: 'white',
        }
    }
  }
});


// get elements from attributes

// let addExpenseButton = document.getElementById('add-expense_id');
// let addExpenseButton1 = document.getElementById('add-expense_id1');
// let addExpenseButtonForm = document.getElementById('addexexpenseForm');
const showExpenseForm=()=>{
document.getElementsByClassName("add_expense_container")[0].style.marginLeft='0vw';
document.getElementsByClassName("addexpenseWholeContainer")[0].style.display='flex';
}
const hideExpenseForm=()=>{
    document.getElementsByClassName("add_expense_container")[0].style.marginLeft='104vw';
    document.getElementsByClassName("addexpenseWholeContainer")[0].style.display='none';
}
const addBalanceShow=()=>{
    let deleteDiv = document.getElementById('delete_div');
    deleteDiv.style.marginTop='400vh';
    document.getElementById('containerAdd').style.display='block';
    document.getElementById('containerBalance').style.display='flex';
}
const addBalanceHide=()=>{
    let deleteDiv = document.getElementById('delete_div');
    deleteDiv.style.marginTop='0vh';
    document.getElementById('containerAdd').style.display='none';
    document.getElementById('containerBalance').style.display='none';
}
function showDelete(ele){
let deleteDiv = document.getElementById('delete_div');
deleteDiv.style.marginTop='200vh';
document.getElementById('containerAdd').style.display='block';
document.getElementById('containerDelete').style.display='flex';
console.log(ele);
document.getElementById('delete_button').value=ele.getAttribute('element');
}
function hideDelete(ele){
    let deleteDiv = document.getElementById('delete_div');
    deleteDiv.style.marginTop='0vh';
    document.getElementById('containerAdd').style.display='none';
    document.getElementById('containerDelete').style.display='none';
    }
    
const setCategory=(value)=>{
document.getElementById('category').value=value;
console.log(document.getElementById('category').value)
}
const setDescription=(value)=>{
    // if(value != 'Custom'){
    //     document.getElementById('description').value=value;
    // }
  let selectTag = document.getElementById('description');
    if(value==='Custom'){
        const userValue = prompt('Hello');
        let customValue = document.createElement('option');
        customValue.value=userValue;
        customValue.innerHTML=userValue;
        selectTag.append(customValue);
        selectTag.value = userValue;
    }
    else{
        selectTag.value = value;
    }
}
const setPrompt = () => {
    console.log('hello');
    const userValue = prompt("Enter the Value");
}

const addExpenseAndCheckValue=(element,type)=>{
    console.log(type);
    let chartCategory = "";
let amount = document.getElementsByClassName('amountInputBox')[0].value;
let category = document.getElementById('category').value;
let description = document.getElementById('description').value;
if(amount!=""&&category!=""&&description!="" &&amount > 0){
console.log('fulfilled');
document.getElementsByClassName('errorForm')[0].style.display="none";
let total = element.getAttribute('total');
if(total > 0){
    if(description =='Savings'||description=='Investment'){
        chartCategory = description;
    }
    else{
        chartCategory ="expenses"
    }
    if(type=='insert'){
        let expenseDetails = {
            "amount":amount,
            "AmountCategory":category,
            "ExpenseDescription":description,
            "Category":chartCategory,
            "type":type
        }
        postToServer(expenseDetails);
    }
    else if(type=='update'){
        let expenseDetails = {
            "amount":amount,
            "AmountCategory":category,
            "ExpenseDescription":description,
            "Category":chartCategory,
            "type":type,
            "id":element.getAttribute('expenseid'),
            "nav":element.getAttribute('nav'),
        }
        console.log(expenseDetails)
        postToServer(expenseDetails);
    }
    console.log(element.getAttribute('expenseid'));
    
     
    }
    else{
        hideExpenseForm();
        addBalanceShow();
    }
}

else{
    document.getElementsByClassName('errorForm')[0].style.display="block";
}
}
async function postToServer(expenseDetails){
    fetch('/index',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
          "expenseDetails":expenseDetails,
        }),
    }).then(response=>{
            window.location.href='/index?id=1';
            return response;
    }).catch(err=>{
        console.log(err)
    });
}
const Kanban =()=>{
    window.location.href='/kanban?id=1';
}
const home =()=>{
    window.location.href='/home?id=1';
}
const about =()=>{
    window.location.href='/about?id=1';
}
const deleteData=(ele)=>{
   let element = JSON.parse(ele.value);
   console.log(element.id)
   let value={"id":element.id,
                        "type":'delete'}
postToServer(value);
}
const addBalance = (ele)=>{
    let amount = document.getElementById('addBalanceInput').value;
    if(amount !=""){
        addAmountInDataBase(amount);
        document.getElementsByClassName('errorMsgAdd')[0].style.display='none';
    }
    else{
        document.getElementsByClassName('errorMsgAdd')[0].style.display='block';
    }
  
}
async function addAmountInDataBase(amount){
    let expenseDetails =    {'id':1,"type":'add',"amount":amount};
    fetch('/index',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
      "expenseDetails":expenseDetails,
        }),
    }).then(response=>{
            window.location.href='/index?id=1';
            return response;
    }).catch(err=>{
        console.log(err)
    });
}
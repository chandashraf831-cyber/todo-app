let taskbtn=document.querySelector(".txtbtn");
let inpbtn=document.querySelector("#text");
let section=document.querySelector(".section")
let actbtn=document.querySelector(".active");
let cmplbtn=document.querySelector(".completed")
let footerspan=document.querySelector(".footerspan");
let taskleftspan=document.querySelector(".span");
let  taskleft=0;
let localdata = JSON.parse(localStorage.getItem("todos")) || [];
//uper mein sara dom event ka handler kain liye hm slected kiye hian bro
//inpbtn.value sain user ka current value le rahain hain ok
inpbtn.addEventListener("input",function(){
  console.log(inpbtn.value.trim())
})
//ye function dynamic todo kain liye create kiya jata hian bro
//ye  fuction new  todo  create user karne kain liye function bana 
function todoapp(){
  //usertodo sain bhai hm user user ka current ka value lete hain bro
   let userkatod0=inpbtn.value.trim();
   //bhai yeha per user ka condtion chek kar rhae hain bhai yaha per ye kam ho rahai hain bhai
   //empity user ka conditon check ho rha yaha per
  if(userkatod0=="")
  {
      alert("plese one todo fill")
      return false
  }
  //yaha per locatask ka ek object banaye hain hm jo user ka current valu le raha hainbro
  let localtask={
task:userkatod0,
completed:false
  }
  //locadata ek array  hin ho  is localtask  ka obkect ko push ka rahe hain bro
  localdata.push(localtask);
localStorage.setItem("todos", JSON.stringify(localdata));
  //yaha dynamic card ka user todo le raha hain
    let dynamicdiv=document.createElement("div");
    dynamicdiv.classList.add("section-three")
let taskaddDiv=document.createElement("div");
  taskaddDiv.classList.add("task-add")
  let inputcheckbox=document.createElement("input")
  inputcheckbox.type="checkbox"
let h3=document.createElement("h3");
taskaddDiv.append(inputcheckbox,h3)
let div=document.createElement("div");
let p=document.createElement("p")
p.classList.add("activebtn")
  p.textContent="Active"
  let iconbruse=document.createElement("i");
  iconbruse.classList="fa-solid fa-pen";
  let icondelete=document.createElement("i");
  icondelete.classList="fa-solid fa-trash-can"
  div.append(p,iconbruse,icondelete);
  dynamicdiv.append(taskaddDiv,div)
  section.append(dynamicdiv);
  //yaha per hm  user ka kuchh value hain jo dekh raha hain bhai
   if(userkatod0!=""){
         h3.textContent=userkatod0
  }
  //inpbtn .vlue bhi pura user ka value lene kain bat empity ho ja rah hain
inpbtn.value = ""
//yaha per checkbox ka  kam ho rha hin bhai check karne sain user true and false ka vlue deta
inputcheckbox.addEventListener("change",function(check){
  //yaha per yaha ho raha hin bbai ki agar user checkbox button click karnege to user true dega or ager checkbox untick rahega to value false rahega bro done
  localtask.completed=check.target.checked
  localStorage.setItem("todos", JSON.stringify(localdata));
  if(localtask.completed)
  {
    h3.style.textDecoration="line-through"
    dynamicdiv.style.backgroundColor = "lightgreen";
    p.textContent="completed"
    taskleftspan.textContent=--taskleft
  }//agr untick checkbox raha to value to false ho jayega bhai condotionn false  ho jayega to else wala  condotion chalega
  else{
 h3.style.textDecoration="none"
    dynamicdiv.style.backgroundColor =""
    p.textContent="Active"
    taskleftspan.textContent=++taskleft
  }
})
//icondelete btn sain bhai yahaper  delete btn sain user apna  current todo kao delte ka rahain 
icondelete.addEventListener("click",function(){
  console.log("ajj delete kar denge chaiyekuhh bi ho jaye ")
  //yaha per local storage sain deta  ko deete karenge bhai
  let result=localdata.findIndex((index)=>{
             return index.task===localtask.task;
  })
  if(result!=-1){
    localdata.splice(result,1)
    //locastorage mein date save kare kain liye
    localStorage.setItem('todos',JSON.stringify(localdata));
    dynamicdiv.remove();
  }
  if(p.textContent=="Active")
  {
    footerspan.textContent=--count
    taskleftspan.textContent=--taskleft

  }
  else {
    footerspan.textContent=--count
  }
})
return true
}
//yaha add to todo btn sain function ko call ho rha hin or dynamic kam ho raha haain
let count =localdata.length;
footerspan.textContent = count;
taskbtn.addEventListener("click", function () {
    let result = todoapp();

    if (result === true) {
        count++;
        footerspan.textContent = count;
        taskleft++;
        taskleftspan.textContent = taskleft;
    }
});
//yaha per hm all or active or completed card ko hi show karnege only
//yaha per all button folterka use ka rha hein
//All filter
let allbtn=document.querySelector(".all");
        allbtn.addEventListener("click",function(){
          let alltask=document.querySelectorAll(".section-three");
          alltask.forEach((tasks)=>{
            tasks.style.display="flex";
          })
        })
// Active filter
actbtn.addEventListener("click", function () {
  let allTasks = document.querySelectorAll(".section-three");

  allTasks.forEach(function (dynamicdiv) {
    let status = dynamicdiv.querySelector("p").textContent;

    if (status === "Active") {
      dynamicdiv.style.display = "flex";
    } else {
      dynamicdiv.style.display = "none";
    }
  });
});

// Completed filter
cmplbtn.addEventListener("click", function () {
  let allTasks = document.querySelectorAll(".section-three");

  allTasks.forEach(function (dynamicdiv) {
    let status = dynamicdiv.querySelector("p").textContent;

    if (status === "completed") {
      dynamicdiv.style.display = "flex";
    } else {
      dynamicdiv.style.display = "none";
    }
  });
});
//yaha per bhai hm clear button ka use kiye hain bro 
let clearbtn=document.querySelector("#clearAll");
clearbtn.addEventListener("click",function(){
  let dynamictodo=document.querySelectorAll(".section-three")
         dynamictodo.forEach((Task)=>{
          Task.remove();
         })
         localdata=[];
         localStorage.setItem("todos",JSON.stringify(localdata));
         //yaha per clear all data karne siann bhai sara task dlete hota  hain bhai show of data 0 ho jata ho jyega
         count=0
          footerspan.textContent=0;
          taskleft=0
          taskleftspan.textContent=0
})
//yaaha per code ko push kar rahe hain local storage ok
//uaha local data ko dynamic sain data le kar ayenge bhai
// bhai jab tum is function refrece karte ahin to ye function call hota hain
function createtask(task){
  let dynamicdiv = document.createElement("div");
    dynamicdiv.classList.add("section-three");

    let taskaddDiv = document.createElement("div");
    taskaddDiv.classList.add("task-add");

    let inputcheckbox = document.createElement("input");
    inputcheckbox.type = "checkbox";
    inputcheckbox.checked = task.completed;

    let h3 = document.createElement("h3");
    h3.textContent = task.task;
    taskaddDiv.append(inputcheckbox, h3);

    let div = document.createElement("div");

    let p = document.createElement("p");
    p.classList.add("activebtn");
    p.textContent = "Active";

    let iconbruse = document.createElement("i");
    iconbruse.classList = "fa-solid fa-pen";

    let icondelete = document.createElement("i");
    icondelete.classList = "fa-solid fa-trash-can";
  
    //yaha per purana data ko delete karenge bhai pk done
   icondelete.addEventListener("click", function () {
    let result = localdata.findIndex((index) => {
        return index.task === task.task;
    });

    if (result !== -1) {
        // Total tasks kam karo
        localdata.splice(result, 1);
        count--;
        footerspan.textContent = count;

        // Sirf Active task delete hone par taskleft kam karo
        if (task.completed === false) {
            taskleft--;
            taskleftspan.textContent = taskleft;
        }

        // LocalStorage update karo
        localStorage.setItem("todos", JSON.stringify(localdata));

        // Card remove karo
        dynamicdiv.remove();
    }
});
    div.append(p, iconbruse, icondelete);
    dynamicdiv.append(taskaddDiv, div);
    section.append(dynamicdiv);
   if (task.completed) {
    h3.style.textDecoration = "line-through";
    dynamicdiv.style.backgroundColor = "lightgreen";
    p.textContent = "completed";
}
else{
             h3.style.textDecoration="none"
    dynamicdiv.style.backgroundColor =""
     p.textContent="Active"
    taskleftspan.textContent=++taskleft
           }
               //yaha per checkbox ka  kam ho rha hin bhai check karne sain user true and false ka vlue deta
inputcheckbox.addEventListener("change",function(){
          task.completed = inputcheckbox.checked;
        localStorage.setItem("todos", JSON.stringify(localdata))
           if(task.completed) {
    h3.style.textDecoration="line-through"
    dynamicdiv.style.backgroundColor = "lightgreen";
     p.textContent="completed"
   taskleftspan.textContent=--taskleft
           }
           else{
             h3.style.textDecoration="none"
    dynamicdiv.style.backgroundColor =""
     p.textContent="Active"
    taskleftspan.textContent=++taskleft
           }

})

}
localdata.forEach(function (task) {
             console.log(task);
             createtask(task);
             
});
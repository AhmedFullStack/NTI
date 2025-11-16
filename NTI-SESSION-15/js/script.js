// let courses = ["html","css","js"]

// splice (index, deletedCount, item/s)
///// Array Methods 
// ------------exampls--------------
/// splice(index , deletedCount , item/s)
// let spliceAdd = courses.splice(2,0,"php")
// let spliceDelete = courses.splice(0,2,"php")
// ---------------------------

// ---------indexOf-----------
// تظهر رقم 
// index
// let indexOf = courses.indexOf("js")
// ------------length--------------
// تظهر عدد index

// let length = courses.length

//  console.log(length);
//  console.log(courses)

// for(let i = 0 ; i < nums.length ; i++ ){
//     //  console.log(nums[i])
//     console.log(i)
// }
// ------------------------------


// for(let item of nums){
//     console.log(item)
// }


// let fName =  ()=>{
//     return "Js"
// }

//  nums.forEach((item , i , arr)=>{
    // console.log(arr)
    // console.log(`index of ${i} = ${item}`)
    // if(item > 5) return item
// })
// console.log(element)

// ()=>{}

//    let result =  nums.find((item)=>{
//         return  item > 5
//     })

    // let result =  nums.find((item)=>item > 5)
    // let result =  nums.find((item)=>item > 50)

    // let index = nums.findIndex((item)=> item> 5)
    // let index = nums.findIndex((item)=> item> 50)



    // console.log(index)

// console.log(result)


    // let sum = (num)=>{
    //     if(num > 10 ) return true
    //     else return false
    // }
    //  let sum = (num)=>{
    //      return num > 10
    // }

    //   let sum = (num)=> num > 10
// 

    //   let newArray = nums.filter(item => item > 5)
    //   let newArray = nums.filter(item => item > 50)
    //   console.log(newArray)
    
// ------------project-----------------
let users = [
    {  
        userId : 1,   
        userName: "Nouran",
        userBalance: 2000,
    },
    { 
        userId : 2,
        userName: "Marwa",
        userBalance: 3000,
    }
]

function addUser(){
    let newUser = {
        userId: parseInt(prompt("Enter user ID")), // تحويل إلى رقم
        userName: prompt("Enter user first Name"),
        userBalance: parseFloat(prompt("Enter user Balance")) // تحويل إلى رقم
    }

    users.push(newUser);
    console.log(users);
}
// addUser()

// -----------------
function editUserBalanceByID(){
    let id = parseInt(prompt("Enter user ID to edit balance"));
    let newBalance = parseFloat(prompt("Enter new balance"));
    
    let user = users.find(user => user.userId === id);
    
    if(user) {
        user.userBalance = newBalance;
        console.log("Balance updated successfully");
        console.log(users);
    } else {
        console.log("User not found");
    }
}

// ----------------
function deleteUserById(){
    let id = parseInt(prompt("Enter user ID to delete user"));
    
    // البحث عن index المستخدم
    let userIndex = users.findIndex(user => user.userId === id);
    
    if(userIndex !== -1) {
        // حذف المستخدم من المصفوفة
        users.splice(userIndex, 1);
        console.log("User deleted successfully");
        console.log(users);
    } else {
        console.log("User not found");
    }
}

// استدعاء الدالة
// deleteUserById();
// استدعاء الدالة لتعديل الرصيد
// editUserBalanceByID();



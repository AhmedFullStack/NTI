
function looping(StartNum,endNum,BreakNum, contNum){
    if(StartNum != Number ){console.log("StartNum Not Number")}
    if(endNum != Number ){console.log("endNum Not Number")}
    if(BreakNum != Number ){console.log("BreakNum Not Number")}
    if(contNum != Number ){console.log("contNum Not Number")}
    for(i = StartNum; i<=endNum;  i++){
        if(i==contNum){continue;}
        console.log(i);
       if(i==BreakNum){break} 
    }
}



function prompitarray(){
    var coursesarray = ["HTML","CSS","JS","PHP"];
    var p = prompt("Please enter your courses:")

    if(coursesarray.includes(p)){
        console.log("Courses is available") ;
    }else{ 
       console.log("Courses Not available");
        coursesarray.push(p)
        console.log(coursesarray);
        }
}
prompitarray()



// console.log(looping(0,100,100,50))
// switch(i){}

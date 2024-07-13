#!/usr/bin/env node
import inquirer from "inquirer";

class student{
  static counter = 20000;
    id: number;
    name: string;
    courses:string[];
    balance: number;

    constructor(name:string){
       this.id = student.counter++;
       this.name = name ;
       this.courses = [];  // initialize an empty array for course
       this.balance =500;
    }
    // method to enroll a student in course

    enrollCourse(course:string){
        this.courses.push(course);
    }

    // method to view a student balance
    viewBalance(){
        console.log(`Balance for ${this.name} : $${this.balance}`)
    }

    // method to pay fees
    payFees(amount:number){
       this.balance = amount;
       console.log(`$${amount}Fess paid sucessfully for ${this.name}`);
    }

    // method to display student status
    showStatus(){
        console.log(`ID:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`course:${this.courses}`);
        console.log(`balance:${this.balance}`);
    }

}
// student manager class
  class studentManager{
    Students :student[];

    constructor(){
    this.Students = [];
    }
 // add new student

   addStudent(name:string){
   let Student = new student(name);
   this.Students.push(Student);
   console.log(`student:${name} added suceccfully ,student ID: ${Student.id}`)

   }
//  method to enrolled student
   enrollStudent(studentId:number,course:string){
   let student = this. findStudent(studentId);
   if(student){
    student.enrollCourse(course);
    console.log(`${student.name},enrolled in ${course} sucessfully`)

     }


   }
//  view student balance 
   viewstudentBalance(studentId:number){
    let student = this. findStudent(studentId)
    if(student){
       student.viewBalance();
    }
      else{
        console.log("student was not found,please enter a correct student id")
    }

   }
//     pay student fee
payFees(studentId:number,ammount:number){
    let student = this. findStudent(studentId);
    if(student){
        student.payFees(ammount);
    
    }
      else{
        console.log("student was not found,please enter a correct student id")
    }

}
//  display student status
showstudentSatus(studentId:number){
    let student = this. findStudent(studentId);
    if(student){
        student.showStatus();
    }
}
    // find student by student id 
    findStudent(studentId:number){
     return  this.Students.find(std => std.id === studentId )
    }
  }

//   main function to run the program
async function main() {
    console.log("Welcoome to student managment system")

   let StudentManager = new studentManager();

//    while loop to keep program runing
while(true){
 let choice = await inquirer.prompt([
   {
    name:"select",
    type: "list",
    message: "Select an option",
     choices:[
               "Add Student",
               "Enroll Student",
               "View Student Balance",
              " Pay fees",
              "Show Status",
              "Exit"           
          ]

       }


      ]);
    //   using switch case 
       
     switch(choice.select){
        case "Add Student":
        let nameInput = await inquirer.prompt([
            {
              name:"name",
              type: "input",
              message: "Enter a student name"

            }

        ]);
        StudentManager.addStudent(nameInput.name);
        break;

        case "Enroll Student":
          let courseInput = await inquirer.prompt([
            {
              name: "studentid",
              type: "number",
              message: "Enter a student id"
            },
            {
              name: "course",
              type: "input",
              message: "Enter a course name"
            }

          ]);
          StudentManager.enrollStudent(courseInput.studentid,courseInput.course);
          break;

           case "View Student Balance":
            let balanceInput = await inquirer.prompt([
              {
                name: "studentid",
                type: "number",
                message: "Enter a student id"
              }

            ]);
              StudentManager.viewstudentBalance(balanceInput.studentid);
              break;
            
              case  " Pay fees":
              let feeInput = await inquirer.prompt([

                {
                 name: "studentid",
                 type: "number",
                 message: "Enter a student id"

                },
                {
                  name:"amount",
                  type:"number",
                  message:"Enter the ammount to pay"
                }
              ]);
              StudentManager.payFees(feeInput.studentid,feeInput.amount);
              break;

              case "Show Status":
              let statusInput = await inquirer.prompt([
                {
                  name: "studentid" ,
                  type: "number" ,
                  message: "Enter a student id"                
                }
              ]);
              StudentManager.showstudentSatus(statusInput.studentid,);
              break;

              case "Exit" :
                console.log("Exiting...");
                process.exit();
        
        }

    }


}

// calling a main function
main();
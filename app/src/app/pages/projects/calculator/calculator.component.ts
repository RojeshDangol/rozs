import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  result: string = '';
  input = '';
  operator = '';
  
  operatorArray: String[] = [];
  numArray:any[] = [];
  displayInput = '';
  logs: string[]= [];

  opClicked = true;
  resultClicked = false;
  
  error: string = '';




  ngOnInit(): void {
  }

  getNumArray(num: any){
    if(this.resultClicked === true ){
      this.reset();
    }
    if(this.resultClicked === false){
      this.error = '';
      this.input = this.input + num;
      this.displayInput = this.displayInput + num;
      this.opClicked = false;
    }
  }

  getOperator(operator:any){
    if(this.opClicked === false && this.resultClicked === false)//to make sure user doesnot click multiple operator
    {
    this.numArray.push(parseFloat(this.input).toFixed(2));
    this.input = '';
    this.operator = operator;
    this.operatorArray.push(this.operator);
    this.displayInput = this.displayInput + operator;
    }
    this.opClicked = true;

   }

  getResult(){
   if(this.resultClicked === false){
    //  console.log(this.numArray[0])
    //     if(this.numArray[0] === 'undefined'){
    //       this.error = "No input";
    //     }
       
    //console.log(this.numArray[0]) returns NaN if no input
        if(this.opClicked === true){
          this.error = "Please enter valid input";
        // this.resultClicked = true;
        }else{
          this.numArray.push(parseFloat(this.input).toFixed(2));
          if(isNaN(this.numArray[0])){
          this.error = "No input";
        }else{
          //this.numArray.push(parseInt(this.input));
          this.input='';
          //console.log(...this.numArray);
          //console.log(...this.operatorArray);
          this.displayInput = this.displayInput + '=';
          this.calculateResult();
          this.saveLogs();
          this.resultClicked = true;
          }
        }
    }

  }


  calculateResult(){
    let opIndex: number;
    let opOrder: string[]= ['/', '*', '+', '-']

    for (let i in opOrder){
      let curOperator = opOrder[i]
      opIndex = this.operatorArray.findIndex(op => op === curOperator);
    //console.log("op",opIndex);
    console.log("number at index",this.numArray[opIndex]);
    //findIndex returns -1 if not found
    while ( opIndex !== -1){
        console.log("opIndex 1st", opIndex);
        console.log (this.calc(curOperator, this.numArray[opIndex], this.numArray[opIndex+1]));
        //save calculated value in current index and remove following one
        this.numArray[opIndex] = this.calc(curOperator, this.numArray[opIndex], this.numArray[opIndex+1]);
        this.operatorArray.splice(opIndex, 1); //remove operator 
        this.numArray.splice(opIndex+1, 1);
        console.log("Number Array", ...this.numArray);
        opIndex = this.operatorArray.findIndex(op => op === curOperator);
        console.log("opIndex 2nd", opIndex);
      }//while loop end
    }//for loop end
    this.result = this.numArray[0]; 
    
  }

  // deleteLastInput(){
  //   this.operatorArray.pop();
  //   this.numArray.pop();
  // }



  calc(o: string, x: number, y: number) {
    let z: number =  0;
    console.log ('x', x);
    console.log ('y', y);
    switch(o){
      case '+': { z = x+y;}
      break;
      case '-': { z = x-y;}
      break;
      case '*': { z = x*y;}
      break;
      case '/': { z = x/y; }
      break;
      default:{
        console.log("Invalid operator");
        break;
      }
    }
    console.log("sum", z);
    return z;
  }

  reset(){
    this.numArray = [];
    this.operatorArray = [];
    this.result = '';
    this.input = '';
    this.displayInput = '';
    this.error = '';
    this.opClicked = true;
    this.resultClicked = false;
  }

  saveLogs(){
   let log = this.displayInput + this.result;
   this.logs.push(log);
  }

  clearLogs(){
    this.logs = [];
  }


}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  private employees: Employee[]; 
  private getEmployeesSub;
  private loadingError: boolean = false;


  constructor(private emp: EmployeeService) {
   }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe(
      (employees: Employee[]) => {this.employees = employees; },
       (e) =>  {
        this.loadingError = true;
      }
    );
  }

  ngOnDestroy(){
    if(this.getEmployeesSub != 'undefined'){
      this.getEmployeesSub.unsubscribe();
    }
  }

}

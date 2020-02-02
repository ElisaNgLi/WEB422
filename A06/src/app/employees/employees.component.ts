import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  private employees: Employee[]; 
  private getEmployeesSub;
  private loadingError: boolean = false;
  private filteredEmployees: Employee[];


  constructor(private emp: EmployeeService, private router:Router) {
   }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees; 
        this.filteredEmployees = employees},
       (e) =>  {
        this.loadingError = true;
      }
    );
  }

  routeEmployee(id: string){
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUP(event: any) {
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((em) => 
    ((em.FirstName.toLowerCase().indexOf(substring) != -1) || 
    (em.LastName.toLowerCase().indexOf(substring) != -1) ||
    (em.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))

  }

  ngOnDestroy(){
    if(this.getEmployeesSub != undefined){
      this.getEmployeesSub.unsubscribe();
    }
  }

}

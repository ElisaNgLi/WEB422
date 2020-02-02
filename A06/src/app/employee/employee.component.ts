import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { EmployeeRaw } from '../data/employee-raw';
import { Position } from '../data/position';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{

  private paramSubscription: any;
  private employeeSubscription: any;
  private getPositionsSubscription: any;
  private saveEmployeeSubscription: any;
  employee: EmployeeRaw = new EmployeeRaw();
  private positions: Position[];
  private successMessage: boolean = false;
  private failMessage: boolean = false;

  constructor(private employeeS: EmployeeService, private act: ActivatedRoute, private positionS: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.act.params.subscribe((params) => {
      this.employeeSubscription = this.employeeS.getEmployee(params['_id']).subscribe((emp) => {
        this.employee = emp[0];
        this.getPositionsSubscription = this.positionS.getPositions().subscribe((data) => {
            this.positions = data;
        })
      })
    }
    )
  }

  onSubmit(){
    this.saveEmployeeSubscription = this.employeeS.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() =>{
        this.successMessage = false;
      }, 2500);
    }, () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    })
  }

  ngOnDestroy(){
    if(this.paramSubscription != undefined){
      this.paramSubscription.unsubscribe();
    }

    if(this.employeeSubscription != undefined){
      this.employeeSubscription.unsubscribe();
    }

    if(this.getPositionsSubscription != undefined){
      this.getPositionsSubscription.unsubscribe();
    }

    if(this.saveEmployeeSubscription != undefined){
      this.saveEmployeeSubscription.unsubscribe();
    }
  }

}

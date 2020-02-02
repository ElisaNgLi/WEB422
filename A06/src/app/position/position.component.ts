import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../data/position';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  private paramSubscription: any;
  private positionSubscription: any;
  private savePositionSubcripstion: any;
 position: Position = new Position();
  private successMessage: boolean = false;
  private failMessage: boolean = false;

  constructor(private positionS:PositionService, private act: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.act.params.subscribe((params) => {
      this.positionSubscription = this.positionS.getPosition(params['_id']).subscribe((pos) => {
        this.position = pos[0];
      })
    })
  }

  onSubmit(){
    this.savePositionSubcripstion = this.positionS.savePosition(this.position).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      },2500);
    }, () =>{
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      },2500);
    });
  }
  ngOnDestroy(){
    if(this.paramSubscription != undefined){
      this.paramSubscription.unsubscribe();
    }

    if(this.positionSubscription != undefined){
      this.positionSubscription.unsubscribe();
    }

    if(this.savePositionSubcripstion != undefined){
      this.savePositionSubcripstion.unsubscribe();
    }
  }

}

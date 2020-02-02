import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { Router } from "@angular/router";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  private positions: Position[];
  private getPositionsSub;
  private loadingError: boolean = false;

  constructor(private pos: PositionService, private router: Router) { }

 ngOnInit() {
    this.getPositionsSub = this.pos.getPositions().subscribe(
      (positions: Position[]) => {this.positions = positions; },
      (e) => {
        this.loadingError = true;
      }
    );
  }

  routePosition(id: string){
    this.router.navigate(['/position/', id]);
  }

  ngOnDestroy(){
    if(this.getPositionsSub != undefined){
      this.getPositionsSub.unsubscribe();
    }
  }

}

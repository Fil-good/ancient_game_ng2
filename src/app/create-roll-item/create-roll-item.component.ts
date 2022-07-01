import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Roll } from '../model/roll.model';

@Component({
  selector: 'app-create-roll-item',
  templateUrl: './create-roll-item.component.html',
  styleUrls: ['./create-roll-item.component.css']
})
export class CreateRollItemComponent implements OnInit {

getTotalPins = new AppComponent;
totalPins = this.getTotalPins.totalPinsPlayer1;
maxPins = 15 - this.totalPins.totalPins;


roll: Roll;
@Output() onRollCreated: EventEmitter<Roll>;

  constructor() {
    this.roll = new Roll(0);
    this.onRollCreated = new EventEmitter<Roll>();
   }

  ngOnInit(): void {
  }

  createRoll(form: NgForm): void {
    if (form.valid) {
      this.onRollCreated.emit(this.roll);
      this.roll = new Roll(0);
      form.resetForm(this.roll);
    }
  }
}

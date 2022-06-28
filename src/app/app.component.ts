import { Component, OnInit } from '@angular/core';
import { Roll } from './model/roll.model';
import { BowlingGame } from './model/bowling-game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'bowling-ng';

  bowlingGamePlayer1 = new BowlingGame([], "player1");
  bowlingGamePlayer2 = new BowlingGame([], "player2");

  // leave constructor empty of the real work
  constructor() {

   }

  ngOnInit(): void {

  }

  // playGame(): void {


  // }


  insertRollScore(r:Roll):void {
    this.bowlingGamePlayer1.rolls.push(r)
  }
}

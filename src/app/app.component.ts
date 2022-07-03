import { Component, OnInit, Output } from '@angular/core';
import { Roll } from './model/roll.model';
import { BowlingGame } from './model/bowling-game.model';
import { TotalPins } from './model/total-pins.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// priorities: 1. logic frame5/6/7/8 ;; 2. 7+8+8 max validation form, import variable in create roll from app.component
// UI player 1 , player 2 conditional css show both: one in grey , disable button

export class AppComponent implements OnInit {
  title = 'bowling-ng';


  bowlingGamePlayer1 = new BowlingGame([], "player1", true);
  bowlingGamePlayer2 = new BowlingGame([], "player2", false);
  rollsPlayer1 = this.bowlingGamePlayer1.rolls;
  rollsPlayer2 = this.bowlingGamePlayer2.rolls;

  rollsPerFramePlayer1 = [0,0,0];

  totalPinsPlayer1 = new TotalPins(0);
  //  roll index in frame (range: 0 -1- 2)
  indexRollFrame = 0;

  // index frame: 0-4 (5 frames)
  indexFrame = 0;

  rollZero = new Roll(0);
  rollRandom = { roll: 2 };
  gameIsOver = false;


  // leave constructor empty of the real work
  constructor() {
    this.totalPinsPlayer1 = new TotalPins(0);
   }

  ngOnInit(): void {

  }

  passToNextPlayer() {
    this.indexRollFrame = 0;
    this.totalPinsPlayer1.totalPins = 0;
    this.rollsPerFramePlayer1 = [0, 0, 0];
    this.bowlingGamePlayer1.isActive = false;
    this.bowlingGamePlayer2.isActive = true;
    this.indexFrame += 1;
  }

// try to make a function per frame
  insertRollPlayer1(r:Roll):void {
    this.rollsPlayer1.push(r)
      this.rollsPerFramePlayer1[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
      this.totalPinsPlayer1.totalPins += this.rollsPerFramePlayer1[this.indexRollFrame]; // number, starts with 0
      if (this.totalPinsPlayer1.totalPins == 15) {
        // if strike
          if(this.indexRollFrame==0) {
            this.rollsPlayer1.push(this.rollZero);
            this.rollsPlayer1.push(this.rollZero);
            this.passToNextPlayer()
            // case spare
          } else if (this.indexRollFrame==1) {
            this.rollsPlayer1.push(this.rollZero);
            this.passToNextPlayer();
            // case 15 pins after 3 rolls
          } else {
            this.passToNextPlayer()
            }
            // case not 15 pins in total
          } else if(this.indexRollFrame==2) {
            this.passToNextPlayer()
            } else {
              this.indexRollFrame += 1;
            }
      }



  insertRollPlayer2(r:Roll):void {
    this.rollsPlayer2.push(r) // specific to bowlGaPl2
    this.rollsPerFramePlayer1[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
    this.totalPinsPlayer1.totalPins += this.rollsPerFramePlayer1[this.indexRollFrame]; // number, starts with 0
    if (this.totalPinsPlayer1.totalPins == 15) {
      // if strike
      if (this.indexRollFrame == 0) {
        this.rollsPlayer2.push(this.rollZero);
        this.rollsPlayer2.push(this.rollZero);
        this.totalPinsPlayer1.totalPins = 0;
        this.rollsPerFramePlayer1 = [0, 0, 0];
        this.bowlingGamePlayer2.isActive = false;
        this.bowlingGamePlayer1.isActive = true;
        this.indexFrame += 1;
        // case spare
      } else if (this.indexRollFrame == 1) {
        this.rollsPlayer2.push(this.rollZero);
        this.totalPinsPlayer1.totalPins = 0;
        this.rollsPerFramePlayer1 = [0, 0, 0];
        this.indexRollFrame = 0;
        this.bowlingGamePlayer2.isActive = false;
        this.bowlingGamePlayer1.isActive = true;
        this.indexFrame += 1;
        // case 15 pins after 3 rolls
      } else {
        this.indexRollFrame = 0;
        this.rollsPerFramePlayer1 = [0, 0, 0];
        this.totalPinsPlayer1.totalPins = 0;
        this.bowlingGamePlayer2.isActive = false;
        this.bowlingGamePlayer1.isActive = true;
        this.indexFrame += 1;
      }
      // case not 15 pins in total
    } else if (this.indexRollFrame == 2) {
      this.indexRollFrame = 0;
      this.totalPinsPlayer1.totalPins = 0;
      this.rollsPerFramePlayer1 = [0, 0, 0];
      this.bowlingGamePlayer2.isActive = false;
      this.bowlingGamePlayer1.isActive = true;
      this.indexFrame += 1;
    } else {
      this.indexRollFrame += 1;
    }


  }

  playGame():void {
    while(!this.gameIsOver) {

    }
  }
}

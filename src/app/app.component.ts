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

  rollsPerFrame = [0,0,0];

  // total pinns trown !!
  totalPins = new TotalPins(0);
  //  roll index in frame (range: 0 -1- 2)
  indexRollFrame = 0;

  // index frame: 0-4 (5 frames) and then 3 more if strike.....
  indexFramePlayer1 = 0;
  indexFramePlayer2 = 0;

  rollZero = new Roll(0);
  rollRandom = { roll: 2 };

  maxNumberRollsPlayer1 = 15;
  maxNumberRollsPlayer2 = 15;
  gameIsOver = false;


  // leave constructor empty of the real work
  constructor() {
    this.totalPins = new TotalPins(0);
   }

  ngOnInit(): void {

  }

  passToNextPlayer() {
    this.indexRollFrame = 0;
    this.totalPins.totalPins = 0;
    this.rollsPerFrame = [0, 0, 0];
    this.bowlingGamePlayer1.isActive = !this.bowlingGamePlayer1.isActive;
    this.bowlingGamePlayer2.isActive = !this.bowlingGamePlayer2.isActive;
  }

// try to make a function per frame: check!
// spare = 15 pins after 2 OR 3 rolls!!!!!!!!!!!!!!!!!
  insertRollPlayer1(r:Roll):void {
    if (this.rollsPlayer1.length <= this.maxNumberRollsPlayer1) {
      this.rollsPlayer1.push(r)
        this.rollsPerFrame[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
        this.totalPins.totalPins += this.rollsPerFrame[this.indexRollFrame]; // number, starts with 0

        //  // starting from frame 5 apply other logic !!! ????
        if (this.indexFramePlayer1 == 5 && this.totalPins.totalPins == 15) {
          if(this.indexRollFrame==0) {
            this.maxNumberRollsPlayer1 = 16;
        // case spare in 2 rolls
          } else if (this.indexRollFrame == 1) {
            this.maxNumberRollsPlayer1 = 16;
          } else {
            this.maxNumberRollsPlayer1 = 17;
          }
        }

        if (this.totalPins.totalPins == 15) {
          // if strike
            if(this.indexRollFrame==0) {
              this.rollsPlayer1.push(this.rollZero);
              this.rollsPlayer1.push(this.rollZero);
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer()
              // case spare
            } else if (this.indexRollFrame==1) {
              this.rollsPlayer1.push(this.rollZero);
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer();
              // case 15 pins after 3 rolls
            } else {
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer()
              }
              // case not 15 pins in total
            } else if(this.indexRollFrame==2) {
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer()
              } else {
                this.indexRollFrame += 1;
              }
    } else {
    this.bowlingGamePlayer1.isActive = false;
    }
  }



// two functions for player 1/ player2 because you don't get the info from the form which player is at turn
  insertRollPlayer2(r:Roll):void {
    if (this.rollsPlayer2.length <= this.maxNumberRollsPlayer2) {
      this.rollsPlayer2.push(r) // specific to bowlGaPl2
      this.rollsPerFrame[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
      this.totalPins.totalPins += this.rollsPerFrame[this.indexRollFrame]; // number, starts with 0
      if (this.totalPins.totalPins == 15) {
        // if strike
        if (this.indexRollFrame == 0) {
          this.rollsPlayer2.push(this.rollZero);
          this.rollsPlayer2.push(this.rollZero);
          this.indexFramePlayer2 += 1;
          this.passToNextPlayer()
          // case spare
        } else if (this.indexRollFrame == 1) {
          this.rollsPlayer2.push(this.rollZero);
          this.indexFramePlayer2;
          this.passToNextPlayer()
          // case 15 pins after 3 rolls
        } else {
          this.indexFramePlayer2 += 1;
          this.passToNextPlayer()
        }
        // case not 15 pins in total
      } else if (this.indexRollFrame == 2) {
        this.indexFramePlayer2 += 1;
        this.passToNextPlayer()
      } else {
        this.indexRollFrame += 1;
      }
    } else {
    this.bowlingGamePlayer2.isActive = false;
    }
  }
   // if game is over for player 1 and not for player 2, then player 1 continues anyway !!! PROBLEM ! try to make 1 function for both players!!!!!!!
    GameIsOver(): boolean {
      if(this.rollsPlayer1.length > this.maxNumberRollsPlayer1 && this.rollsPlayer2.length > this.maxNumberRollsPlayer2) {
        return true;
      } else {
        return false;
      }
    }

}

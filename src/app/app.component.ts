import { Component, OnInit, Output } from '@angular/core';
import { Roll } from './model/roll.model';
import { BowlingGame } from './model/bowling-game.model';
import { TotalPins } from './model/total-pins.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// priorities: 1. logic what from frame 5 ?  ;; 2. 7+8+8 max validation form, import variable in create roll from app.component
// UI player 1 , player 2 conditional css show both: one in grey , disable button

export class AppComponent implements OnInit {
  bowlingGamePlayer1 = new BowlingGame([], "player1", true);
  bowlingGamePlayer2 = new BowlingGame([], "player2", false);
  rollsPlayer1 = this.bowlingGamePlayer1.rolls;
  rollsPlayer2 = this.bowlingGamePlayer2.rolls;
  rollsPerFrame = [0,0,0];
  // total pinns trown !!
  totalPins = new TotalPins(0);
  //  roll index in frame (range: 0 -1- 2)
  indexRollFrame = 0;
  // index frame: 0-4 (5 frames) and 1 more if strike/spare in 5th frame
  indexFramePlayer1 = 0;
  indexFramePlayer2 = 0;
  rollZero = new Roll(0);
  rollRandom = { roll: 2 };
  maxNumberRollsPlayer1 = 15;
  maxNumberRollsPlayer2 = 15;
  // leave constructor empty of the real work
  constructor() {
    this.totalPins = new TotalPins(0);
   }

  ngOnInit(): void {
  }

  passToNextPlayer() {
    this.bowlingGamePlayer1.isActive = !this.bowlingGamePlayer1.isActive;
    this.bowlingGamePlayer2.isActive = !this.bowlingGamePlayer2.isActive;
    this.indexRollFrame = 0;
    this.totalPins.totalPins = 0;
    // not used below?
    this.rollsPerFrame = [0, 0, 0];
  }


  // PROBLEM/ INDEX ROLL FRAME IS NOT SET TO 0 AFTER PLAYER 1 HAS FINISHED 4 4 5
// try to make a function per frame: check! // spare = 15 pins after 2 OR 3 rolls!
  insertRollPlayer1(r:Roll):void {
    // after execution: length == maxNumberRolls :-)
    if (this.rollsPlayer1.length < (this.maxNumberRollsPlayer1)) {
      this.rollsPlayer1.push(r)
        this.rollsPerFrame[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
        this.totalPins.totalPins += this.rollsPerFrame[this.indexRollFrame]; // number, starts with 0
        //  // starting from frame 5 (index is 4 beforehand) apply other logic !!! frame 5 is longer than the other frames!
        if ((this.indexFramePlayer1 == 4) && (this.totalPins.totalPins < 15) && (this.indexRollFrame == 2)) {
          this.passToNextPlayer();
        } else if ((this.indexFramePlayer1 == 4) && (this.totalPins.totalPins < 15) && (this.indexRollFrame < 2)) {
          this.indexRollFrame += 1;
        }
        // set max number of rolls, based on 5th frame. Frame 5 is not limited to three rolls!
        if(this.indexFramePlayer1 == 4 && this.totalPins.totalPins == 15) {
          if(this.indexRollFrame==0) {
            this.maxNumberRollsPlayer1 = 16;
            this.indexRollFrame += 1;
        // case spare in 2 rolls
          } else if (this.indexRollFrame == 1) {
            this.maxNumberRollsPlayer1 = 16;
            this.indexRollFrame += 1;
            // spare in 3 rolls // edge case! this could be the last roll!
          } else if (this.indexRollFrame == 2) {
            this.maxNumberRollsPlayer1 = 17;
            this.indexRollFrame += 1;
            }
          }
        // set the logic for the end of the game, in case of spare or strike in last frame
        if(this.indexFramePlayer1 == 4 && this.totalPins.totalPins > 15) {
          if(this.rollsPlayer1.length == this.maxNumberRollsPlayer1) {
            this.passToNextPlayer();
          }
        }
        if (this.indexFramePlayer1 < 4) {
          if (this.totalPins.totalPins == 15) {
            // if strike
            if (this.indexRollFrame == 0) {
              this.rollsPlayer1.push(this.rollZero);
              this.rollsPlayer1.push(this.rollZero);
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer();
              // case spare after 2 rolls
            } else if (this.indexRollFrame == 1) {
              this.rollsPlayer1.push(this.rollZero);
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer();
              // case 15 pins after 3 rolls
            } else {
              this.indexFramePlayer1 += 1;
              this.passToNextPlayer()
            }
            // case not 15 pins in total after 3 rolls
          } else if (this.indexRollFrame == 2) {
            this.indexFramePlayer1 += 1;
            this.passToNextPlayer()
            // case if frame is not over yet
          } else {
            this.indexRollFrame += 1;
          }
        }
    }
  }

// two functions for player 1/ player2 because you don't get the info from the form which player is at turn
  insertRollPlayer2(r:Roll):void {
    if (this.rollsPlayer2.length < (this.maxNumberRollsPlayer2)) {
      this.rollsPlayer2.push(r)
      this.rollsPerFrame[this.indexRollFrame] = r.roll; // array [0,0,0], starts with indexRollFrame 0
      this.totalPins.totalPins += this.rollsPerFrame[this.indexRollFrame]; // number, starts with 0
      // start with cases in frame 5
      if (this.indexFramePlayer2 == 4 && this.totalPins.totalPins < 15 && this.indexRollFrame == 2) {
        this.bowlingGamePlayer2.isActive = false;
      }
      if (this.indexFramePlayer2 == 4 && this.totalPins.totalPins < 15 && this.indexRollFrame < 2) {
        this.indexRollFrame += 1;
      }
      // set max number of rolls, based on 5th frame. Frame 5 is not limited to three rolls!
      if (this.indexFramePlayer2 == 4 && this.totalPins.totalPins == 15) {
        if (this.indexRollFrame == 0) {
          this.maxNumberRollsPlayer2 = 16;
          this.indexRollFrame += 1;
          // case spare in 2 rolls
        } else if (this.indexRollFrame == 1) {
          this.maxNumberRollsPlayer2 = 16;
          this.indexRollFrame += 1;
          // spare in 3 rolls // edge case! this could be the last roll!
        } else if (this.indexRollFrame == 2) {
          this.maxNumberRollsPlayer2 = 17;
          this.indexRollFrame += 1;
        }
      }
      // set the logic for the end of the game, in case of spare or strike in last frame
      if (this.indexFramePlayer2 == 4 && this.totalPins.totalPins > 15) {
        if (this.rollsPlayer2.length == this.maxNumberRollsPlayer2) {
          this.bowlingGamePlayer2.isActive = false;
        }
      }
      if (this.indexFramePlayer2 < 4) {
        if (this.totalPins.totalPins == 15) {
          // if strike
          if (this.indexRollFrame == 0) {
            this.rollsPlayer2.push(this.rollZero);
            this.rollsPlayer2.push(this.rollZero);
            this.indexFramePlayer2 += 1;
            this.passToNextPlayer();
            // case spare
          } else if (this.indexRollFrame == 1) {
            this.rollsPlayer2.push(this.rollZero);
            this.indexFramePlayer2 += 1;
            this.passToNextPlayer();
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
      }
    }
  }
}

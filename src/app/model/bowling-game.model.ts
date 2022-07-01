import { Roll } from './roll.model';

export class BowlingGame {
  constructor(public rolls:Roll[], public player:string, public isActive:boolean) { }
}

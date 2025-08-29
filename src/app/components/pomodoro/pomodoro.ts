import { ChangeDetectorRef, Component, computed, effect, signal} from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  selector: 'app-pomodoro',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.scss'
})
export class Pomodoro{
  readonly panelOpenState = signal(false);

  private duration = 0.1 * 60; // 25 min in seconds
  timeLeft = signal(this.duration);
  private intervalId: any;

  status = {
    currentStatus: "pause",
    nextAction: "play",
    buttonIcon: "play_circle_filled",
    buttonActionNow: "Start",
    buttonColor: "primary"
  };

  timerState = {
    focus: true,
    short: false,
    long: false,
    lastBreak: "LONG"
  }

  actionButtonClick(nextAction: string){
    if (nextAction == "play"){
      this.status.currentStatus = "play";
      this.status.nextAction = "pause";
      this.status.buttonIcon = "pause_circle_filled";
      this.status.buttonActionNow = "Pause";
      this.start();
    } else if (nextAction == "pause"){
      this.setButtonPlay();
      this.pause();
    };
  };

  setButtonPlay(){
    this.status.currentStatus = "pause";
    this.status.nextAction = "play";
    this.status.buttonIcon = "play_circle_filled";
    this.status.buttonActionNow = "Start";
  }

  displayTime = computed(() => {
    const minutes = Math.floor(this.timeLeft() / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft() % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(v => v - 1);
      } else {
        this.next();
      }
    }, 1000);
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.pause();
    this.setButtonPlay();
    this.timeLeft.set(this.duration);
  }

  next() {
    this.pause();
    this.setButtonPlay();

    if (this.timerState.focus == true){
      if (this.timerState.lastBreak == "SHORT"){
      this.timerState.focus = false;
      this.timerState.short = false;
      this.timerState.long = true;
      this.timerState.lastBreak = "LONG";
      this.timeLeft.set((0.1*40));
    } else if ( this.timerState.lastBreak == "LONG" ){
      this.timerState.focus = false;
      this.timerState.short = true;
      this.timerState.long = false;
      this.timerState.lastBreak = "SHORT";
      this.timeLeft.set((0.1*30));
    }
    }else {
      this.timerState.focus = true;
      this.timerState.short = false;
      this.timerState.long = false;
      this.timeLeft.set((0.1*50));
    };
    
  };

  ngOnDestroy() {
    this.pause();
  }

  
}

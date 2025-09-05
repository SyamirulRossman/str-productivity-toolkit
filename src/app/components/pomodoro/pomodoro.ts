import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, signal} from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { CUSTOM_PIPES_IMPORTS } from '../../shared/cutomPipe.imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pomodoro',
  imports: [MATERIAL_IMPORTS, CUSTOM_PIPES_IMPORTS],
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pomodoro{
  timerForm: FormGroup;

  readonly panelOpenState = signal(false);

  duration = Number((25 * 60).toFixed(0));
  shortBreakDuration = Number((5 * 60).toFixed(0));
  longBreakDuration = Number((10 * 60).toFixed(0));
  shortBreakLimiter = 1;

  timeLeft = signal(this.duration);
  private intervalId: any;

  audio: HTMLAudioElement;

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
    shortBreakCount: 0,
    lastBreak: "LONG"
  }

  constructor(
     private _fb: FormBuilder
  ) {
    this.audio = new Audio('assets/sounds/pomodoro_rings.mp3');
    this.timerForm = this._fb.group({
      duration: [this.duration/60],
      shortBreakDuration: [this.shortBreakDuration/60],
      longBreakDuration: [this.longBreakDuration/60],
      interval: [this.shortBreakLimiter, [Validators.min(1)]],
    });
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
    this.playSound();
    this.pause();
    this.setButtonPlay();

    if (this.timerState.focus == true){
      if (this.timerState.shortBreakCount == this.shortBreakLimiter){
      this.timerState.focus = false;
      this.timerState.short = false;
      this.timerState.long = true;
      this.timerState.lastBreak = "LONG";
      this.timerState.shortBreakCount = 0;
      this.timeLeft.set(this.longBreakDuration);
    } else if ( this.timerState.shortBreakCount < this.shortBreakLimiter ){
      this.timerState.focus = false;
      this.timerState.short = true;
      this.timerState.long = false;
      this.timerState.lastBreak = "SHORT";
      this.timerState.shortBreakCount++
      this.timeLeft.set(this.shortBreakDuration);
    }
    }else {
      this.timerState.focus = true;
      this.timerState.short = false;
      this.timerState.long = false;
      this.timeLeft.set(this.duration);
    };
    
  };

  switchCardClass(){
    if (this.timerState.short){
      return "blue-card"
    } else if (this.timerState.long){
      return "purple-card"
    } else {
      return "green-card"
    };
  };

  playSound() {
    this.audio.currentTime = 1;
    this.audio.play().catch(err => console.error('Play error:', err));
  }

  onSubmit() {
    if (this.timerForm.valid) {
      this.duration = Number((this.timerForm.get('duration')?.value * 60).toFixed(0));
      this.shortBreakDuration = Number((this.timerForm.get('shortBreakDuration')?.value * 60).toFixed(0));
      this.longBreakDuration = Number((this.timerForm.get('longBreakDuration')?.value * 60).toFixed(0));
      this.shortBreakLimiter = Number((this.timerForm.get('interval')?.value).toFixed(0));

      this.reset()
    } else {
      console.warn('Form is invalid', this.timerForm.errors);
    }
  }

  ngOnDestroy() {
    this.pause();
  };

}

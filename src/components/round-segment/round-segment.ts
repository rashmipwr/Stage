import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the RoundSegmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'round-segment',
  templateUrl: 'round-segment.html'
})
export class RoundSegmentComponent {
  @Input()
  leftTitle: any = '';
  @Input()
  rightTitle: any = '';
  isLeftSelected: boolean = false;

  @Output() output = new EventEmitter();

  constructor() {
    console.log('Hello RoundSegmentComponent Component');
  }

  selectRight() {
    this.isLeftSelected = true;
    this.output.emit(true);
  }

  selectLeft() {
    this.isLeftSelected = false;
    this.output.emit(false);
  }
}

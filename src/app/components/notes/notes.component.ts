import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';

import { Note } from '../../models/note.model';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(300, keyframes(kf.slideOutLeft))),
      transition(
        '* => slideOutRight',
        animate(300, keyframes(kf.slideOutRight))
      )
    ])
  ]
})
export class NotesComponent implements OnInit {
  @Input() uid: string;
  @ViewChild('notebox') notebox: ElementRef;

  notes$: Observable<Note[]>;

  // Map with each note state animation
  animationState = {};

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.notes$ = this.store.select(fromStore.selectAll);
  }

  createNote() {
    const message = this.notebox.nativeElement.value;
    const note: Note = {
      id: new Date().getUTCMilliseconds().toString(),
      message,
      createdAt: Date.now()
    };

    this.store.dispatch(new fromStore.Create(note, this.uid));

    // Reseta notebox
    this.notebox.nativeElement.value = '';
  }

  // updateNote(id, message) {
  //   this.store.dispatch(
  //     new fromStore.Update(id, this.uid, { message: message })
  //   );
  // }

  deleteNote(id) {
    this.store.dispatch(new fromStore.Remove(id, this.uid));
  }

  getDate(note: Note) {
    const date = new Date(note.createdAt);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  getTime(note: Note) {
    const date = new Date(note.createdAt);
    return (
      this.twoDigits(date.getHours()) +
      ':' +
      this.twoDigits(date.getMinutes()) +
      ':' +
      this.twoDigits(date.getSeconds())
    );
  }

  startAnimation(state: string, id: string) {
    if (!this.animationState[id]) {
      this.animationState[id] = state;

      switch (state) {
        case 'slideOutRight':
        case 'slideOutLeft':
          setTimeout(() => {
            this.deleteNote(id);
          }, 200);
          break;
        default:
          break;
      }
    }
  }

  resetAnimationState(id: string) {
    this.animationState[id] = '';
  }

  private twoDigits(num: number) {
    const str = num.toString();
    if (str.length === 1) {
      return '0' + str;
    }
    return str;
  }
}

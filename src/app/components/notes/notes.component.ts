import { Component, OnInit, Input } from '@angular/core';

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
      transition(
        '* => slideOutLeft',
        animate(1000, keyframes(kf.slideOutLeft))
      ),
      transition(
        '* => slideOutRight',
        animate(1000, keyframes(kf.slideOutRight))
      )
    ])
  ]
})
export class NotesComponent implements OnInit {
  @Input() uid: string;

  notes$: Observable<Note[]>;

  // Map with each note state animation
  animationState = {};

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.notes$ = this.store.select(fromStore.selectAll);
  }

  createNote(event: any) {
    const message = event.value;
    const note: Note = {
      id: new Date().getUTCMilliseconds().toString(),
      message,
      createdAt: new Date(Date.now())
    };

    this.store.dispatch(new fromStore.Create(note, this.uid));

    // Reseta notebox
    event.value = null;
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
    return (
      note.createdAt.getDate() +
      '/' +
      (note.createdAt.getMonth() + 1) +
      '/' +
      note.createdAt.getFullYear()
    );
  }

  getTime(note: Note) {
    return (
      note.createdAt.getHours() +
      ':' +
      note.createdAt.getMinutes() +
      ':' +
      note.createdAt.getSeconds()
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
          }, 900);
          break;
        default:
          break;
      }
    }
  }

  resetAnimationState(id: string) {
    this.animationState[id] = '';
  }
}

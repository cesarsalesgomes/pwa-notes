import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as actions from '../notes.action';
import * as fromNotes from '../notes.reducer';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes$: Observable<any>;

  constructor(private store: Store<fromNotes.State>) { }

  ngOnInit() {
    this.notes$ = this.store.select(fromNotes.selectAll);
  }

  createNote() {
    const note: fromNotes.Note = {
      id: new Date().getUTCMilliseconds().toString(),
      message: '...'
    };
    this.store.dispatch(new actions.Create(note));
  }

  updateNote(id, message) {
    this.store.dispatch(new actions.Update(id, { message: message }))
  }

  deleteNote(id) {
    this.store.dispatch(new actions.Delete(id));
  }

}
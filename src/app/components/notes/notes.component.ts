import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Note } from '../../models/note.model';

// import * as actions from '../notes.action';
// import * as fromNotes from '../notes.reducer';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes$: Observable<any>;

  // constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
  //   // this.notes$ = this.store.select(fromStore.selectAll);
  }

  // createNote() {
  //   const note: Note = {
  //     id: new Date().getUTCMilliseconds().toString(),
  //     message: '...'
  //   };
  //   this.store.dispatch(new fromStore.Create(note));
  // }

  // updateNote(id, message) {
  //   this.store.dispatch(new fromStore.Update(id, { message: message }));
  // }

  // deleteNote(id) {
  //   this.store.dispatch(new fromStore.Delete(id));
  // }
}

import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Note } from '../models/note.model';
import { User } from '../models/user.model';

@Injectable()
export class NoteService {
  constructor(private afs: AngularFirestore) {}

  getNotes(user: User): Observable<any> {
    return this.afs.collection<Note>(`users/${user.uid}/notes`).stateChanges();
  }

  createNote(note: Note, uid: string): Promise<any> {
    return this.afs
      .collection(`users/${uid}/notes`)
      .doc(note.id)
      .set(note);
  }

  updateNote(data: any): Promise<any> {
    const ref = this.afs.doc<Note>(`users/${data.uid}/notes/${data.id}`);
    return ref.update(data.changes);
  }

  removeNote(data: any): Promise<any> {
    const ref = this.afs.doc<Note>(`users/${data.uid}/notes/${data.id}`);
    return ref.delete();
  }
}

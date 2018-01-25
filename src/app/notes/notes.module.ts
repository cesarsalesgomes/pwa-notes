import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesComponent } from './notes/notes.component';

import { StoreModule } from '@ngrx/store';
import { notesReducer } from './notes.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('notes', notesReducer)
  ],
  exports: [NotesComponent],
  declarations: [NotesComponent]
})
export class NotesModule { }

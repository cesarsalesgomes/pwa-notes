import { Component, OnInit } from '@angular/core';

// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from './models/user.model';
// import * as userActions from './actions/user.actions';

interface AppState {
  user: User;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // user$: Observable<User>;

  // constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.user$ = this.store.select('user');

    // this.store.dispatch(new userActions.GetUser());
  }
}

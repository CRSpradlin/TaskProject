import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userLoggedOut } from 'src/app/actions/user.actions';
import { AppState, selectUserLoggedInBoolean } from 'src/app/reducers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loggedIn$?: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectUserLoggedInBoolean);
  }

  logOut(): void {
    this.store.dispatch(userLoggedOut());
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUserData, selectUserLoggedInBoolean } from 'src/app/reducers';
import { UserData } from 'src/app/reducers/user.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn$?: Observable<boolean>;
  userData$?: Observable<UserData>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectUserLoggedInBoolean);
    this.userData$ = this.store.select(selectUserData);
  }

}

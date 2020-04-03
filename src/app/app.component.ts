import { getVenuesSelector } from './modules/venues/store/venues.selector';
import { AppState } from 'src/app/store/app.reducer';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadVenues } from './modules/venues/store/venues.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Import Leads';
  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadVenues());
  }
}

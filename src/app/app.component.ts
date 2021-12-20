import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from './app-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-book';

  constructor(private store:Store){}

  ngOnInit(){
    this.store.dispatch(loadBooks())
  }
}

import { Component, signal } from '@angular/core';
import { GreetingComponent } from './greeting.component';

@Component({
  imports: [GreetingComponent],
  selector: 'app-root',
  template: '<h1>Hello, demo-frontend</h1><app-greeting />',
})
export class App {
  protected readonly title = signal('demo-frontend');
}

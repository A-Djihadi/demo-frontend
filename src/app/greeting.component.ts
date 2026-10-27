import { Component, inject, signal } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: `
    <div>
      <label for="greeting-name">Votre prénom</label>
      <input
        id="greeting-name"
        type="text"
        [value]="name()"
        (input)="name.set($any($event.target).value)"
      />
      <button type="button" (click)="greet()">Saluer</button>

      @if (message(); as msg) {
        <p data-testid="message">{{ msg }}</p>
        <p data-testid="secret">
          Secret Vault chargé : {{ secretLoaded() ? 'oui' : 'non' }}
        </p>
      }
      @if (error()) {
        <p data-testid="error">{{ error() }}</p>
      }
    </div>
  `,
})
export class GreetingComponent {
  private readonly greetingService = inject(GreetingService);

  readonly name = signal('');
  readonly message = signal<string | null>(null);
  readonly secretLoaded = signal(false);
  readonly error = signal<string | null>(null);

  greet(): void {
    this.message.set(null);
    this.error.set(null);
    this.greetingService.greet(this.name()).subscribe({
      next: (response) => {
        this.message.set(response.message);
        this.secretLoaded.set(response.secretLoaded);
      },
      error: () => {
        this.error.set('Backend injoignable');
      },
    });
  }
}
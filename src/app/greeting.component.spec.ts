import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GreetingComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function setup() {
    const fixture = TestBed.createComponent(GreetingComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input') as HTMLInputElement;
    const button = el.querySelector('button') as HTMLButtonElement;
    return { fixture, el, input, button };
  }

  it('envoie une requête GET /api/greeting?name=Ana après saisie et clic', () => {
    const { fixture, input, button } = setup();

    input.value = 'Ana';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    const req = httpMock.expectOne('/api/greeting?name=Ana');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Bonjour, Ana', secretLoaded: true });
  });

  it('affiche le message et le statut du Secret Vault', () => {
    const { fixture, el, input, button } = setup();

    input.value = 'Ana';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    httpMock
      .expectOne('/api/greeting?name=Ana')
      .flush({ message: 'Bonjour, Ana', secretLoaded: true });
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="message"]')?.textContent).toContain('Bonjour, Ana');
    expect(el.querySelector('[data-testid="secret"]')?.textContent).toContain(
      'Secret Vault chargé : oui',
    );
  });

  it('affiche "Backend injoignable" en cas d\'erreur 500', () => {
    const { fixture, el, input, button } = setup();

    input.value = 'Ana';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    httpMock
      .expectOne('/api/greeting?name=Ana')
      .flush('error', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="error"]')?.textContent).toContain(
      'Backend injoignable',
    );
  });
});
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GreetingResponse {
  message: string;
  secretLoaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class GreetingService {
  private readonly http = inject(HttpClient);

  greet(name: string): Observable<GreetingResponse> {
    return this.http.get<GreetingResponse>('/api/greeting', { params: { name } });
  }
}
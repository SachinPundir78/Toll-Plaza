import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateTollLogRequest, TollLog, UpdateTollLogRequest } from '../models/toll-log.model';

@Injectable({ providedIn: 'root' })
export class TollLogService {
  private readonly apiUrl = 'http://localhost:5000/logs';

  constructor(private readonly http: HttpClient) {}

  getLogs(): Observable<TollLog[]> {
    return this.http.get<TollLog[]>(this.apiUrl);
  }

  createLog(payload: CreateTollLogRequest): Observable<TollLog> {
    return this.http.post<TollLog>(this.apiUrl, payload);
  }

  updateLog(id: string, payload: UpdateTollLogRequest): Observable<TollLog> {
    return this.http.put<TollLog>(`${this.apiUrl}/${id}`, payload);
  }

  deleteLog(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getTotalAmount(): Observable<{ total_amount: number }> {
    return this.http.get<{ total_amount: number }>(`${this.apiUrl}/total-amount`);
  }
}

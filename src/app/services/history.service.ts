import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryData } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryService {

  private dataSubject = new BehaviorSubject<HistoryData | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(){
    this.loadInitial();
  }

  // =========================
  // CARGAR
  // =========================
  private loadInitial(){

    const saved = localStorage.getItem('historyData');

    if(saved){
      this.dataSubject.next(JSON.parse(saved));
      return;
    }

    // DATA DEFAULT
    const data: HistoryData = {
      heroTitle: 'NUESTRA HISTORIA',
      timeline: [
        {
          image: 'prueba.jpg',
          alt: 'Varel logo',
          stories: [
            { year: '1947', text: 'Fundación en Delaware' },
            { year: '1950', text: 'Producción inicial' }
          ]
        }
      ]
    };

    this.dataSubject.next(data);
  }

  // =========================
  // UPDATE
  // =========================
  update(data: HistoryData){

    const clone = JSON.parse(JSON.stringify(data));

    localStorage.setItem('historyData', JSON.stringify(clone));
    this.dataSubject.next(clone);

    console.log('🔥 history actualizado', clone);
  }

  getData(): HistoryData | null{
    return this.dataSubject.value;
  }
}
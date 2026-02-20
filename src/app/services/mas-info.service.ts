import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MasInfoData } from '../models/masinfo.model';

@Injectable({ providedIn: 'root' })
export class MasInfoService {
  private readonly STORAGE_KEY = 'masInfoData';
  private _data: MasInfoData = this.getDefaultData();
  public data$ = new BehaviorSubject<MasInfoData>(this._data);

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this._data = JSON.parse(saved);
      } catch {
        this._data = this.getDefaultData();
      }
    }
    this.data$.next(this._data);
  }

  getData(): MasInfoData {
    return JSON.parse(JSON.stringify(this._data));
  }

  updateData(data: MasInfoData) {
    this._data = JSON.parse(JSON.stringify(data));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._data));
    this.data$.next(this._data);
  }

  reset() {
    this._data = this.getDefaultData();
    localStorage.removeItem(this.STORAGE_KEY);
    this.data$.next(this._data);
  }

  private getDefaultData(): MasInfoData {
    return {
      hero: {
        titulo: 'LO QUE SE NECESITA',
        subtitulo: 'Brocas fabricadas especialmente para sus operaciones.',
        imagenFondo: 'https://www.terelion.com/wp-content/uploads/2021/07/home-page-banner.jpg'
      },
contentSections : [
  {
    titulo: 'Lo que se necesita para realizar el trabajo.',
    parrafos: [
      'Esta línea de trabajo no es para todos...',
      'Trabajamos con todos nuestros clientes...'
    ]
  }
        
      ],
      sections: [
        {
          titulo: 'Confíe en Terelion. Tenemos lo que se necesita.',
          parrafos: [
            'Lograr ese avance al final de un largo día de trabajo.',
            'Confíe en Terelion para operaciones más productivas.'
          ],
          imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/image-1-1024x768.jpg'
        },
        {
          titulo: 'Brocas de calidad para lograr el avance',
          parrafos: [
            'Nuestras brocas están diseñadas para rendimiento y durabilidad.'
          ],
          imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/image-2-1024x768.jpg',
          reverse: true
        }
      ],
      bottomBanner: {
        titulo: '¿Listo para avanzar?',
        texto: 'Hablemos sobre cómo podemos apoyar sus operaciones.',
        imagen: 'https://www.terelion.com/wp-content/uploads/2021/07/home-page-banner.jpg'
      }
    };
  }
}
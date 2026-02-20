import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralProductData } from '../models/general-product';

@Injectable({ providedIn: 'root' })
export class GeneralProductService {
  private readonly STORAGE_KEY = 'generalProductData';

  private _data: GeneralProductData = this.getDefaultData();
  public data$ = new BehaviorSubject<GeneralProductData>(this._data);

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

  getData(): GeneralProductData {
    return JSON.parse(JSON.stringify(this._data));
  }

  updateData(data: GeneralProductData) {
    this._data = JSON.parse(JSON.stringify(data));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._data));
    this.data$.next(this._data);
  }

  reset() {
    this._data = this.getDefaultData();
    localStorage.removeItem(this.STORAGE_KEY);
    this.data$.next(this._data);
  }

  private getDefaultData(): GeneralProductData {
    return {
      headerData: {
        titulo: 'BROCAS TRICÓNICAS',
        descripcion: 'Soluciones diseñadas para rendimiento y durabilidad.',
        breadcrumbs: ['PRODUCTOS', 'BROCAS']
      },
      infoSection: {
        texto: 'Conoce nuestra gama de productos y encuentra el ideal para tu operación.',
        boton: { label: 'CONTÁCTANOS', link: '/contactos' }
      },
      products: [
        { title: 'Producto 1', image: 'assets/products/bit1.png', link: '#' },
        { title: 'Producto 2', image: 'assets/products/bit2.png', link: '#' }
      ]
    };
  }
}

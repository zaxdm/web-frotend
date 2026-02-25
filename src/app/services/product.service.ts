import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HeroProduct } from '../models/product.model';
import { API_BASE_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private defaultProduct: HeroProduct = {
    breadcrumbs: [
      { label: 'PRODUCTOS', link: '/productos' },
      { label: 'BROCAS DE RODILLO CÓNICO', link: '/productos/brocas-de-rodillo' }

    ],
    title: 'RIDGEBACK™',
    subtitle: 'Perforación de roca dura',
    descriptions: [
      'Brocas giratorias para perforación de pozos en roca dura. Camisa especialmente diseñada para ayudar en la evacuación rápida de esquejes. Los cojinetes abiertos de alta carga, la estructura de corte robusta y el tratamiento con carburo HET proporcionan altas tasas de penetración y una larga vida útil. Los conos ventilados (de 9» de diámetro y superiores) proporcionan limpieza adicional de los rodamientos y reducción del calor.',
      'Los productos RIDGEBACK™ contienen cojinetes de mayor vida útil, protección adicional contra calibres y elementos de estructura de corte mejorados para su uso en aplicaciones de alta caída.'
    ], 
    mainImage: 'hero (1).webp',
    thumbnails: ['hero (1).webp'],
    contactLink: '#',
    features: [
  {
    title: 'RETENCIÓN DE BOQUILLAS DE UÑAS',
    description: 'Incluso en las condiciones más abrasivas se elimina la pérdida de boquillas.'
  }
  ],
    downloads: [
  {
    title: 'Catálogo de productos',
    description: 'Descarga el catálogo en PDF.',
    link: ''
  }
  ]
  };

  private productId: number | null = null;
  private productSubject = new BehaviorSubject<HeroProduct>(this.getProduct());
  public product$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFromBackend();
  }

  // obtener producto
  getProduct(): HeroProduct {
    const saved = localStorage.getItem('productData');
    return saved ? JSON.parse(saved) : this.defaultProduct;
  }
  setProductId(id: number) {
    this.productId = id;
    this.loadFromBackend(id);
  }

  // guardar producto
  async updateProduct(data: HeroProduct) {
    localStorage.setItem('productData', JSON.stringify(data));
    this.productSubject.next(data);
    try {
      const fd = new FormData();
      fd.append('title', data.title || '');
      if (data.subtitle != null) fd.append('subtitle', data.subtitle || '');
      fd.append('mainImage', data.mainImage || '');
      fd.append('contactLink', data.contactLink || '#');
      fd.append('descriptions', JSON.stringify(data.descriptions || []));
      fd.append('thumbnails', JSON.stringify(data.thumbnails || []));
      fd.append('breadcrumbs', JSON.stringify(data.breadcrumbs || []));
      fd.append('features', JSON.stringify(data.features || []));
      fd.append('downloads', JSON.stringify(data.downloads || []));
      if (this.productId) {
        await this.http.put(`${API_BASE_URL}/products/${this.productId}`, fd).toPromise();
      } else {
        const created: any = await this.http.post(`${API_BASE_URL}/products`, fd).toPromise();
        if (created?.id) this.productId = created.id;
      }
    } catch {}
  }

  async updateProductWithFiles(data: HeroProduct, downloadFiles: (File | null)[]) {
    localStorage.setItem('productData', JSON.stringify(data));
    this.productSubject.next(data);
    try {
      const fd = new FormData();
      fd.append('title', data.title || '');
      if (data.subtitle != null) fd.append('subtitle', data.subtitle || '');
      fd.append('mainImage', data.mainImage || '');
      fd.append('contactLink', data.contactLink || '#');
      fd.append('descriptions', JSON.stringify(data.descriptions || []));
      fd.append('thumbnails', JSON.stringify(data.thumbnails || []));
      fd.append('breadcrumbs', JSON.stringify(data.breadcrumbs || []));
      fd.append('features', JSON.stringify(data.features || []));
      fd.append('downloads', JSON.stringify(data.downloads || []));
      (downloadFiles || []).forEach((file, idx) => {
        if (file) fd.append(`download_${idx}`, file, file.name);
      });
      if (this.productId) {
        await this.http.put(`${API_BASE_URL}/products/${this.productId}`, fd).toPromise();
      } else {
        const created: any = await this.http.post(`${API_BASE_URL}/products`, fd).toPromise();
        if (created?.id) this.productId = created.id;
      }
    } catch {}
  }

  // reset (pro)
  resetProduct() {
    localStorage.removeItem('productData');
  }

  private async loadFromBackend(id?: number): Promise<void> {
    try {
      if (id != null) {
        const p: any = await this.http.get(`${API_BASE_URL}/products/${id}`).toPromise();
        if (p) {
          const mapped = this.mapToHeroProduct(p);
          localStorage.setItem('productData', JSON.stringify(mapped));
          this.productId = p.id ?? id;
          this.productSubject.next(mapped);
        }
        return;
      }
      const list = await this.http.get<any[]>(`${API_BASE_URL}/products`).toPromise();
      if (Array.isArray(list) && list.length) {
        const p: any = list[0];
        const mapped = this.mapToHeroProduct(p);
        localStorage.setItem('productData', JSON.stringify(mapped));
        this.productId = p.id ?? null;
        this.productSubject.next(mapped);
      }
    } catch {}
  }

  private mapToHeroProduct(p: any): HeroProduct {
    return {
      breadcrumbs: Array.isArray(p?.breadcrumbs) ? p.breadcrumbs : [],
      title: p?.title ?? '',
      subtitle: p?.subtitle ?? '',
      descriptions: Array.isArray(p?.descriptions) ? p.descriptions : [],
      mainImage: p?.mainImage ?? '',
      thumbnails: Array.isArray(p?.thumbnails) ? p.thumbnails : [],
      contactLink: p?.contactLink ?? '#',
      features: Array.isArray(p?.features) ? p.features : [],
      downloads: Array.isArray(p?.downloads) ? p.downloads : []
    };
  }
}

import { Injectable } from '@angular/core';
import { HeroProduct } from '../models/product.model';

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

  // obtener producto
  getProduct(): HeroProduct {
    const saved = localStorage.getItem('productData');
    return saved ? JSON.parse(saved) : this.defaultProduct;
  }

  // guardar producto
  updateProduct(data: HeroProduct) {
    localStorage.setItem('productData', JSON.stringify(data));
  }

  // reset (pro)
  resetProduct() {
    localStorage.removeItem('productData');
  }
}
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
    title: 'Producto ejemplo',
    subtitle: 'Subtítulo ejemplo',
    descriptions: [
      'Descripción principal del producto',
      'Otra descripción del producto'
    ], 
    mainImage: 'hero (1).webp',
    thumbnails: ['hero (1).webp'],
    contactLink: '#',
    features: [],
    downloads: []
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
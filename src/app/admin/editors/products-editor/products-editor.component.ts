import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { HeroProduct, Feature, Download } from '../../../models/product.model';

@Component({
  selector: 'app-products-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule],
  templateUrl: './products-editor.component.html',
  styleUrl: './products-editor.component.css'
})
export class ProductsEditorComponent implements OnInit {

  product!: HeroProduct;
  originalProduct!: HeroProduct; // Para guardar el estado inicial

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = this.productService.getProduct();

    // guardar copia inicial
    this.originalProduct = JSON.parse(JSON.stringify(this.product));

    // asegurar arrays
    if (!this.product.downloads) this.product.downloads = [];
    if (!this.product.features) this.product.features = [];
    if (!this.product.descriptions) this.product.descriptions = [];
    if (!this.product.thumbnails) this.product.thumbnails = [];
  }   

  showSuccessMessage = false;

  trackByIndex(index: number, item: any) {
    return index;
  }

  save() {
    this.productService.updateProduct(this.product);
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  resetForm() {
    // Restaurar el producto al estado original
    this.product = JSON.parse(JSON.stringify(this.originalProduct));
  }

  // --- Descripciones ---
  addDescription() {
    this.product.descriptions.push('');
  }

  removeDescription(index: number) {
    this.product.descriptions.splice(index, 1);
  }

  // --- Thumbnails ---
  addThumbnail() {
    this.product.thumbnails.push('');
  }

  removeThumbnail(index: number) {
    this.product.thumbnails.splice(index, 1);
  }

  // --- Features ---
  addFeature() {
    this.product.features = this.product.features || [];
    this.product.features.push({ title: '', description: '' });
  }

  removeFeature(index: number) {
    this.product.features?.splice(index, 1);
  }

  // --- Downloads ---
  addDownload() {
    this.product.downloads = this.product.downloads || [];
    this.product.downloads.push({ title: '', description: '', link: '' });
  }

  removeDownload(index: number) {
    this.product.downloads?.splice(index, 1);
  }
}
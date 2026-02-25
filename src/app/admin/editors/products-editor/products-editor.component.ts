import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { HeroProduct, Feature, Download } from '../../../models/product.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-products-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './products-editor.component.html',
  styleUrl: './products-editor.component.css'
})
export class ProductsEditorComponent implements OnInit {

  product!: HeroProduct;
  originalProduct!: HeroProduct; // Para guardar el estado inicial
  downloadsFiles: (File | null)[] = [];

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
    this.downloadsFiles = Array(this.product.downloads.length).fill(null);
  }   

  showSuccessMessage = false;

  trackByIndex(index: number, item: any) {
    return index;
  }

  save() {
    if (!this.downloadsFiles || this.downloadsFiles.every(f => f == null)) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.updateProductWithFiles(this.product, this.downloadsFiles);
    }
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  resetForm() {
    // Restaurar el producto al estado original
    this.product = JSON.parse(JSON.stringify(this.originalProduct));
    this.downloadsFiles = Array(this.product.downloads.length).fill(null);
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
    this.downloadsFiles.push(null);
  }

  removeDownload(index: number) {
    this.product.downloads?.splice(index, 1);
    this.downloadsFiles.splice(index, 1);
  }

  onFileSelected(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    this.downloadsFiles[index] = file;
  }

  onDropFile(index: number, event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0] ? event.dataTransfer.files[0] : null;
    this.downloadsFiles[index] = file;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  fileName(index: number): string {
    const f = this.downloadsFiles[index];
    return f ? f.name : '';
  }
}

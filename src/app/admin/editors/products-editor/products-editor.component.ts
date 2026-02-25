// products-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductService } from '../../../services/product.service';
import { HeroProduct, Feature, Download } from '../../../models/product.model';

@Component({
  selector: 'app-products-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {
  product!: HeroProduct;
  originalProduct!: HeroProduct;
  downloadsFiles: (File | null)[] = [];
  showSuccessMessage = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.product = this.productService.getProduct();
    this.originalProduct = JSON.parse(JSON.stringify(this.product));

    // Inicializar arrays si no existen
    if (!this.product.downloads) this.product.downloads = [];
    if (!this.product.features) this.product.features = [];
    if (!this.product.descriptions) this.product.descriptions = [];
    if (!this.product.thumbnails) this.product.thumbnails = [];

    this.downloadsFiles = Array(this.product.downloads.length).fill(null);
  }

  trackByIndex(index: number): number {
    return index;
  }

  // ================= GUARDAR =================
  save(): void {
    if (!this.downloadsFiles || this.downloadsFiles.every(f => f == null)) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.updateProductWithFiles(this.product, this.downloadsFiles);
    }
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
    this.originalProduct = JSON.parse(JSON.stringify(this.product));
  }

  // ================= RESET =================
  resetForm(): void {
    this.product = JSON.parse(JSON.stringify(this.originalProduct));
    this.downloadsFiles = Array(this.product.downloads.length).fill(null);
  }

  // ================= DESCRIPCIONES =================
  addDescription(): void {
    this.product.descriptions.push('');
  }

  removeDescription(index: number): void {
    this.product.descriptions.splice(index, 1);
  }

  // ================= THUMBNAILS =================
  addThumbnail(): void {
    this.product.thumbnails.push('');
  }

  removeThumbnail(index: number): void {
    this.product.thumbnails.splice(index, 1);
  }

  // ================= FEATURES =================
  addFeature(): void {
    this.product.features = this.product.features || [];
    this.product.features.push({ title: '', description: '' });
  }

  removeFeature(index: number): void {
    this.product.features?.splice(index, 1);
  }

  // ================= DOWNLOADS =================
  addDownload(): void {
    this.product.downloads = this.product.downloads || [];
    this.product.downloads.push({ title: '', description: '', link: '' });
    this.downloadsFiles.push(null);
  }

  removeDownload(index: number): void {
    this.product.downloads?.splice(index, 1);
    this.downloadsFiles.splice(index, 1);
  }

  removeSelectedFile(index: number): void {
    this.downloadsFiles[index] = null;
  }

  onFileSelected(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.downloadsFiles[index] = input.files && input.files[0] ? input.files[0] : null;
  }

  onDropFile(index: number, event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] ?? null;
    this.downloadsFiles[index] = file;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  fileName(index: number): string {
    const f = this.downloadsFiles[index];
    return f ? f.name : '';
  }
}
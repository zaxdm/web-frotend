// product-general-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

import { GeneralProductService } from '../../../services/general-product.service';
import { GeneralProductData } from '../../../models/general-product';

@Component({
  selector: 'app-product-general-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  templateUrl: './product-general-editor.component.html',
  styleUrls: ['./product-general-editor.component.css']
})
export class ProductGeneralEditorComponent implements OnInit {
  form!: FormGroup;
  originalData!: GeneralProductData;
  showSuccessMessage = false;

  constructor(
    private service: GeneralProductService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    const data = this.service.getData();
    this.originalData = JSON.parse(JSON.stringify(data));
    
    this.form = this.fb.group({
      headerData: this.fb.group({
        titulo: [data.headerData.titulo],
        descripcion: [data.headerData.descripcion],
        breadcrumbs: this.fb.array(data.headerData.breadcrumbs.map(b => this.fb.control(b)))
      }),
      infoSection: this.fb.group({
        texto: [data.infoSection.texto],
        boton: this.fb.group({
          label: [data.infoSection.boton.label],
          link: [data.infoSection.boton.link]
        })
      }),
      products: this.fb.array(
        data.products.map(p =>
          this.fb.group({
            title: [p.title],
            image: [p.image],
            link: [p.link]
          })
        )
      )
    });
  }

  saveChanges() {
    if (this.form.valid) {
      const v = this.form.value;
      const updated: GeneralProductData = {
        headerData: {
          titulo: v.headerData.titulo,
          descripcion: v.headerData.descripcion,
          breadcrumbs: [...v.headerData.breadcrumbs]
        },
        infoSection: {
          texto: v.infoSection.texto,
          boton: {
            label: v.infoSection.boton.label,
            link: v.infoSection.boton.link
          }
        },
        products: v.products.map((p: any) => ({
          title: p.title,
          image: p.image,
          link: p.link
        }))
      };
      
      this.service.updateData(updated);
      this.showSuccessMessage = true;
      setTimeout(() => (this.showSuccessMessage = false), 3000);
      this.originalData = JSON.parse(JSON.stringify(updated));
    }
  }

  // Helper para obtener título del producto
  getProductTitle(index: number): string {
    const product = this.productsArray.at(index);
    return product?.get('title')?.value || '';
  }

  // ================= BREADCRUMBS =================
  addBreadcrumb() {
    this.breadcrumbsArray.push(this.fb.control(''));
  }

  removeBreadcrumb(index: number) {
    this.breadcrumbsArray.removeAt(index);
  }

  // ================= PRODUCTOS =================
  addProduct() {
    this.productsArray.push(
      this.fb.group({ 
        title: [''], 
        image: [''], 
        link: ['#'] 
      })
    );
  }

  removeProduct(index: number) {
    this.productsArray.removeAt(index);
  }

  // ================= GETTERS =================
  get breadcrumbsArray(): FormArray {
    return this.form.get('headerData.breadcrumbs') as FormArray;
  }

  get productsArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
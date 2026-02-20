import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NavbarService } from '../../../services/navbar.service';
import { NavbarData } from '../../../models/navbar.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar-editor',
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
    MatExpansionModule,
    MatTooltipModule
  ],
  templateUrl: './navbar-editor.component.html',
  styleUrls: ['./navbar-editor.component.css']
})
export class NavbarEditorComponent implements OnInit {
  form!: FormGroup;
  showSuccessMessage = false;

  constructor(private navbarService: NavbarService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm();
  }

  saveChanges() {
    const v = this.form.value;
    const updated: NavbarData = {
      productosLabel: v.productosLabel,
      aboutLabel: v.aboutLabel,
      contactoLabel: v.contactoLabel,
      contactoRuta: v.contactoRuta,
      siguenos: v.siguenos,
      buscarPlaceholder: v.buscarPlaceholder,
      logoActual: v.logoActual,
      aboutMenu: v.aboutMenu.map((i: any) => ({ nombre: i.nombre, ruta: i.ruta })),
      redes: v.redes.map((r: any) => ({ nombre: r.nombre, icon: r.icon, url: r.url })),
      productosMenu: v.productosMenu.map((c: any) => ({
        titulo: c.titulo,
        ruta: c.ruta,
        items: c.items.map((it: any) => ({ nombre: it.nombre, ruta: it.ruta }))
      }))
    };
    this.navbarService.updateNavbar(updated);
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  resetForm() {
    const data = this.navbarService.getNavbar();
    this.form = this.fb.group({
      productosLabel: [data.productosLabel],
      aboutLabel: [data.aboutLabel],
      contactoLabel: [data.contactoLabel],
      contactoRuta: [data.contactoRuta],
      siguenos: [data.siguenos],
      buscarPlaceholder: [data.buscarPlaceholder],
      logoActual: [data.logoActual],
      aboutMenu: this.fb.array(
        data.aboutMenu.map(i => this.fb.group({ nombre: [i.nombre], ruta: [i.ruta || ''] }))
      ),
      redes: this.fb.array(
        data.redes.map(r => this.fb.group({ nombre: [r.nombre], icon: [r.icon], url: [r.url] }))
      ),
      productosMenu: this.fb.array(
        data.productosMenu.map(c => this.fb.group({
          titulo: [c.titulo],
          ruta: [c.ruta || ''],
          items: this.fb.array(
            c.items.map(it => this.fb.group({ nombre: [it.nombre], ruta: [it.ruta || ''] }))
          )
        }))
      )
    });
  }

  get aboutMenuArray(): FormArray {
    return this.form.get('aboutMenu') as FormArray;
  }
  addAboutItem() {
    this.aboutMenuArray.push(this.fb.group({ nombre: [''], ruta: [''] }));
  }
  removeAboutItem(index: number) {
    this.aboutMenuArray.removeAt(index);
  }

  get redesArray(): FormArray {
    return this.form.get('redes') as FormArray;
  }
  addSocialItem() {
    this.redesArray.push(this.fb.group({ nombre: [''], icon: [''], url: [''] }));
  }
  removeSocialItem(index: number) {
    this.redesArray.removeAt(index);
  }

  get productosMenuArray(): FormArray {
    return this.form.get('productosMenu') as FormArray;
  }
  addProductCategory() {
    this.productosMenuArray.push(
      this.fb.group({
        titulo: [''],
        ruta: [''],
        items: this.fb.array([])
      })
    );
  }
  removeProductCategory(index: number) {
    this.productosMenuArray.removeAt(index);
  }

  getItemsArray(categoryIndex: number): FormArray {
    return this.productosMenuArray.at(categoryIndex).get('items') as FormArray;
  }
  addProductItem(categoryIndex: number) {
    this.getItemsArray(categoryIndex).push(this.fb.group({ nombre: [''], ruta: [''] }));
  }
  removeProductItem(categoryIndex: number, itemIndex: number) {
    this.getItemsArray(categoryIndex).removeAt(itemIndex);
  }
}

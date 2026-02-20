import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { FooterService } from '../../../services/footer.service';
import { FooterData } from '../../../models/footer.model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-footer-editor',
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
    MatTooltipModule,
    MatCheckboxModule
  ],
  templateUrl: './footer-editor.component.html',
  styleUrls: ['./footer-editor.component.css']
})
export class FooterEditorComponent implements OnInit {

  footerForm: FormGroup;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private footerService: FooterService
  ) {
    this.footerForm = this.fb.group({
      telefono: [''],
      email: [''],
      logoCentro: [''],
      copyright: [''],
      followText: [''], // 🔥 NUEVO editable
      menuIzquierda: this.fb.array([]),
      noticias: this.fb.array([]),
      redes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.footerService.footerData$.subscribe(data => {
      if (data) {
        this.setFormValues(data);
      }
    });
  }

  // ================= GETTERS =================
  get menuIzquierdaArray(): FormArray {
    return this.footerForm.get('menuIzquierda') as FormArray;
  }

  get noticiasArray(): FormArray {
    return this.footerForm.get('noticias') as FormArray;
  }

  get redesArray(): FormArray {
    return this.footerForm.get('redes') as FormArray;
  }

  // ================= CARGAR DATA =================
  private setFormValues(data: FooterData) {

    this.footerForm.patchValue({
      telefono: data.contacto.telefono,
      email: data.contacto.email,
      logoCentro: data.logoCentro,
      copyright: data.copyright,
      followText: data.followText   // 🔥 cargar
    });

    // MENU
    this.menuIzquierdaArray.clear();
    data.menuIzquierda.forEach(item => {
      this.menuIzquierdaArray.push(this.fb.group({
        label: [item.label],
        ruta: [item.ruta]
      }));
    });

    // NOTICIAS
    this.noticiasArray.clear();
    data.noticias.forEach(item => {
      this.noticiasArray.push(this.fb.group({
        fecha: [item.fecha],
        titulo: [item.titulo],
        url: [item.url]
      }));
    });

    // REDES
    this.redesArray.clear();
    data.redes.forEach(item => {
      this.redesArray.push(this.fb.group({
        icon: [item.icon],
        nombre: [item.nombre],
        url: [item.url]
      }));
    });
  }

  // ================= MENU =================
  addMenuItem() {
    this.menuIzquierdaArray.push(this.fb.group({
      label: [''],
      ruta: ['']
    }));
  }

  removeMenuItem(index: number) {
    this.menuIzquierdaArray.removeAt(index);
  }

  // ================= NOTICIAS =================
  addNoticia() {
    this.noticiasArray.push(this.fb.group({
      fecha: [''],
      titulo: [''],
      url: ['']
    }));
  }

  removeNoticia(index: number) {
    this.noticiasArray.removeAt(index);
  }

  // ================= REDES =================
  addRed() {
    this.redesArray.push(this.fb.group({
      icon: [''],
      nombre: [''],
      url: ['']
    }));
  }

  removeRed(index: number) {
    this.redesArray.removeAt(index);
  }

  // ================= GUARDAR =================
  saveChanges() {
    if (this.footerForm.valid) {

      const formValue = this.footerForm.value;

      const footerData: FooterData = {
        contacto: {
          telefono: formValue.telefono,
          email: formValue.email
        },
        logoCentro: formValue.logoCentro,
        menuIzquierda: formValue.menuIzquierda,
        noticias: formValue.noticias,
        redes: formValue.redes,
        copyright: formValue.copyright || 'JF Tricon Perú, LLC',
        followText: formValue.followText || 'SÍGUENOS EN —' // 🔥 guardar
      };

      this.footerService.updateFooter(footerData);

      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }
  }

  // ================= RESET =================
  resetForm() {
    this.setFormValues(this.footerService.getFooter());
  }

  trackByIndex(index: number): number {
    return index;
  }
}
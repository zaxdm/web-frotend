import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  /** Control del input buscador */
  regionControl = new FormControl('');

  /** Región seleccionada */
  selectedRegion: any = null;

  /** Flag para saber si la selección viene del autocomplete */
  private isFromAutocomplete: boolean = false;

  /** Regiones con datos completos */
  regions = [
    {
      value: 'south-america',
      label: 'South America',
      contact: {
        name: 'Miguel Jahncke',
        phones: [
          '+51 989 164 305 (Peru)',
          '+1 954 258 0271 (USA)'
        ],
        email: 'mjahncke@terelion.com',
        office: {
          country: 'Peru',
          address: 'Terelion LLC. Sucursal del Peru, Las Poncianas #105, La Molina Vieja, Lima, Peru',
          phone: '+51-1-365-2529'
        }
      }
    },
    {
      value: 'europe',
      label: 'Europe',
      contact: {
        name: 'John Smith',
        phones: ['+44 123 456 789'],
        email: 'jsmith@terelion.com',
        office: {
          country: 'United Kingdom',
          address: '123 Business Street, London, UK',
          phone: '+44-20-1234-5678'
        }
      }
    },
    {
      value: 'asia',
      label: 'Asia',
      contact: {
        name: 'Chen Wei',
        phones: ['+86 138 0013 8000'],
        email: 'cwei@terelion.com',
        office: {
          country: 'China',
          address: '456 Commercial Road, Shanghai, China',
          phone: '+86-21-8765-4321'
        }
      }
    },
    {
      value: 'africa',
      label: 'Africa',
      contact: {
        name: 'Kwame Nkrumah',
        phones: ['+27 11 123 4567'],
        email: 'knkrumah@terelion.com',
        office: {
          country: 'South Africa',
          address: '789 Innovation Drive, Johannesburg, SA',
          phone: '+27-11-765-4321'
        }
      }
    },
    {
      value: 'north-america',
      label: 'North America',
      contact: {
        name: 'Sarah Johnson',
        phones: ['+1 555 123 4567'],
        email: 'sjohnson@terelion.com',
        office: {
          country: 'USA',
          address: '101 Tech Avenue, San Francisco, CA',
          phone: '+1-415-555-0123'
        }
      }
    }
  ];

  /** Regiones filtradas */
  filteredRegions!: Observable<any[]>;

  ngOnInit() {
    // Configuración del filtro
    this.filteredRegions = this.regionControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200), // Debounce para mejor performance
      distinctUntilChanged(), // Evita filtros innecesarios
      map(value => {
        // Si la selección viene del autocomplete, no filtres
        if (this.isFromAutocomplete) {
          this.isFromAutocomplete = false;
          return this.regions;
        }
        return this.filterRegions(value || '');
      })
    );
    
    // Escuchar cambios en el input
    this.regionControl.valueChanges.subscribe(value => {
      // Solo procesar si es texto (no objeto)
      if (typeof value === 'string') {
        // Si el campo está vacío, limpiar selección
        if (!value.trim()) {
          this.selectedRegion = null;
        }
        // No seleccionar automáticamente cuando se escribe
        // La selección solo debe ocurrir al elegir del autocomplete
      }
    });
  }

  private filterRegions(value: string): any[] {
    const filterValue = value.toLowerCase().trim();
    
    // Si no hay texto de búsqueda, mostrar todas
    if (!filterValue) {
      return this.regions;
    }
    
    // Filtrar regiones que coincidan con el texto
    return this.regions.filter(region =>
      region.label.toLowerCase().includes(filterValue) ||
      (region.contact?.name?.toLowerCase() || '').includes(filterValue) ||
      (region.contact?.office?.country?.toLowerCase() || '').includes(filterValue)
    );
  }

  selectRegion(region: any) {
    // Marcar que la selección viene del autocomplete
    this.isFromAutocomplete = true;
    
    // Establecer la región seleccionada
    this.selectedRegion = region;
    
    // Establecer el valor del control con la etiqueta
    this.regionControl.setValue(region.label, { emitEvent: false });
    
    // Scroll suave al panel después de un breve delay
    setTimeout(() => {
      const panel = document.querySelector('.region-panel');
      if (panel) {
        panel.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 150);
  }

  clearRegion() {
    this.regionControl.setValue('');
    this.selectedRegion = null;
    this.isFromAutocomplete = false;
    
    // Restablecer el estado del control
    this.regionControl.markAsPristine();
    this.regionControl.markAsUntouched();
  }

  // Método para manejar el display en el autocomplete
  displayFn(region: any): string {
    return region && region.label ? region.label : '';
  }
}
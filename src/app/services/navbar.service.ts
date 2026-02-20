import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarData } from '../models/navbar.model';

@Injectable({ providedIn: 'root' })
export class NavbarService {

  private navbarData: NavbarData = {
    productosLabel: 'Productos',
    aboutLabel: 'Acerca de',
    contactoLabel: 'Contacto',
    contactoRuta: '/contactos',
    siguenos: 'Síguenos en',
    buscarPlaceholder: 'Buscar en terelion.com...',
    aboutMenu: [
      { nombre: 'Nosotros', ruta: '/acerca-de' },
      { nombre: 'Nuestra Historia', ruta: '/his' }
    ],
    productosMenu: [
      {
        titulo: 'Brocas Tricónicas', ruta: '/productos/general',
        items: [
          { nombre: 'RIDGEBACK™ – Perforación en roca dura', ruta: '/productos' },
          { nombre: 'AVENGER™ – Perforación de alto rendimiento', ruta: '/productos' }
        ]
      }
    ],
    redes: [
      { nombre: 'facebook', icon: 'bi bi-facebook', url: 'https://www.facebook.com/share/1BzmQ64ZW3/' },
      { nombre: 'linkedin', icon: 'bi bi-linkedin', url: 'https://www.linkedin.com/company/jf-tricon-per%C3%BA/' }
    ],
    logoActual: '/logo-blanco.png'
  };

  private navbarSubject = new BehaviorSubject<NavbarData>(this.getNavbar());
  public navbarData$ = this.navbarSubject.asObservable();

  getNavbar(): NavbarData {
    const saved = localStorage.getItem('navbarData');
    return saved ? JSON.parse(saved) : this.navbarData;
  }

  updateNavbar(data: NavbarData) {
    this.navbarData = data;
    localStorage.setItem('navbarData', JSON.stringify(data));
    this.navbarSubject.next(data);
  }
}

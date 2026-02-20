import { Injectable } from '@angular/core';
import { HomeData } from '../models/home.model';

@Injectable({ providedIn: 'root' })
export class HomeService {

  private homeData: HomeData = {
    hero: {
      titleLines: ['LO QUE SE NECESITA', 'PARA ROMPER', 'BARRERAS'],
      buttonText: 'aprende más',
      buttonLink: '/mas-info'
    },
    cards: [
      { image: '/tarjetas/historia.jpg', title: 'DESCUBRE LA HISTORIA DE TERELION', buttonText: 'NUESTRA HISTORIA', type: 'history' },
      { image: '/tarjetas/warrior.jpeg', title: 'BIENVENIDO A NUESTRO NUEVO MIEMBRO — WARRIOR', buttonText: 'EXPLORAR WARRIOR', type: 'history' },
      { image: '/tarjetas/ridegeback.jpeg', title: 'RIDGEBACK™ Perforación en roca dura', buttonText: 'EXPLORAR RIDGEBACK™', type: 'product' },
      { image: '/tarjetas/ridegeback.jpeg', title: 'AVENGER™ Perforación de alto rendimiento', buttonText: 'EXPLORAR AVENGER™', type: 'product' }
    ],
    about: {
      title: 'Somos Terelion',
      paragraphs: [
        'Somos especialistas orgullosos en el desarrollo y la fabricación de brocas triconicas para las industrias de la minería y la construcción. Texas es nuestro hogar, pero la industria mundial de la minería superficial es nuestro campo de juego.',
        'En Terelion siempre nos hemos esforzado por ser los mejores en nuestro negocio. Constantemente exploramos nuevos diseños innovadores, nuevos materiales, nuevos métodos de fabricación y nuevas herramientas de ingeniería. Solo para suministrar a nuestros clientes las brocas triconicas de rodamiento más resistentes, eficientes y económicas disponibles.'
      ],
      linkText: 'APRENDE MÁS ACERCA DE NOSOTROS',
      linkUrl: '#'
    }
  };

  getHome(): HomeData {
    const saved = localStorage.getItem('homeData');
    return saved ? JSON.parse(saved) : this.homeData;
  }

  updateHome(data: HomeData) {
    this.homeData = data;
    localStorage.setItem('homeData', JSON.stringify(data));
  }
}
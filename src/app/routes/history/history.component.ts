import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface HistoryStory {
  year: string;
  text: string;
}

interface HistoryItem {
  image: string;
  alt: string;
  stories: HistoryStory[];
}


@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent  {

  timeline: HistoryItem[] = [
    {
      image: 'prueba.jpg',
      alt: 'Yarel logo',
      stories: [
        {
          year: '1947',
          text: 'El negocio familiar de Varel Manufacturing Company se fundó en Delaware, EE. UU. por Daniel W. Varel.'
        },
        {
          year: '1950',
          text: 'Comenzó la producción de brocas tricónicas y brocas espirales para minería y construcción.'
        }
      ]
    },
    {
      image: '/assets/mexico-flag.png',
      alt: 'México',
      stories: [
        {
          year: '1971',
          text: 'Inauguración de Varel de México S.A. y traslado progresivo de la fabricación.'
        }
      ]
    },
    {
      image: '/assets/walker-logo.png',
      alt: 'Walker McDonald',
      stories: [
        {
          year: '1999',
          text: 'Adquisición de Walker Mc Donald, fabricante de brocas tricónicas para minería.'
        }
      ]
    }
  ];

}
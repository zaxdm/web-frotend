import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AboutSection } from '../models/about.model';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private readonly STORAGE_KEY = 'aboutData';

  private _aboutData: AboutSection = this.getDefaultData();
  private aboutDataSubject = new BehaviorSubject<AboutSection>(this._aboutData);
  public aboutData$ = this.aboutDataSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._aboutData = this.mergeWithDefaults(parsed);
      } catch {
        this._aboutData = this.getDefaultData();
      }
    }
    this.aboutDataSubject.next(this._aboutData);
  }

  getAbout(): AboutSection {
    return JSON.parse(JSON.stringify(this._aboutData));
  }

  getAboutObservable(): Observable<AboutSection> {
    return this.aboutData$;
  }

  updateAbout(data: AboutSection): void {
    const validated: AboutSection = {
      heroTitle: (data.heroTitle ?? '').trim(),
      subtitle: (data.subtitle ?? '').trim(),
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs.map(p => (p ?? '').trim()).filter(p => p !== '') : [],
      paragraphs2: Array.isArray(data.paragraphs2) ? data.paragraphs2.map(p => (p ?? '').trim()) : []
    };
    if (validated.paragraphs.length === 0) validated.paragraphs = [''];
    this._aboutData = validated;
    this.aboutDataSubject.next(this._aboutData);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._aboutData));
    } catch {}
  }

  private mergeWithDefaults(saved: Partial<AboutSection>): AboutSection {
    const defaults = this.getDefaultData();
    return {
      heroTitle: typeof saved.heroTitle === 'string' ? saved.heroTitle : defaults.heroTitle,
      subtitle: typeof saved.subtitle === 'string' ? saved.subtitle : defaults.subtitle,
      paragraphs: Array.isArray(saved.paragraphs) && saved.paragraphs.length ? saved.paragraphs : defaults.paragraphs,
      paragraphs2: Array.isArray(saved.paragraphs2) ? saved.paragraphs2 : defaults.paragraphs2
    };
  } 

  private getDefaultData(): AboutSection {
    return {
      heroTitle: 'SOBRE NOSOTROS',
      subtitle: 'Nuestra misión, valores y equipo',
      paragraphs: ['Somos orgullosos especialistas en el desarrollo y fabricación de brocas de cono de rodillos para las industrias de minería y construcción. Texas es nuestra patria, pero la industria minera a cielo abierto mundial es nuestro patio de recreo.',
        'En Terelion siempre nos hemos dedicado a ser los mejores en nuestro negocio. Exploramos constantemente nuevos diseños innovadores, nuevos materiales, nuevos métodos de fabricación y nuevas herramientas de ingeniería. Sólo para suministrar a nuestros clientes las brocas de cono de rodillos más resistentes, eficientes y rentables disponibles.'
      ],
      paragraphs2: ['Dondequiera que mires, el mundo está lleno de tareas desafiantes que la humanidad debe resolver. En Terelion nos especializamos en aquellos desafíos que plantea la perforación con voladuras en la minería a cielo abierto.',
        'Siempre nos hemos dedicado a ser los mejores en nuestro negocio. Exploramos constantemente nuevos diseños innovadores, nuevos materiales, nuevos métodos de fabricación y nuevas herramientas de ingeniería. Todo con el objetivo de fabricar las brocas de cono de rodillos más resistentes, eficientes y rentables disponibles.',
        'Algunas de nuestras innovaciones son menores. Otros conducen a avances que afectan a toda la industria. Estén atentos y estarán entre los primeros en saber cuándo Terelion lanzará la próxima innovación en perforación de rocas.'
      ]
    };
  }
}

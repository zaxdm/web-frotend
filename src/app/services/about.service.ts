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
      paragraphs: ['Terelion ofrece soluciones que impulsan sus objetivos.'],
      paragraphs2: []
    };
  }
}

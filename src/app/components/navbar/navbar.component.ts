import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nvbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // ===============================
  // MENÚS
  // ===============================
  menuOpen = false;
  showProductos = false;
  showAbout = false;
  searchOpen = false;
  isProductPage = false;
  isContactPage = false;

  // ===============================
  // RESPONSIVE
  // ===============================
  isMobileView = false;
  private readonly MOBILE_WIDTH = 768;

  // ===============================
  // IDIOMAS
  // ===============================
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];

  currentLang = 'en';
  langDropdownOpen = false;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  // ===============================
  // INIT
  // ===============================
  ngOnInit() {
    // 🔑 MUY IMPORTANTE: detectar tamaño al cargar
    this.updateViewMode();

    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLang = savedLang;
    this.translate.use(this.currentLang);

    this.checkProductPage();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkProductPage();
      });
  }

  // ===============================
  // RUTAS
  // ===============================
  private checkProductPage() {
    const url = this.router.url;
    this.isProductPage = url.includes('/producto') || url.includes('/productos');
    this.isContactPage = url.includes('/contactos');
  }

  // ===============================
  // RESPONSIVE
  // ===============================
  private updateViewMode() {
    this.isMobileView = window.innerWidth <= this.MOBILE_WIDTH;

    // Al pasar a desktop, cerrar todo
    if (!this.isMobileView) {
      this.menuOpen = false;
      this.showProductos = false;
      this.showAbout = false;
      this.searchOpen = false;
      this.langDropdownOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewMode();
  }

  // ===============================
  // MENÚ PRINCIPAL
  // ===============================
  toggleMenu() {
    if (!this.isMobileView) return;

    this.menuOpen = !this.menuOpen;

    if (!this.menuOpen) {
      this.showProductos = false;
      this.showAbout = false;
    }
  }

  toggleProductos(event?: Event) {
    if (event) event.preventDefault();

    this.showProductos = !this.showProductos;
    this.showAbout = false;

    if (this.isMobileView && !this.menuOpen) {
      this.menuOpen = true;
    }
  }

  toggleAbout(event?: Event) {
    if (event) event.preventDefault();

    this.showAbout = !this.showAbout;
    this.showProductos = false;

    if (this.isMobileView && !this.menuOpen) {
      this.menuOpen = true;
    }
  }

  closeMenus() {
    if (!this.isMobileView) return;

    this.menuOpen = false;
    this.showProductos = false;
    this.showAbout = false;
  }

  cerrarMegaMenu() {
    this.showProductos = false;
  }

  // ===============================
  // BÚSQUEDA (SOLO MÓVIL)
  // ===============================
  toggleSearch() {
    if (!this.isMobileView) return;
    this.searchOpen = !this.searchOpen;
  }

  // ===============================
  // IDIOMAS
  // ===============================
  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  selectLanguage(langCode: string) {
    this.currentLang = langCode;
    localStorage.setItem('language', langCode);
    this.translate.use(langCode);
    this.langDropdownOpen = false;
  }

  closeLangDropdown() {
    this.langDropdownOpen = false;
  }

  get currentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? lang.label : '';
  }
  cerrarMegaAbout() {
    this.showAbout = false;
  }

  // ===============================
  // CERRAR MENUS AL NAVEGAR
  // ===============================
  cerrarMenusAlNavegar() {
    this.showProductos = false;
    this.showAbout = false;
    this.menuOpen = false;
    this.searchOpen = false;
  }

}

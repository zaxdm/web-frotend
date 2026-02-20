import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { FooterData } from '../../models/footer.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, RouterModule]
})
export class FooterComponent implements OnInit, AfterViewInit {
  footerData!: FooterData;
  currentYear: number = new Date().getFullYear();
  currentIndex: number = 0;

  @ViewChild('newsCarousel') newsCarousel!: ElementRef<HTMLDivElement>;

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerData = this.footerService.getFooter();
  }

ngAfterViewInit(): void {
  if (this.newsCarousel) {
    // Escuchar scroll del carrusel
    this.newsCarousel.nativeElement.addEventListener('scroll', () => {
      this.updateCurrentIndex();
    });

    // Inicializa el índice
    this.updateCurrentIndex();
  }
}

  onScroll(event: Event) {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const firstItem = target.firstElementChild as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginRight); 
    this.currentIndex = Math.round(scrollLeft / itemWidth);
  }


  updateCurrentIndex() {
  const carousel = this.newsCarousel.nativeElement;
  const children = Array.from(carousel.children) as HTMLElement[];

  if (!children.length) return;

  // Encuentra el item más centrado en la vista
  const carouselCenter = carousel.scrollLeft + carousel.offsetWidth / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  children.forEach((child, index) => {
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    const distance = Math.abs(carouselCenter - childCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
    this.currentIndex = closestIndex;
}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../services/home.service';
import { HomeData, Card, AboutSection, HeroSection } from '../../../models/home.model';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-home-editor',
  standalone: true,
  imports: [CommonModule, FormsModule,     CommonModule,
    FormsModule,
    MatTabsModule],
  templateUrl: './home-editor.component.html',
  styleUrls: ['./home-editor.component.css']
})
export class HomeEditorComponent implements OnInit {
  homeData!: HomeData;
  showSuccessMessage = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  saveChanges() {
    this.homeService.updateHome(this.homeData);
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  resetForm() {
    this.homeData = JSON.parse(JSON.stringify(this.homeService.getHome()));
  }

  addHeroLine() {
    this.homeData.hero.titleLines.push('');
  }

  removeHeroLine(index: number) {
    this.homeData.hero.titleLines.splice(index, 1);
  }

  addCard() {
    this.homeData.cards.push({ 
      image: '', 
      title: '', 
      buttonText: '', 
      type: 'history' 
    });
  }

  removeCard(index: number) {
    this.homeData.cards.splice(index, 1);
  }

  addAboutParagraph() {
    this.homeData.about.paragraphs.push('');
  }

  removeAboutParagraph(index: number) {
    this.homeData.about.paragraphs.splice(index, 1);
  }
}
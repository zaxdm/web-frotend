import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../services/home.service';
import { HomeData } from '../../../models/home.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule
  ],
  templateUrl: './home-editor.component.html',
  styleUrls: ['./home-editor.component.css']
})
export class HomeEditorComponent implements OnInit {
  homeData!: HomeData;
  showSuccessMessage = false;

  constructor(private homeService: HomeService) {}

  async ngOnInit(): Promise<void> {
    await this.homeService.loadFromBackend();
    this.resetForm();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  saveChanges() {
    this.homeService.updateHome(this.homeData);
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  resetForm() {
    const data = this.homeService.getHome();
    if (data) {
      this.homeData = JSON.parse(JSON.stringify(data));
    }
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
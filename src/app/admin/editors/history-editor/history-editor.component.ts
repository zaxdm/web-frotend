import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistoryService } from '../../../services/history.service';
import { HistoryData } from '../../../models/history.model';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-history-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './history-editor.component.html',
  styleUrls: ['./history-editor.component.css']
})
export class HistoryEditorComponent {

  data: HistoryData = {
    heroTitle: '',
    timeline: []
  };

  activeTab: 'hero' | 'timeline' = 'hero';

  constructor(private historyService: HistoryService){
    const serviceData = this.historyService.getData();

    if(serviceData){
      // CLONE PROFUNDO para editar sin romper referencia
      this.data = JSON.parse(JSON.stringify(serviceData));
    }
  }

  // ========================
  // GUARDAR
  // ========================
  save(){
    this.historyService.update(this.data);
    alert("Guardado 🔥");
  }

  // ========================
  // TIMELINE
  // ========================
  addTimeline(){
    this.data.timeline.push({
      image:'',
      alt:'',
      stories:[{year:'', text:''}]
    });
  }

  deleteTimeline(i:number){
    this.data.timeline.splice(i,1);
  }

  // ========================
  // STORIES
  // ========================
  addStory(i:number){
    this.data.timeline[i].stories.push({year:'', text:''});
  }

  deleteStory(i:number, j:number){
    this.data.timeline[i].stories.splice(j,1);
  }
}
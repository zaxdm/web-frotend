import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "../../admin/admin/admin.component";

@Component({
  selector: 'app-principal-admin',
  imports: [RouterOutlet, AdminComponent],
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, HomeComponent, NewsComponent]
})
export class AdminModule { }

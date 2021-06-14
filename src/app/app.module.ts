import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './app-material.module';
import { AnalyticsCardAComponent } from './components/analytics-card-a/analytics-card-a.component';
import { HorizantalBarChartComponent } from './components/horizantal-bar-chart/horizantal-bar-chart.component';
import { AppAnalyticsCardBComponent } from './components/app-analytics-card-b/app-analytics-card-b.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AnalyticsCardCPieComponent } from './components/analytics-card-c-pie/analytics-card-c-pie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { UpdatesComponent } from './components/updates/updates.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    AnalyticsCardAComponent,
    HorizantalBarChartComponent,
    AppAnalyticsCardBComponent,
    PieChartComponent,
    AnalyticsCardCPieComponent,
    BarChartComponent,
    LineChartComponent,
    UpdateItemComponent,
    UpdatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    NgxEchartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

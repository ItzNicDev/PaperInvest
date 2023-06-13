import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareGraphComponent } from './components/share-graph/share-graph.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ShareGraphComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    BurgerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import {WeaponDetailsComponent } from './weapon-details/weapon-details.component';
import { WeaponAddComponent } from './weapon-add/weapon-add.component';
import { HeroAddComponent } from './hero-add/hero-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/details/:id', component: HeroDetailsComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapons/details/:id', component: WeaponDetailsComponent },
  { path : 'weapons/add' , component:WeaponAddComponent},
  { path : 'heroes/add' , component:HeroAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

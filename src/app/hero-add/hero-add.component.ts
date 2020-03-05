import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';
import { Weapon } from '../weapons/weapon.model';
import { WeaponsService } from '../services/weapons.service';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {
  hero : Hero;
  weapons : Weapon[] = [];
  constructor(private snackBar : MatSnackBar, private location : Location, private heroService: HeroService,private router:Router,private weaponService:WeaponsService ) { }

  ngOnInit() {
    this.hero = new Hero();
    this.hero.points_carac = 40;
    this.hero.attaque = 0;
    this.hero.degats = 0;
    this.hero.esquive = 0;
    this.hero.name = "";
    this.hero.hp = 0;
    this.hero.surname = "";
    this.hero.weapon_id = "";
    this.getWeapons();
  }

  getWeapons(){
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  updatePoints(action,champ){
     if(action == 'plus'){
       if(this.canIncrease()){
         this.addPoint(champ);
       }
     }
     else{
         this.removePoint(champ);              
     }
  }

  
  canIncrease(){
    if((this.hero.points_carac - 1) >= 0) {
      return true;
    }
      else {
        this.noMorePointError();
        return false;
      }
  }

   addPoint(champ){
     switch(champ){
       case 'attaque' : this.hero.attaque = this.hero.attaque + 1;
                      break;
       case 'esquive' : this.hero.esquive = this.hero.esquive + 1;
                      break;
       case 'degats' : this.hero.degats = this.hero.degats + 1;
                      break;
       case 'hp' :    this.hero.hp = this.hero.hp + 1;
                      break;                                                                
     }
     this.hero.points_carac = this.hero.points_carac - 1;
   }

   removePoint(champ){
    switch(champ){
      case 'attaque' : if(this.hero.attaque - 1 > 0){ 
        this.hero.attaque = this.hero.attaque - 1;
        this.removeOneCaracPoint();
      }
                     break;
      case 'esquive' :
       if(this.hero.esquive - 1 > 0){
         this.hero.esquive = this.hero.esquive - 1;
        this.removeOneCaracPoint();
       }
                     break;
      case 'degats' : 
      if(this.hero.degats - 1 > 0){
      this.hero.degats = this.hero.degats - 1;
      this.removeOneCaracPoint();
      }
                     break;
      case 'hp' :    if(this.hero.hp - 1 > 0){
       this.hero.hp = this.hero.hp - 1;
       this.removeOneCaracPoint();
      }
      else{
        this.removeError();
      }
                     break;                                                                
    }
   }

   saveHero(){
     if(this.hero.attaque > 0 && this.hero.degats > 0 && this.hero.hp > 0 && this.hero.esquive > 0 && this.hero.name != "" && this.hero.surname != ""){
       this.heroService.addHero(this.hero);
       this.router.navigate(['/heroes']);
       this.snackBar.open("Hero succesfully added ", null, {
        duration: 3000,
    });
     }
     else{
      this.snackBar.open("The caracteristics cannot be under 1 !", null, {
        duration: 3000,
    });
     }
   }
   
 removeError(){
  this.snackBar.open("This caracteristics cannot be under 1", null, {
    duration: 3000,
});
 }

 noMorePointError(){
  this.snackBar.open("No more caracteristics points remaining", null, {
    duration: 3000,
});
 }

 removeOneCaracPoint(){
  this.hero.points_carac = this.hero.points_carac + 1;
 }

  goBack() {
    this.location.back();
  }
}

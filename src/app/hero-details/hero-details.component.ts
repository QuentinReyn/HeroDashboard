import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';
import { MatSnackBar } from '@angular/material';
import { Weapon } from '../weapons/weapon.model';
import { WeaponsService } from '../services/weapons.service';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
 @Input() hero: Hero;
 id : string;
 weapons : Weapon[] = []
  constructor(private weaponService : WeaponsService, private snackBar : MatSnackBar, private route: ActivatedRoute,private heroService: HeroService,private location: Location,private router:Router) { }
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getHero();
    this.getWeapons();
  }

  getWeapons(){
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }
  getHero() { 
    this.heroService.getHero(this.id)
      .subscribe(hero => this.hero = hero);
  }

  updatePoints(action,champ){
    console.log(action);
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
      this.heroService.updateHero(this.hero.id,this.hero);
      this.router.navigate(['/heroes']);
      this.snackBar.open("Hero succesfully edited ", null, {
       duration: 3000,
   });
    }
    else{
     this.snackBar.open("The caracteristics cannot be under 1", null, {
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

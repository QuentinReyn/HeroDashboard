import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { HeroService } from '../services/hero.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { WeaponsService } from '../services/weapons.service';
import { Weapon } from '../weapons/weapon.model';
import { HeroWeapon } from '../heroWeapon.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  heroes : Hero[];
  weapons : Weapon[] = [];
  heroesWeapons: HeroWeapon[] = [];
  searchInput : string = "";
  
  constructor(private heroService:HeroService,private db: AngularFirestore,private snackBar: MatSnackBar, private weaponService :WeaponsService ) { }

  
  ngOnInit() {
    this.getHeroes();
  }
  
 getWeapons(){
   this.weaponService.getWeapons().subscribe(weapons => this.weapons = this.weapons);
 }

  getHeroes(){
    this.heroes = [];
    this.heroService.getHeroes().subscribe(data=>{
      this.heroes=data.slice(0,3);
      this.listHeroesAndWeapons();   
    });
  }

  ConvertToInt(currentString){
    return parseInt(currentString);
  }

  search(){
    if(this.searchInput != ""){
      this.heroesWeapons = [];     
    }
  }

  //jai ma liste de hero, ma liste d'armes
  //chaque hero a une arme et chaque arme a une image
  // je veux recuperer l'image de l'arme a partir de du weapon id du hero
   // creer un heroweapon pour chaque hero avec une arme
  listHeroesAndWeapons(){
    this.heroesWeapons = [];
    this.heroes.forEach(hero => {
      let weapon = null;
      if(hero.weapon_id != ""){
      this.weaponService.getWeapon(hero.weapon_id).subscribe(data =>{ 
        weapon = data;
        let heroWeapon = new HeroWeapon();
        heroWeapon.hero = hero;
        heroWeapon.weapon = weapon;
        this.heroesWeapons.push(heroWeapon);
      });
    }
    else{
      let heroWeapon = new HeroWeapon();
      heroWeapon.hero = hero;
      heroWeapon.weapon = null;
      this.heroesWeapons.push(heroWeapon);
    }  
    });
  }


  deleteHero(heroId){
    var ans = confirm("Are you sure you want to delete this hero ?");
    if(ans){
      this.heroService.deleteHero(heroId);
       this.snackBar.open("✅ Hero successfully deleted ✅", '', {
           duration: 3000,
       });
    }
  }
}
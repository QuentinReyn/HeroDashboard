import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from './hero.model';
import { HeroService } from '../services/hero.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { WeaponsService } from '../services/weapons.service';
import { Weapon } from '../weapons/weapon.model';
import { HeroWeapon } from '../heroWeapon.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes : Hero[];
  weapons : Weapon[] = [];
  heroesWeapons: HeroWeapon[] = [];
  searchInput : string = "";
  checked = false;
  modeValue : string;
  displayedColumns: string[] = ['id', 'nom', 'surnom', 'attaque','degats','esquive','hp','arme'];
  dataSource: MatTableDataSource<HeroWeapon>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private heroService:HeroService,private db: AngularFirestore,private snackBar: MatSnackBar, private weaponService :WeaponsService ) { }

  
  ngOnInit() {
    this.getHeroes();
    this.modeValue = "Simplifié"; 
  }
  
 getWeapons(){
   this.weaponService.getWeapons().subscribe(weapons => this.weapons = this.weapons);



 }

  getHeroes(){
    this.heroes = [];
    this.heroService.getHeroes().subscribe(data=>{
      this.heroes=data;
      this.listHeroesAndWeapons();
      this.dataSource = new MatTableDataSource(this.heroesWeapons);  
    });
  }

  ConvertToInt(currentString){
    return parseInt(currentString);
  }


  //jai ma liste de hero, ma liste d'armes
  //chaque hero a une arme et chaque arme a une image
  // je veux recuperer l'image de l'arme a partir de du weapon id du hero
   // creer un heroweapon pour chaque hero avec une arme
  listHeroesAndWeapons(){
    this.heroesWeapons = [];
    this.heroes.forEach(hero => {
      let weapon = null;
      console.log(hero);
      if(hero.weapon_id != ""){
      this.weaponService.getWeapon(hero.weapon_id).subscribe(data =>{ 
        weapon = data;
        let heroWeapon = new HeroWeapon();
        heroWeapon.hero = hero;
        heroWeapon.weapon = weapon;
        this.heroesWeapons.push(heroWeapon);
        this.dataSource = new MatTableDataSource(this.heroesWeapons);
        console.log(this.heroesWeapons);
      });
    }
    else{
      let heroWeapon = new HeroWeapon();
      heroWeapon.hero = hero;
      heroWeapon.weapon = null;
      this.heroesWeapons.push(heroWeapon);
      this.dataSource = new MatTableDataSource(this.heroesWeapons);
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
import { Component, OnInit,Input } from '@angular/core';
import { Weapon } from '../Weapons/weapon.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WeaponsService } from '../services/weapons.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-weapon-add',
  templateUrl: './weapon-add.component.html',
  styleUrls: ['./weapon-add.component.scss']
})
export class WeaponAddComponent implements OnInit {
 @Input() weapon: Weapon;
   constructor(private router:Router,private snackBar : MatSnackBar, private route: ActivatedRoute,private weaponService: WeaponsService,private location: Location) { }
   
   ngOnInit() {
     this.weapon = new Weapon();
    this.weapon.points_carac = 0;
    this.weapon.attaque = 0;
    this.weapon.degats = 0;
    this.weapon.esquive = 0;
    this.weapon.name = "";
    this.weapon.hp = 0;
    this.weapon.surname = "";
    this.weapon.image = 'https://media1.petitzebre.com/87998-thickbox_default/epee-chevalier-croise.jpg';
   }

   inputChange(champ){
    switch(champ){
      case 'attaque': this.setPointCarac();
        break;
        case 'esquive': this.setPointCarac();
        break;
        case 'hp': this.setPointCarac();
        break;
        case 'degats': this.setPointCarac();
        break;
    }
   }
 
    setPointCarac(){
     this.weapon.points_carac = parseInt(this.weapon.attaque.toString()) +  parseInt(this.weapon.esquive.toString()) +  parseInt(this.weapon.degats.toString()) +  parseInt(this.weapon.hp.toString());
    } 

    checkBeforeValidation(){
      var totalCarac = parseInt(this.weapon.attaque.toString()) +  parseInt(this.weapon.esquive.toString()) +  parseInt(this.weapon.degats.toString()) +  parseInt(this.weapon.hp.toString());
      if(totalCarac == 0 && this.weapon.attaque >= -5 && this.weapon.attaque <= 5 && this.weapon.esquive >= -5 && this.weapon.esquive <= 5 && this.weapon.hp >= -5 && this.weapon.hp <= 5 && this.weapon.degats >= -5 && this.weapon.degats <= 5  ){
        return true;
      }
      else{
        return false;
      }
    }

    saveWeapon(){
      if(this.checkBeforeValidation()){
      this.weaponService.addWeapon(this.weapon);
      this.router.navigate(['/weapons']);
      this.snackBar.open("✅ Weapon successfully added ✅", '', {
        duration: 3000,
    });
      }
      else{
        this.snackBar.open("All caracteristics sum must be equal to 0 and each caracteristic between -5 and 5", null, {
          duration: 3000,
      });
      }
    }
    
 
   goBack() {
     this.location.back();
   }
 }
 


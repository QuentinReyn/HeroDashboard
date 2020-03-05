import { Component, OnInit,Input } from '@angular/core';
import { Weapon } from '../Weapons/weapon.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WeaponsService } from '../services/weapons.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-weapon-details',
  templateUrl: './weapon-details.component.html',
  styleUrls: ['./weapon-details.component.scss']
})
export class WeaponDetailsComponent implements OnInit {
  @Input() weapon: Weapon;
  id : string;
   constructor(private router:Router,private snackBar : MatSnackBar, private route: ActivatedRoute,private weaponService: WeaponsService,private location: Location) { }
     
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getWeapon();
  }

  getWeapon() { 
    this.weaponService.getWeapon(this.id)
      .subscribe(weapon => this.weapon = weapon);
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
      this.weaponService.updateWeapon(this.weapon.id,this.weapon);
      this.router.navigate(['/weapons']);
      this.snackBar.open("✅ Weapon successfully edited ✅", '', {
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
 


import { Component, OnInit } from '@angular/core';
import { Weapon } from './weapon.model';
import { WeaponsService } from '../services/weapons.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {

  weapons : Weapon[] = [];
  searchInput : string = "";
  constructor(private weaponService : WeaponsService,private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  deleteWeapon(weaponId){
   var ans = confirm("Are you sure you want to delete this weapon ?");
   if(confirm){
     this.weaponService.deleteWeapon(weaponId);    
      this.getWeapons()
      this.snackBar.open("✅ Weapon successfully deleted ✅", '', {
          duration: 2000,
      });
   }
  }
  
}

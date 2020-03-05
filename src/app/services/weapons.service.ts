import { Injectable } from '@angular/core';
import { Weapon } from '../weapons/weapon.model';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  private static url = 'weapons';

  constructor(private db: AngularFirestore) {
  }

  getWeapons(): Observable<Weapon[]> {

    //
    return this.db.collection<Weapon>(WeaponsService.url)
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New weapon
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            weapon.id = id;

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  getWeaponsTop3(): Observable<Weapon[]> {

    //
    return this.db.collection(WeaponsService.url, ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            /* // Get document data
            const data = a.payload.doc.data() as weapon;

            // Get document id
            const id = a.payload.doc.id;

            // Use spread operator to add the id to the document data
            return {id, ...data};*/

            // Get document data
            const data = a.payload.doc.data();

            // New weapon
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            weapon.id = id;

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponsService.url + `/` + id);
  }

  getWeapon(id: string): Observable<Weapon> {

    // Return weapon observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Weapon;
          // return {id, ...data};

          // New weapon
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponsService.url).add(Object.assign({}, weapon));
  }

  updateWeapon(id: string, weapon: Weapon) {

    // Update document
    this.getWeaponDocument(id).update(Object.assign({}, weapon));
  }

  deleteWeapon(id: string){
    // Delete the document
   this.getWeaponDocument(id).delete();
  }
}

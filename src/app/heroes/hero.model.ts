import { Serializable } from '../serializable';
import { Weapon } from '../weapons/weapon.model';

export class Hero extends Serializable {
    id: string;
    name: string;
    surname: string;
    attaque:number;
    esquive:number;
    degats:number;
    hp:number;
    points_carac:number;
    weapon_id:string;

    uneMethode(): string {
      return 'le nom de mon hero' + this.name;
    }
  }
import { Serializable } from '../serializable';

export class Weapon extends Serializable{
    id: string;
    name: string;
    surname: string;
    attaque:number;
    esquive:number;
    degats:number;
    hp:number;
    points_carac:number;
    image : string;
  }
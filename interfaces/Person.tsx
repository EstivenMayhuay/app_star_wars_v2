import { Planet } from "./Planet";
import { Vehicle } from "./Vehicle";

export interface Person {
    name: string,
    type: string,
    hair_color: string,
    eye_color: string,
    skin_color: string,
    birth_year: string,
    home: Planet,
    vehicles: Vehicle[]
}
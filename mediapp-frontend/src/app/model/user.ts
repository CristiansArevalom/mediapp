import { Rol } from "./rol";

export class User{
    idUser:number;
    enabled:boolean;
    username:string;
    roles: Rol[];
}
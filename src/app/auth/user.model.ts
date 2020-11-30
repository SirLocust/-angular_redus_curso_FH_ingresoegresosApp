export class User {
   nombre: string;
   email: string;
   uid: string;

   public static creteUserOb(usuarioObj: DataObjec): User {
    return new User(usuarioObj.nombre, usuarioObj.email, usuarioObj.uid);
  }

  /**
   *
   * @param nombre
   * @param email
   * @param uid
   */

  constructor(nombre: string, email: string, uid: string) {
    this.email = email;
    this.uid = uid;
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }
  public getEmail(): string {
    return this.email;
  }
  public getUID(): string {
    return this.uid;
  }

  public getUserObjectJS(): User {
    return JSON.parse(JSON.stringify(this));
  }

 
}

export interface DataObjec {
  nombre: string;
  uid: string;
  email: string;
}

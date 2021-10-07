import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity({name: "LH_RegistroCUI"})
export class RegistroCUI { 

  @PrimaryColumn()
  cui: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;


  public static createRegistro(
    cui :string, 
    nombres :string, 
    apellidos :string,
    fecha_nacimiento :Date
    ) :RegistroCUI {
      let reg = new RegistroCUI();
      reg.cui = cui;
      reg.nombres = nombres;
      reg.apellidos = apellidos;
      reg.fecha_nacimiento = fecha_nacimiento;
      return reg;
}

}
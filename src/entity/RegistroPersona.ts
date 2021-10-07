import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Municipio } from "./Municipio";

@Entity({name: "LH_RegistroPersona"})
export class RegistroPersona {

    @PrimaryColumn()
    cui: string;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column()
    edad: number;

    @Column()
    sexo: string;

    @Column({ type: 'text', nullable: true})
    telefono: string;

    @Column({ type: 'date', nullable: true })
    fecha_parto: Date;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;

    @Column({ name: 'municipioId', type: 'integer', nullable: true})
    municipioId: number;

    @ManyToOne(() => Municipio, (m: Municipio) => m.registros, { nullable: true})
    municipio: Municipio;

    @Column({ type: 'text', nullable: true})
    escolaridad: string;

    @Column({ type: 'text', nullable: true})
    comunidad_linguistica: string;

    public static calcularEdad(fecha_nacimiento :Date) :number {
      console.log(fecha_nacimiento);
      console.log(new Date());
        return (new Date().getFullYear() - fecha_nacimiento.getFullYear());
    }


    public static createRegistro(
        cui :string, 
        nombres :string, 
        apellidos :string,
        fecha_nacimiento :Date,
        sexo :string,
        telefono :string,
        fecha_parto :Date,
        municipio :Municipio
        ) :RegistroPersona {
          let reg = new RegistroPersona();
          reg.cui = cui;
          reg.nombres = nombres;
          reg.apellidos = apellidos;
          if (fecha_nacimiento) {
            reg.fecha_nacimiento = fecha_nacimiento;
            reg.edad = this.calcularEdad(fecha_nacimiento);
          }
          reg.sexo = sexo;
          reg.telefono = telefono;
          reg.municipio = municipio;
          if(reg.sexo='F') {
            reg.fecha_parto = fecha_parto;
          }
          return reg;
    }
}

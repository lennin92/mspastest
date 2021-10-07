import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Municipio } from "./Municipio";

@Entity({name: "LH_Departamento"})
export class Departamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;

    @OneToMany(() => Municipio, (municipios: Municipio) => municipios.departamento)
    municipios: Municipio[];

    public static createDepartamento(
        nombre :string,
        municipios :Municipio[]
    ) :Departamento {
        let d = new Departamento();
        d.nombre = nombre;
        d.municipios = municipios;
        return d;
    }
}

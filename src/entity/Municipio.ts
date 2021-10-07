import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { Departamento } from "./Departamento";
import { RegistroPersona } from "./RegistroPersona";

@Entity({name: "LH_Municipio"})
export class Municipio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;

    @Column({ name: 'departamentoId' })
    departamentoId: number;

    @ManyToOne(() => Departamento, (departamento: Departamento) => departamento.municipios)
    departamento: Departamento

    @OneToMany(() => RegistroPersona, (r: RegistroPersona) => r.municipio)
    registros: RegistroPersona[];

    public static createMunicipio(
        nombre :string,
        departamento :Departamento
    ) :Municipio {
        let m = new Municipio();
        m.nombre = nombre;
        m.departamento = departamento;
        return m;
    }
}

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Token} from "../../jwt-token/repository/token.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fio: string

    //TODO: Временно string, поменять (проблема с Postgres)
    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({type: "date", default: new Date()})
    createdAt: Date

    @OneToMany(type => Token, token => token.account)
    jwtToken: string

}
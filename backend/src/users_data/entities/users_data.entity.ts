import { FavoriteCity } from "src/favorite_cities/entities/favorite_city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => FavoriteCity, (city) => city.user)
    fav_cities?: FavoriteCity[]
}

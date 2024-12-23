import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'mostPopularLocations'})
export class PopularCity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    key: string;
  
    @Column({ type: 'int' })
    version: number;
  
    @Column({ type: 'varchar', length: 50 })
    type: string;
  
    @Column({ type: 'int' })
    rank: number;
  
    @Column({ type: 'varchar', length: 255 })
    localizedName: string;
  
    @Column({ type: 'varchar', length: 50 })
    country_id: string;
  
    @Column({ type: 'varchar', length: 255 })
    country_localized_name: string;
  
    @Column({ type: 'varchar', length: 50 })
    administrative_area_id: string;
  
    @Column({ type: 'varchar', length: 255 })
    administrative_area_localized_name: string;
  
    @Column({ type: 'int' })
    search_count: number;
}

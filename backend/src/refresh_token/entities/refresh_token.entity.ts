
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'refreshTokens'})
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issued_at: number;

    @Column()
    expires_at: number;

    @Column({ unique: true, })
    indentification_key: string;

    @Column()
    user_id: number;

    @Column({default: true})
    valid: boolean;
}

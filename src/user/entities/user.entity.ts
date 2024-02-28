import { IsNotEmpty, Matches } from "class-validator";
// import { UserProfile } from "src/user_profiles/entities/user_profile.entity";
import { StatusEnum } from "src/utils/constatics/status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ unique: true })
    username: string;

    @Column()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Minimum six characters, at least one letter and one number.'
    })
    password: string;

    @Column()
    fullname: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({ default: StatusEnum.ACTIVE })
    status: string;

    // @Column({default:false})
    // superadmin:boolean;

    // @OneToOne(() => UserProfile)
    // @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
    // user_profiles: UserProfile;
}

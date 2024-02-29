import { IsNotEmpty, Matches } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";
// import { UserProfile } from "src/user_profiles/entities/user_profile.entity";
import { StatusEnum } from "src/utils/constatics/status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column()
    user_type: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({ default: StatusEnum.ACTIVE })
    status: string;

    @OneToMany(() => Todo, todo => todo.user) // Establish One-to-Many relationship
    todos: Todo[]; // Reference to an array of Todo entities
}

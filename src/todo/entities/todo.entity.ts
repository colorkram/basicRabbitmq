import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { StatusEnum } from "src/utils/constatics/status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('todo')
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column({ default: StatusEnum.ACTIVE })
    status: string;

    @Column()
    user_id: number;

    @ManyToOne(() => User, user => user.todos) 
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User; // Reference to the User entity
}
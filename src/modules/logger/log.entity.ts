import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'logs' })
export class LogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public context: string;

  @Column({ type: 'text' })
  public message: string;

  @Column()
  public level: string;
  @ManyToOne((type) => UserEntity, (user) => user.logs)
  user: UserEntity;
}

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { QuestionEntity } from '@modules/question/domain/entities/question.entity';

@Entity('tbl_form')
export class FormEntity {
  @PrimaryGeneratedColumn()
  form_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    default: true,
  })
  status: boolean;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.user_id)
  user_id: number;

  @OneToMany(() => QuestionEntity, question => question.form_id)
  questions: QuestionEntity[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

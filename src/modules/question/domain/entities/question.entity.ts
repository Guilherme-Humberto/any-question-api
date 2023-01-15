import { FormEntity } from '@modules/form/domain/entities/form.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity('tbl_question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    default: true,
  })
  status: boolean;

  @JoinColumn({ name: 'form_id' })
  @ManyToOne(() => FormEntity, form => form.questions)
  form_id: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

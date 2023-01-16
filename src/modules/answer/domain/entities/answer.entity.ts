import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

export enum StatusEnum {
  WRONG = 'wrong',
  CORRECT = 'correct',
  PENDING = 'pending',
}

@Entity('tbl_answer')
export class AnswerEntity {
  @PrimaryColumn()
  form_id: number;

  @PrimaryColumn()
  question_id: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

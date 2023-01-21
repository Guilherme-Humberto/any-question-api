import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';

@Entity('tbl_tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @JoinColumn({ name: "flashcard" })
  @ManyToOne(() => FlashcardEntity, flashcard => flashcard.tags, { onDelete: 'CASCADE' })
  flashcard: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

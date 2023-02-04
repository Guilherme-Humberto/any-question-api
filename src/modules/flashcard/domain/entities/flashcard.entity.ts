import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { TagEntity } from '@modules/tag/domain/entities/tag.entity';

enum StatusEnum {
  CORRECT = 'correct',
  WRONG = 'wrong',
  PENDING = 'pending',
}

@Entity('tbl_flashcard')
export class FlashcardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  front: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  back: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: string;

  @JoinColumn({ name: 'deck' })
  @ManyToOne(() => DeckEntity, (deck) => deck.id)
  deck: number;

  @OneToMany(() => TagEntity, (tag) => tag.flashcard)
  tags: TagEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

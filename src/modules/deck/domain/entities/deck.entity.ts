import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
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
import { v4 as uuid } from 'uuid';

@Entity('tbl_deck')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    unique: true,
    nullable: false,
    default: uuid(),
  })
  code: string;

  @Column({
    default: true,
  })
  status: boolean;

  @JoinColumn({ name: "user" })
  @ManyToOne(() => UserEntity, user => user.decks, { onDelete: 'CASCADE' })
  user: UserEntity

  @OneToMany(() => FlashcardEntity, user => user.deck)
  flashcards: FlashcardEntity[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

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
import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

@Entity('tbl_deck')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({
    type: 'tinyint',
    default: true,
  })
  status: boolean;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => UserEntity, (user) => user.decks, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => FlashcardEntity, (user) => user.deck)
  flashcards: FlashcardEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

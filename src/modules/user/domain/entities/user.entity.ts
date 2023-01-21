import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';

@Entity('tbl_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    default: true,
  })
  status: boolean;

  @JoinColumn({ name: 'decks' })
  @OneToMany(() => DeckEntity, deck => deck.user)
  decks: DeckEntity[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

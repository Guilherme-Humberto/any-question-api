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

enum TypeAuth {
  LOCAL = 'local',
  GITHUB = 'github',
  GOOGLE = 'google',
}

@Entity('tbl_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'tinyint',
    default: true,
  })
  status: boolean;

  @Column({
    type: 'enum',
    enum: TypeAuth,
    default: TypeAuth.LOCAL,
  })
  type_auth: string;

  @JoinColumn({ name: 'decks' })
  @OneToMany(() => DeckEntity, (deck) => deck.user)
  decks: DeckEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

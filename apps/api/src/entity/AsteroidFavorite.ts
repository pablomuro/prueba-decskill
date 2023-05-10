import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AsteroidFavorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  asteroidName!: string;

  @Column()
  asteroidNeoId!: number;
}

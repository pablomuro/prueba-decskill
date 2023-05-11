import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AsteroidFavorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  asteroidNeoId!: number;

  @Column()
  asteroidName!: string;

  @Column()
  absoluteMagnitudeH!: string;

  @Column()
  isPotentiallyHazardousAsteroid!: boolean;
}

import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null }) // can be null -> null means no restriction
  related_positions: string; // [multiple position are allow] ->

  @Column({ nullable: true })
  message: string; // any string can be embedded to this column

  @Column({ nullable: true })
  attached_params: string; // should be separating with [,] comma likes -> the first splited one would be pointing to the id of something then the [1] one should performs some operation

  @Column({ default: true })
  required_attention: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

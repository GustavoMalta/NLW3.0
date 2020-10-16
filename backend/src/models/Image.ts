import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import Orphanage from './Orphanage';

  @Entity('images')
  export default class Image{

        @PrimaryGeneratedColumn('increment',{ unsigned: true })
        id: number;
        
        @Column()
        path: string;
        
        @ManyToOne(() => Orphanage, orph => orph.images,{
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',})
        @JoinColumn({ name: 'orphanage_id'})
        orphanage: Orphanage;
        
    }
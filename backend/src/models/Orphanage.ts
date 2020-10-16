import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
import upload from '../config/upload';

  import Image from './Image';

  @Entity('orphanages')
  export default class Orphanage{

        @PrimaryGeneratedColumn('increment',{ unsigned: true })
        id: number;
        
        @Column()
        name: string;
        
        @Column('decimal', { precision: 10, scale: 2, nullable: true })
        latitude: number;
        
        @Column('decimal', { precision: 10, scale: 2, nullable: true })
        longitude: number;
        
        @Column({ nullable: true })
        about: string;
        
        @Column({ nullable: true })
        instructions: string;
        
        @Column({ nullable: true, default: false })
        open_on_weekends: boolean;
        
        @Column({ nullable: true })
        opening_hours: string;
        
        @OneToMany(() => Image, image => image.orphanage, {cascade:["insert","update"]})
        // @JoinColumn({ name: 'orphanage_id'})
        images: Image[];
        
        @CreateDateColumn()
        created_at: Date;
        
        @UpdateDateColumn()
        updated_at: Date;
    }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Bookmark } from './Bookmark';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() password: string;

  @Column() email: string;

  @Column() activated: boolean;

  @ManyToOne(type => User, user => user.folders, { cascadeRemove: true })
  owner: User;

  @OneToMany(type => Bookmark, bookmark => bookmark.folder)
  bookmarks: Promise<Bookmark[]>;
}

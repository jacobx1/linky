import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() username: string;

  @Column() password: string;

  @Column() email: string;

  @Column() activated: boolean;

  @OneToMany(type => Bookmark, bookmark => bookmark.owner)
  bookmarks: Promise<Bookmark[]>;

  @OneToMany(type => Folder, folder => folder.owner)
  folders: Promise<Folder[]>;
}

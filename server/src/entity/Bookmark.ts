import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated
} from 'typeorm';
import { User } from './User';
import { Folder } from './Folder';

@Entity({
  orderBy: {
    position: 'ASC'
  }
})
export class Bookmark {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() url: string;

  @Column() position: number;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(type => User, owner => owner.bookmarks, { cascadeRemove: true })
  owner: User;

  @Column({ nullable: true })
  folderId: number;

  @ManyToOne(type => Folder, folder => folder.bookmarks, {
    cascadeRemove: true
  })
  folder: Folder;
}

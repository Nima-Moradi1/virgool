import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
    @Column({unique: true})
    username : string ;
    @Column({nullable : true})
    password : string ;
    @Column({unique: true , nullable: true})
    phone : string;
    @Column({unique: true , nullable: true})
    email : string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
  }
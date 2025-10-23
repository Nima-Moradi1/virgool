/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthTypeEnum } from './enums/type.enums';
import { AuthMethodEnum } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { AuthMessage, BadRequestMessageEnum, ValidationMessage } from 'src/common/enums/message.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
        @InjectRepository(ProfileEntity) private profileRepository : Repository<ProfileEntity>
    ){}
    userExistence(authDto : AuthDto){
        const {method , type , username} = authDto ;
        switch (type) {
            case AuthTypeEnum.Login :
                return this.login(method, username) ;
            case AuthTypeEnum.Register :
                return this.register(method , username) ;
            default:
                throw new UnauthorizedException();
        }
    }
  async login(method : AuthMethodEnum , username : string){
            const validUsername = this.usernameValidator(method , username) ;
            let user : UserEntity | null;
            if(method === AuthMethodEnum.Phone){
                 user = await this.userRepository.findOneBy({phone : validUsername}) ;
            }else if(method === AuthMethodEnum.Email){
                 user = await this.userRepository.findOneBy({email : validUsername}) ;
            }else if(method === AuthMethodEnum.Username){
                 user = await this.userRepository.findOneBy({username : validUsername}) ;
            }else{
                throw new BadRequestException(BadRequestMessageEnum.InvalidLoginData) ;
            }
            if(!user){
                throw new  UnauthorizedException(AuthMessage.NotFoundAccount) ;
            }
    }
    register(method : AuthMethodEnum , username : string){
            const validUsername = this.usernameValidator(method , username) ;
    }
    usernameValidator(method : AuthMethodEnum , username : string){
            switch (method) {
                case AuthMethodEnum.Email : 
                if(isEmail(username)) return username;
                throw new BadRequestException(ValidationMessage.InvalidEmailFormat);
                case AuthMethodEnum.Phone : 
                if(isMobilePhone(username , 'fa-IR')) return username ;
                throw new BadRequestException(ValidationMessage.InvalidPhoneNumber) ;
                case AuthMethodEnum.Username : 
                return username ;
                default: 
                throw new UnauthorizedException(ValidationMessage.InvalidUsdername) ;
            }
    }
}

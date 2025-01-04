export interface UserDto {
    id: string;
    name: string;
    email: string;
}

export enum UserRoleEnum {
    admin = 'ADMIN',
    curator = 'CURATOR',
    basic = 'BASIC',
}

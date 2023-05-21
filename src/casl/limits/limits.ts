export class User{
    id:number
    isAdmin:boolean
}

export class Article {
    id:number
    isPublished:boolean
    authorId:number
}

export enum Action{
    Manage = 'manage',
    Create = 'create',
    Read ='read',
    Update = 'update',
    Delete='delete'
}
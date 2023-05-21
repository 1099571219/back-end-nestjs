import { Injectable } from "@nestjs/common";
import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility} from '@casl/ability'
import { Action, Article, User } from "src/casl/limits/limits";
type Subjects = InferSubjects<typeof Article | typeof User | 'all'>

export type AppAbility = PureAbility<[Action,Subjects]>

@Injectable()
export class CaslAbilityFactory {
    createForUser(user){
        const {can,cannot,build} = new AbilityBuilder<PureAbility<[Action,Subjects]>>(PureAbility as AbilityClass<AppAbility>)
        if(user.isAdmin){
            can(Action.Manage,'all')
        }else{
            can(Action.Read,'all')
        }

        can(Action.Update,Article,{authorId:user.id})
        cannot(Action.Delete,Article,{isPublished:true})

        return build({
            detectSubjectType:item=>item.constructor as ExtractSubjectType<Subjects>
        })

    }
}

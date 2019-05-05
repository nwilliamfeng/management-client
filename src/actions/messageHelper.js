import {mathUtil} from '../util'

export const buildMessage=content=> {
    return {id:mathUtil.guid(),content};
}
import { ApiHelper } from './apiHelper'
 
 
/**
 * 授权服务的Api
 */
class AuthApi {

    async logout(){

    }
 

    async login(userId,password) {
        return await ApiHelper.postByForm('/auth/login',{userId,password});
    }

    

}

export const authApi = new AuthApi(); 
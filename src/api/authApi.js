import { ApiHelper } from './apiHelper'
 
 
/**
 * 授权服务的Api
 */
class AuthApi {

    async logout(userId,accessToken){
        return await ApiHelper.post('/auth/logout',{userId,accessToken});
    }
 

    async login(userId,password) {
        return await ApiHelper.post('/auth/login',{userId,password});
    }

    

}

export const authApi = new AuthApi(); 
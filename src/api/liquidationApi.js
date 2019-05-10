import { ApiHelper } from './apiHelper'
import moment from 'moment';

/**
 * 调用卡券服务的API
 */
class LiquidationApi {

    async getMonthReport(clearDate,platformid,pageIndex) {
            
        const result =await ApiHelper.post('/liquidation/getMonthReport',{clearDate,platformid,pageIndex });
        return result;
    }

    async getDayReport(clearDate,platformid,pageIndex) {
            
        const result =await ApiHelper.post('/liquidation/getDayReport',{clearDate,platformid,pageIndex });
        return result;
    }

    async getErrorClearPointFlow(clearDate,platformid,pageIndex){
        const result =await ApiHelper.post('/liquidation/getErrorClearPointFlow',{clearDate,platformid,pageIndex });
        return result;
    }

    getReferTypes(){
        return [{name:'任务',value:1},{name:'礼品',value:2},{name:'系统',value:3},]
    }


   getReportTypes(){
       return [
        {name:'未知',value:0},
        {name:'积分发行',value:1},
        {name:'积分消费',value:2},
        {name:'积分过期',value:3},
        {name:'礼品发行',value:4},
        {name:'礼品消费',value:5},
        {name:'礼品过期',value:6},

       ]
   }
 


}

export const liquidationApi = new LiquidationApi(); 
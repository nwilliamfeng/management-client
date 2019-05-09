import { ApiHelper } from './apiHelper'
import moment from 'moment';

/**
 * 调用卡券服务的API
 */
class CustomerApi {

    async getCustomerPoints(userId, pageIndex = 1, pageSize = 20) {
        const result = await ApiHelper.post('/customer/getCustomerPoints', { userId, pageIndex, pageSize });
        return result;
    }


    getPointReferTypes() {
        return [
            { name: '参加任务', value: '1' },
            { name: '兑换礼品', value: '2' },
            { name: '系统调减', value: '3' },
            { name: '系统调增', value: '4' },
            { name: '活动奖励', value: '5' },
            { name: '交易返还', value: '6' },

        ]
    }

    getUserGiftStates() {
        return [
            { value: 0, name: "全部" },
            { value: 1, name: "未激活" },
            { value: 2, name: "未使用" },
            { value: 3, name: "已使用待发放" },
            { value: 4, name: "已使用已发放成功" },
            { value: 5, name: "已使用已发放失败" },
            { value: 6, name: "已过期" },
            { value: 7, name: "无效的" },
            { value: 8, name: "冻结的" },
            { value: 9, name: "等待交易申请确认" },
            { value: 10, name: "已补发" },
            { value: 88, name: "已使用查询" },

        ]
    }

    async getCustomerPointFlowsFromDayReport(userId, startTime, endTime, pageIndex, pageSize) {
        const result = await ApiHelper.post('/customer/getCustomerPointFlowsFromDayReport'
            , {
                startTime: moment(startTime).format('YYYY-MM-DD hh:mm:ss')
                , endTime: moment(endTime).format('YYYY-MM-DD hh:mm:ss')
                , userId
                , pageIndex
                , pageSize
            });
        return result;
    }

    async getCustomerGiftList(userId, usergiftId, giftId, giftType, giftState, pageIndex, pageSize) {
        const result = await ApiHelper.post('/customer/getCustomerGiftList'
            , {
                userId, usergiftId, giftId, giftType, giftState, pageIndex, pageSize
            });
        return result;
    }


}

export const customerApi = new CustomerApi(); 
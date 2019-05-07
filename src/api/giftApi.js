import { ApiHelper } from './apiHelper'
import moment from 'moment';

/**
 * 调用卡券服务的API
 */
class GiftApi {

    async loadGifts(giftId, startTime, endTime, activeName, giftType, giftState, isEnabled, isDel, pageIndex = 1, pageSize = 20) {
        const result = await ApiHelper.get(`/gift/loadGifts?giftId=${giftId}&startTime=${startTime}&endTime=${endTime}
        &activeName=${activeName}
        &giftType=${giftType}
        &giftState=${giftState}
        &isEnabled=${isEnabled}
        &isDel=${isDel}
        &pageIndex=${pageIndex}
        &pageSize=${pageSize}`);

        result.data.forEach(x => {
            x.expireTime = moment(x.expireTime).format('YYYY-MM-DD');
            x.beginTime = moment(x.beginTime).format('YYYY-MM-DD');
            x.endTime = moment(x.endTime).format('YYYY-MM-DD');
        });
        return result;
    }


    getGiftTypes() {
        return [
            { name: '现金券', value: 1 },
            { name: '满返券', value: 5 },
            { name: '满减券', value: 6 },
            { name: '可变现金券', value: 7 },
            { name: '定投券', value: 8 },
            { name: '兑换券', value: 9 },
            { name: '话费券', value: 10 },
            { name: '体验金券', value: 11 },
        ]
    }


    async addOrUpdateGift(gift) {
        const result = await ApiHelper.post('/task/AddOrUpdateTask', gift);
        return result;
    }



}

export const giftApi = new GiftApi(); 
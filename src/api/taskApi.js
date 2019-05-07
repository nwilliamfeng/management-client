import { ApiHelper } from './apiHelper'
import moment from  'moment' ;
 
/**
 * 调用任务服务的Api
 */
class TaskApi {

    async loadTasks(platformId, startTime,  endTime ,pageIndex = 1, pageSize = 10) {
        const result = await ApiHelper.get(`/task/loadTasks?platformId=${platformId}&startTime=${startTime}&endTime=${endTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
        result.data.forEach(x=>{
            x.createTime=moment(x.createTime).format('YYYY-MM-DD');
            x.beginTime=moment(x.beginTime).format('YYYY-MM-DD');
            x.endTime=moment(x.endTime).format('YYYY-MM-DD');
        });
    
        return result;
    }
 

    async getPlatforms() {
        return await ApiHelper.get('/task/GetPlatforms');
    }

    async getTaskTags() {
        return await ApiHelper.get('/task/getTaskTags');
    }

    async addOrUpdateTask(task) {
        const result = await ApiHelper.post('/task/AddOrUpdateTask', task);
        return result;
    }

    async addOrUpdateTaskTag(taskTag) {
        const result = await ApiHelper.post('/task/AddOrUpdateTaskTag', taskTag);
        return result;
    }

}

export const taskApi = new TaskApi(); 
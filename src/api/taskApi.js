import { ApiHelper } from './apiHelper'
import moment from 'moment'

class TaskApi {

    async loadTasks(platformId, startTime,  endTime ,pageIndex = 1, pageSize = 10) {
        const result = await ApiHelper.get(`/task/loadTasks?platformId=${platformId}&startTime=${startTime}&endTime=${endTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
        // console.log(result);
        return result;
    }

    async createTask() {
        const result = await ApiHelper.get('/task/getdefaulttask');
        result.name = '新任务';
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

}

export const taskApi = new TaskApi(); 
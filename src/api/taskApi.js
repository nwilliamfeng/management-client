import { ApiHelper } from './apiHelper'
import  moment from 'moment'

class TaskApi {

    async loadTasks(pageIndex=1,pageSize=10) {
        const result = await ApiHelper.get(`/task/loadTasks?pageIndex=${pageIndex}&pageSize=${pageSize}`);
        return result;
    }

    async createTask(){
        const result = await ApiHelper.get('/task/getdefaulttask');
        result.name='abc';
        result.beginDate=moment().format('YYYY-MM-DD');
        result.endDate=moment().format('YYYY-MM-DD');
        console.log(result);
        // result.beginTime=moment().format('YYYY-MM-DD');
        // result.endTime=moment().format('YYYY-MM-DD');
        // result.createTime=moment().format('YYYY-MM-DD');
        return result;
    }

    async getPlatforms(){
        return await ApiHelper.get('/task/GetPlatforms');
    }

    async getTaskTags(){
        return  await ApiHelper.get('/task/getTaskTags');
    }

    async addTask(task){
       const result = await ApiHelper.postByForm('/task/addtask',task);
       console.log(result);
    }

}

export const taskApi=new TaskApi(); 
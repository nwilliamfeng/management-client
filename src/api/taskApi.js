import { ApiHelper } from './apiHelper'
import  moment from 'moment'

class TaskApi {

    async loadTasks() {
        return [{TaskID:'1001',Description:'任务描述1',PlatformID:1},{TaskID:'1002',Description:'任务描述2',PlatformID:2}]
    }

    async createTask(){
        const result = await ApiHelper.get('/task/getdefaulttask');
        result.name='';
        result.beginTime=moment().format('YYYY-MM-DD');
        result.endTime=moment().format('YYYY-MM-DD');
        result.createTime=moment().format('YYYY-MM-DD');
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
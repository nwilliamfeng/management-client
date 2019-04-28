import { ApiHelper } from './apiHelper'

class TaskApi {

    async loadTasks() {
        return [{TaskID:'1001',Description:'任务描述1',PlatformID:1},{TaskID:'1002',Description:'任务描述2',PlatformID:2}]
    }

    async createTask(){
        const result = await ApiHelper.get('/task/getdefaulttask');
        return result;
    }

}

export const taskApi=new TaskApi(); 
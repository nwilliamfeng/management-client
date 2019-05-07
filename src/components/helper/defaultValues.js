import moment from 'moment'


export const defaultValues={
    task:  {
        allowUserGroup:null,
        beginTime:moment().format('YYYY-MM-DD'),
        crc32: 0,
        createTime: moment().format('YYYY-MM-DD'),
        dayLimit: 0,
        dayTimes: 0,
        description:null,
        endTime: moment().format('YYYY-MM-DD'),
        flowType: 0,
        groupName:null,
        isDel: false,
        isEnabled: true,
        isNeedGet: false,
        name:'',
        operator:null,
        platformID: 0,
        point: 0,
        tagId: 0,
        taskButtonText:null,
        taskExpireDays: 100,
        taskID:null,
        taskIconUrl:null,
        taskMaxPoint: 0,
        taskMinPoint: 0,
        taskRewardType: 7,
        taskSort: 2,
        taskState: 1,
        taskStrategyID:null,
        taskSubType: 0,
        taskType: 5,
        taskUrl:null,
        totalLimit: 0,
        totalTimes: 0,
        updateTime: moment().format('YYYY-MM-DD')},


}
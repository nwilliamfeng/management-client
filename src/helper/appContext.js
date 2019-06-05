 

class AppContext {

    constructor() {
        const stData = localStorage.getItem(AppContext.name);
        this._staff = stData ? JSON.parse(stData).staff : null;
    }

    /**
     * 定义常量设置项名称
     */
    static get name() {
        return 'AppContext';
    }

    get appKeys() {
        const staff = this.currentStaff;
        if (staff == null) {
            return [];
        }
        else {
            return staff.AppKeys.split(',');
        }
    }

    get currentStaff() {
         return this._staff;
    }

    /** 
     * 返回客服的服务传递参数
    */
    getStaffParams(){
        return {   
            staffId: this.currentStaff.StaffId,
            token :this.currentStaff.Token,
            ip : util.getIpAddress(),
            appKey:this.appKeys[0],    
      }
    }



    set currentStaff(staff) {
        this._staff=staff;
        const item = localStorage.getItem(AppContext.name);

        const data = item ? JSON.parse(item) : {};

        data.staff = staff;

        localStorage.setItem(AppContext.name, JSON.stringify(data));
    }


    clear() {
        localStorage.removeItem(AppContext.name);
        this._staff=null;
    }
}

export const appContext = new AppContext();
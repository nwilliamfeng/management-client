import { isBoolean, isDate } from 'util';
import  moment from 'moment'

class FormHelper {

    setDateFormat(obj,propertyNames=[]){
      propertyNames.forEach(name=>{
        if( obj[name]!=null){
            obj[name]=moment(obj[name]).format('YYYY-MM-DDTHH:MM:ss');
        }
      })  
      return obj;
    }

    revertDateFormat(obj,propertyNames=[]){
        propertyNames.forEach(name=>{
            if( obj[name]!=null){
                obj[name]=obj[name].replace('T',' ');
            }
          })  
        return obj;
    }

    setTagetPropertyValueByEvent(obj, e) {
 
        let value = e.target.value;
        const propName = `${e.target.name}`;
        //这里需要加判断，如果是其他类型的话也需要转换
        if (obj[propName] === parseInt(obj[propName])) {
            obj[propName] = parseInt(value);
        }
        else if (isBoolean(obj[propName])) {
            obj[propName] = JSON.parse(value);
        }
        else if (isDate(obj[propName])) {
            obj[propName] = new Date(value);
        }
        else {
            obj[propName] = value;
        }
        return obj;
    }
}

export const formHelper =new  FormHelper();
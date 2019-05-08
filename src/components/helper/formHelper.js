import { isBoolean, isDate } from 'util';

class FormHelper {

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
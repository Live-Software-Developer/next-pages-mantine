import axios from 'axios';
import { isArray, isObject } from 'util';

export function getTitleOrder(order) {
    switch (order) {
        case '1':
            return 1
        case '2':
            return 2
        case '3':
            return 3
        case '4':
            return 4
        case '5':
            return 5
        case '6':
            return 6
        default:
            return 3
    }
}

export function displayErrors(form, errors, parentKey = null) {
    console.log(errors)
    for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
            const key = parentKey ? `${parentKey}.${field}` : field;
            const value = errors[field];

            if (isArray(value)){
                form.setFieldError(key, value?.join(", "))
            }
            else if (isObject(value)){
                displayErrors(form, value, key);
            }
        }
    }
}

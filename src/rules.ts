/**
 * 校验规则
 */

import { isEmpty } from './util/data';

export default {
    required ({ value, message = '不能为空' }: { value: string, message?: string }) {
        if (isEmpty(value)) {
            return message;
        }
    }
}
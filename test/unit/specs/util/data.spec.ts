import { isEmpty } from '../../../../src/util/data';
import 'jasmine'

describe('Data Util', () => {
    describe('isEmpty', () => {
        it('should be true', () => {
            [undefined, null, '', ' ', [], {}].map(item => {
                expect(isEmpty(item)).toBe(true);
            })
        });
        it('should be false', () => {
            [0, false, 'null', 'undefined', '[]', '{}'].map(item => {
                expect(isEmpty(item)).toBe(false);
            })
        })
    });
});
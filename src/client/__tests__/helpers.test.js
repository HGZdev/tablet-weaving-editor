import {mockFunc} from '../helpers'

test('T01', async () => {
	expect(mockFunc(6)).toEqual(36)
})

import React from 'react'
import Box from 'Components/Box/Box'
import renderer from 'react-test-renderer'
import {mockFunc} from '../helpers'

it('T01 Render Box', () => {
	const tree = renderer.create(<Box>Hello world!</Box>).toJSON()
	expect(tree).toMatchInlineSnapshot(`
		<div
		  className="sc-AxjAm cSmAjh"
		>
		  Hello world!
		</div>
	`)
})

it('T02 Check mockFunc', () => {
	expect(mockFunc(6)).toEqual(36)
})

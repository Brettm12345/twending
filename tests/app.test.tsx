/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import React from 'react'
import { create } from 'react-test-renderer'
import Home from '../src/pages'

it('Renders without an error', () => {
  expect(create(<Home />).toJSON()).toMatchSnapshot()
})

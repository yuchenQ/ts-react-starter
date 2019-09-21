/** @format */

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render without errors', () => {
    const component = shallow(<App />);

    console.log(component.debug());

    const wrapper = component.find('.jest');
    expect(wrapper.length).toBe(1);
  });
});

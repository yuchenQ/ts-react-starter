/** @format */

import React from 'react';
import styled from 'styled-components';
import './normalize.css';
import './index.css';

const H1 = styled.h1`
  color: red;
`;

const App = (): JSX.Element => <H1 className="jest">Hello World!</H1>;

export default App;

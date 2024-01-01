// import React from "react";
// import ReactDOM from "react-dom";
// import Routes from "./Routes";

// ReactDOM.render(<Routes />, document.getElementById("root"));

import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './Routes';

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(<Routes />);

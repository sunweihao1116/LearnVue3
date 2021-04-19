import { createApp } from './src/runtime-canvas';
import { getRootContainer } from './src/game';
import App from './src/App';


createApp(App).mount(getRootContainer());
import Main from './components/views/Main'

import { Buffer } from 'buffer';

global.Buffer = Buffer;

const App = () => {
    return <Main />;
}

export default App; 

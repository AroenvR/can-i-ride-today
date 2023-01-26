import { Routes, Route } from 'react-router-dom';

import { Hello } from './components/Hello';

/**
 * The application's main component.
 */
function App() {
  return (
    <div className="App">
        <p>Hello from App.tsx</p>
      
        <Routes>
            <Route path="/component" element={<Hello/>} />
        </Routes>

    </div>
  );
}

export default App;

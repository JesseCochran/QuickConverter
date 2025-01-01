
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LengthConverter from "./components/LengthConverter.tsx";
import CurrencyConverter from "./components/CurrencyConverter.tsx";
import TemperatureConverter from "./components/TemperatureConverter.tsx";

function App() {
  return (
    <Router>
      <div className="p-4 bg-blue-500 text-white min-h-screen">
      <header className="mb-4 text-center">
          <h1 className="text-4xl font-bold">Quick Converter</h1>
        </header>
        <nav className="mb-4 flex justify-center space-x-4">
          <Link className="text-lg underline" to="/QuickConverter">Home</Link>
          <Link className="text-lg underline" to="/length">Length</Link>
          <Link className="text-lg underline" to="/currency">Currency</Link>
          <Link className="text-lg underline" to="/temperature">Temperature</Link>
        </nav>

        <Routes>
          <Route path="/QuickConverter" element={
            <>
              <h1 className="text-2xl">Welcome to the Quick Converter!</h1>
              <p className="mt-2">Choose a conversion tool above to get started.</p>
            </>
          } />
          <Route path="/length" element={<LengthConverter />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/temperature" element={<TemperatureConverter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
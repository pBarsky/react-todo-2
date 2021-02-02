import { BrowserRouter } from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

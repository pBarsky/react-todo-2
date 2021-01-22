import Layout from "./components/UI/Layout/Layout";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;

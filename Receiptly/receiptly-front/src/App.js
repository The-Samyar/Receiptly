import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import History from "./Pages/History";
import Products from "./Pages/Products";
import CurrentRecepits from "./Pages/CurrentRecepits";
import './App.css'
import client from "./GraphQL/Client";
import { ApolloProvider } from "@apollo/client";
import { SignUpIn } from "./Pages/SignUpIn";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/yourProducts" element={<Products />} />
          <Route path="/currentRecepits" element={<CurrentRecepits />} />
          <Route path="/signUp" element={<SignUpIn />} />
          <Route path="/signIn" element={<SignUpIn login />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;

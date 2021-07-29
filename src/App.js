import "./style/App.css";
import React from "react";
import keys from "./components/Keys";
import Nav from "./components/Nav";
import block from "./components/Block";
import Blockchain from "./components/Blockchain";
import blockchainSigned from "./components/BlockchainSigned";
import coinbase from "./components/CoinBase";
import distributed from "./components/Distributed";
import hash from "./components/Hash";
import signatures from "./components/Signatures";
import tokens from "./components/Tokens";
import transaction from "./components/Transaction";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  return (
    <>
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={hash} />
          <Route path="/Keys" component={keys} />
          <Route path="/Block" component={block} />
          <Route path="/Blockchain">
            <Blockchain />
          </Route>
          <Route path="/BlockchainSigned" component={blockchainSigned} />
          <Route path="/CoinBase" component={coinbase} />
          <Route path="/Distributed" component={distributed} />
          <Route path="/Signatures" component={signatures} />
          <Route path="/Tokens" component={tokens} />
          <Route path="/Transaction" component={transaction} />
          <Route path="/" component={hash} />
          Hash
        </Switch>
      </div>
    </Router>
    <footer className ="Footer">
      Avi Shakuri & Adam Meirov
    </footer>
    </>
  );
};


export default App;

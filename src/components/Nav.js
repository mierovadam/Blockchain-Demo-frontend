import React from "react";
import style from "../style/App.css";
import { Link } from "react-router-dom";
import BlockchainImage from "/Users/adammierov/Desktop/blockchain-fronted/src/blockchain.png";

function Nav() {

  return (
    <>
      <nav>
        <div>
          <img className="image" src={BlockchainImage} alt="" />
        </div>
        <ul className="nav-links">
          <Link className={style.navStyle} to="/">
            <li>
              <a>Hash</a>
            </li>
          </Link>
          <Link className={style.navStyle} to="/Block">
            <li> <a>Block</a></li>
          </Link>
          <Link className={style.navStyle} to="/Blockchain">
            <li> <a> Blockchain</a></li>
          </Link>
          <Link className={style.navStyle} to="/Distributed">
            <li><a> Distributed</a></li>
          </Link>
          <Link className={style.navStyle} to="/Tokens">
            <li><a>Tokens</a></li>
          </Link>
          <Link className={style.navStyle} to="/CoinBase">
            <li><a>CoinBase</a></li>
          </Link>
          <Link className={style.navStyle} to="/Keys">
            <li><a>Keys</a></li>
          </Link>
          <Link className={style.navStyle} to="/Signatures">
            <li><a>Signatures</a></li>
          </Link>

          <Link className={style.navStyle} to="/Transaction">
            <li><a>Transaction</a></li>
          </Link>
          <Link className={style.navStyle} to="/BlockchainSigned">
            <li><a>BlockchainSigned</a></li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;

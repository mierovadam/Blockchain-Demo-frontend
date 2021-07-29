import React, { useState, useEffect } from "react";
import style from "../style/Block.Module.css";
import Tx from "./Tx";
import Coin from "./Coin";
import TxKeys from "./TxKeys";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Block = ({
  type,
  bNumber,
  initNonce,
  initHash,
  initPrevHash,
  stringData,
  initTx,
  initCoin,
}) => {
  const [blockNumber, setBlockNumber] = useState(
    bNumber ? parseInt(bNumber) : 1
  );
  const [nonce, setNonce] = useState(initNonce ? parseInt(initNonce) : 88483);
  const [blockData, setBlockData] = useState(stringData ? stringData : "");
  const [flagChangeField, setFlagChangeField] = useState(true);
  const [prevHash] = useState(initPrevHash ? initPrevHash : "");
  const [hash, setHash] = useState(initHash ? initHash : "");

  const [loading, setLoading] = useState(false);

  const [tokens] = useState(initTx ? initTx : "");
  const [coin] = useState(initCoin ? initCoin : "");

  useEffect(() => {

    setHash(sha256(blockNumber + nonce + blockData + prevHash).toString());

  }, [blockNumber, nonce, blockData, prevHash]);

  const handleChangeTx = (args, argv) => {
    let str = "";

    if (argv === "coin" && type === "TX,CoinBase") {
      coin.amount = args[0];
      coin.to = args[1];
      str = str + coin.amount + coin.to;
      for (let i = 0; i < tokens.length; i++) {
        str += tokens[i].amount + tokens[i].from + tokens[i].to;
      }
    } else if (argv === "tx" && type === "TX,CoinBase") {
      str = coin.amount + coin.to;
      for (let i = 0; i < tokens.length; i++) {
        if (i === args[0]) {
          tokens[i].amount = args[1];
          tokens[i].from = args[2];
          tokens[i].to = args[3];
        }
        str += tokens[i].amount + tokens[i].from + tokens[i].to;
      }
    } else {
      for (let i = 0; i < tokens.length; i++) {
        if (argv === "tx" && i === args[0]) {
          tokens[i].amount = args[1];
          tokens[i].from = args[2];
          tokens[i].to = args[3];
        }
        str += tokens[i].amount + tokens[i].from + tokens[i].to;
      }
    }
    setBlockData(str);
  };

  const handleChangeTxKeys = (args, argv) => {
    let str = ""

    if (argv === "coin" && type === "TXKeys,CoinBase") {
      coin.amount = args[0];
      coin.to = args[1];
      str = str + coin.amount + coin.to;
    } else {
      str = str + coin.amount + coin.to;
    }
    for (let i = 0; i < tokens.length; i++) {
      if (i === args[0]) {
        tokens[i].amount = args[1];
        tokens[i].fromPublic = args[2];
        tokens[i].toPublic = args[3];
        tokens[i].signature = args[4];
      }
      str +=
        tokens[i].amount +
        tokens[i].fromPublic +
        tokens[i].toPublic +
        tokens[i].signature;

    }
    setBlockData(str);
  };

  useEffect(() => {
    if (hash.substring(0, 5) !== Array(5).join("0") && hash !== "") {
      handleSubmit(false);
    }
  }, []);

  useEffect(() => {
    if (hash.substring(0, 4) === "0000") {
      setFlagChangeField(true);
    } else {
      setFlagChangeField(false);
    }
  }, [hash]);

  const handleChangedFields = (e) => {
    let value = e.target.value;

    if (e.target.id === "blockDataID") {
      setBlockData(value ? value : "");
    } else if (e.target.id === "nonceId") {
      setNonce(value ? parseInt(value) : 1);
    } else if (e.target.id === "blockNumberID") {
      setBlockNumber(value ? parseInt(value) : 1);
    }
  };

  //Calculate Nonce for data with 4 leading zeroes
  const handleSubmit = (e) => {
    if (e !== false) {
      e.preventDefault();
      setLoading(true);
    }
    axios
      .get("http://localhost:3001/mineblock", {
        params: {
          index: blockNumber,
          nonce: nonce,
          data: blockData,
          prevHash: prevHash,
        },
      })
      .then((res) => {
        if (e !== false) {
          setNonce(res.data.nonce);
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <div className={flagChangeField ? style.border : style.redborder}>
        <form className="hash-form" onSubmit={handleSubmit}>
          <table className={style.table}>
            <tbody>
              <tr className={style.col}>
                <td>
                  <label className={style.labelData}>Block: </label>
                </td>
                <td>
                  <input
                    id="blockNumberID"
                    type="number"
                    className={style.textareaHash}
                    onChange={handleChangedFields.bind(this)}
                    value={blockNumber}
                  ></input>
                </td>
              </tr>
              <tr className={style.col}>
                <td>
                  <label className={style.labelData}>Nonce: </label>
                </td>
                <td>
                  <input
                    id="nonceId"
                    type="number"
                    className={style.textareaHash}
                    onChange={handleChangedFields.bind(this)}
                    value={nonce}
                  ></input>
                </td>
              </tr>
              <tr className={style.col}>
                {type === "TX,CoinBase" ? (
                  <>
                    <td className={style.col}>
                      <label className={style.labelData}>CoinBase:</label>
                    </td>
                    <Coin
                      initDollar={coin.amount}
                      initTo={coin.to}
                      propCoin={handleChangeTx}
                    />
                  </>
                ) : type === "TXKeys,CoinBase" ? (
                  <>
                    <td className={style.col}>
                      <label className={style.labelData}>CoinBase:</label>
                    </td>
                    <Coin
                      initDollar={coin.amount}
                      initTo={coin.to}
                      propCoin={handleChangeTxKeys}
                    />
                  </>
                ) : (
                  <></>
                )}
              </tr>
              <tr className={style.col}>
                {type === undefined || type === "BlockChain" ? (
                  <>
                    <td>
                      <label className={style.labelData}> Data : </label>
                    </td>
                    <tr>
                      <textarea
                        className={style.textareaData}
                        type="text"
                        id="blockDataID"
                        rows="10"
                        col="40"
                        onChange={handleChangedFields.bind(this)}
                      ></textarea>
                    </tr>
                  </>
                ) : type === "TX" || type === "TX,CoinBase" ? (
                  <>
                    <td>
                      <label className={style.labelData}>TX:</label>
                    </td>
                    {Object.values(tokens).map((item, i) => (
                      <tr>
                        <Tx
                          key={i}
                          index={i}
                          initDollar={item.amount}
                          initFrom={item.from}
                          initTo={item.to}
                          propTx={handleChangeTx}
                        />
                      </tr>
                    ))}
                  </>
                ) : type === "TXKeys,CoinBase" ? (
                  <>
                    <td>
                      <label className={style.labelData}>TX:</label>
                    </td>
                    {Object.values(tokens).map((item, i) => (
                      <>
                        <tr>
                          <TxKeys
                            initPrivKey={item.toPrivate}

                            initIndex={i}
                            initDollar={item.amount}
                            initFrom={item.fromPublic}
                            initTo={item.toPublic}
                            propTxKeys={handleChangeTxKeys}
                          />
                        </tr>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </tr>
              <tr className={style.col}>
                {type === undefined ? (
                  <></>
                ) : (
                  <>
                    <td>
                      {" "}
                      <label className={style.labelData}>Prev:</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        className={style.textareaHash}
                        value={prevHash}
                        disabled
                      ></input>
                    </td>
                  </>
                )}
              </tr>
              <tr className={style.col}>
                <td>
                  <label className={style.labelData}>Hash:</label>
                </td>
                <td>
                  <input
                    type="text"
                    className={style.textareaHash}
                    disabled={true}
                    value={hash}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className={style.mineButton}>
            {loading ? "" : "Mine"}
            <ClipLoader color={"#25373b"} loading={loading} size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default Block;

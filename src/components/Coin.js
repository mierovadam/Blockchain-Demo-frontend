import React, { useState, useEffect } from "react";
import style from "../style/Block.Module.css";
function Coin({ initDollar, initTo, propCoin }) {
  const [dollar, setDollar] = useState(initDollar);
  const [to, setTo] = useState(initTo);
  const handleChangeField = (e) => {
    if (e.target.id === "dollar") {
      setDollar(e.target.value);
    } else if (e.target.id === "to") {
      setTo(e.target.value);
    }
  };
  useEffect(() => {
    propCoin([dollar, to], "coin");
  }, [to, dollar]);
  return (
    <div>
      <table className={style.table}>
        <tbody>
          <tr className={style.col}>
            <td>
              <label className={style.labelData}>$ </label>
            </td>
            <td>
              <input
                className={style.textareaTx}
                id="dollar"
                value={dollar}
                onChange={handleChangeField}
              ></input>
            </td>
            <td>
              <label className={style.labelData}>To: </label>
            </td>
            <td>
              <input
                className={style.textareaTx}
                id="to"
                value={to}
                onChange={handleChangeField}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Coin;

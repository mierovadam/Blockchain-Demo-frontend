import React from "react";
import style from "/Users/adammierov/Desktop/blockchain-fronted/src/style/Keys.Module.css";

function CoinTransaction({ dollar, from, to, prop }) {


  const handleChangeField = (e) => {
    prop(e);
  }
  return (
    <div>
      <table className={style.table}>
        <tbody>
          <tr className={style.col}>
            <td>
              <label className={style.labelTable}> $ </label>
              <input
                type="number"
                id="dollar"
                className={style.textareaSmallest}
                value={dollar}
                onChange={handleChangeField}
              ></input>
            </td>

            <td>
              <label className={style.labelTable}> From: </label>
              <input
                id="from"
                className={style.textareaSmallest}
                value={from}
                onChange={handleChangeField}
              ></input>
            </td>
            <td>
              <label className={style.labelTable}> To: </label>
              <input
                id="to"
                className={style.textareaSmallest}
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
export default CoinTransaction;

import { useState } from "react";
import "./styles.css";

function App() {
  // bill state
  const [bill, setBill] = useState(0);
  // tip state
  const [tip, setTip] = useState(0);

  // friend tip
  const [friendTip, setFriendTip] = useState(0);

  // total tip
  const totalTip = bill * ((tip + friendTip) / 2 / 100);

  // set friends tip function
  function handleFriendTip(ft) {
    setFriendTip(ft);
  }
  // set Tip function
  function handleSetTip(tip) {
    setTip(tip);
  }
  // set bill function
  function handleSetBill(bill) {
    setBill(bill);
  }

  // reset all States
  function handleReset() {
    setBill(0);
    setTip(0);
    setFriendTip(0);
  }
  return (
    <div>
      <Bill onSetBill={handleSetBill} bill={bill} />
      <Tip onSetTip={handleSetTip} tips={tip}>
        <span>How did you like the service?</span>
      </Tip>
      <Tip onSetTip={handleFriendTip} tips={friendTip}>
        <span>How did your friend like the service?</span>
      </Tip>
      {bill > 0 && (
        <>
          <Total totalBill={bill} totalTips={totalTip} bill={bill} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

// Bill component
function Bill({ onSetBill, bill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        value={bill}
        placeholder="Enter amount"
        onChange={(event) => onSetBill(Number(event.target.value))}
      ></input>
    </div>
  );
}

// resuable Tip component
function Tip({ onSetTip, tips, children }) {
  return (
    <div>
      {children}
      <select
        value={tips}
        onChange={(event) => onSetTip(Number(event.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Excellent (20%)</option>
      </select>
    </div>
  );
}

// Total component
function Total({ totalBill, totalTips, bill }) {
  // if bill isnt 0, render the total pay and reset button, otherwise nothing
  return (
    <div>
      <h2>
        You pay ${totalBill + totalTips} (${totalBill} + ${totalTips} tip)
      </h2>
    </div>
  );
}

// Reset component
function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default App;

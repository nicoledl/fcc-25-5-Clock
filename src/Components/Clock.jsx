import Timer from "./Timer";
import CounterBreak from "./CounterBreak";
import CounterSession from "./CounterSession";

const Clock = () => {
  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div className="counters d-flex">
        <CounterBreak />
        <CounterSession />
      </div>
      <Timer />
    </div>
  );
};

export default Clock;

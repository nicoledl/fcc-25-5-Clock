import {
  FiChevronsDown,
  FiChevronDown,
  FiChevronUp,
  FiChevronsUp,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setInterval } from "../store";

const CounterBreak = () => {
  const dispatch = useDispatch();
  const interval = useSelector((state) => state.interval);

  const handleChange = (operator) => {
    switch (operator) {
      case "add":
        if (interval >= 5) return;
        dispatch(setInterval(interval + 1));
        break;

      case "substract":
        if (interval <= 1) return;
        dispatch(setInterval(interval - 1));
        break;

      case "max":
        dispatch(setInterval(5));
        break;

      case "min":
        dispatch(setInterval(1));
        break;

      default:
        break;
    }
  };

  return (
    <div id="break-label">
      <p>Break Length</p>
      <div className="d-flex">
        <FiChevronsDown
          size={20}
          onClick={() => handleChange("min")}
          style={{ cursor: "pointer" }}
        />
        <FiChevronDown
          size={20}
          id="break-decrement"
          onClick={() => handleChange("substract")}
          style={{ cursor: "pointer" }}
        />
        <p id="break-length">{interval}</p>
        <FiChevronUp
          size={20}
          id="break-increment"
          onClick={() => handleChange("add")}
          style={{ cursor: "pointer" }}
        />
        <FiChevronsUp
          size={20}
          onClick={() => handleChange("max")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CounterBreak;

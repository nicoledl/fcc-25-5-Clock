import {
  FiChevronsDown,
  FiChevronDown,
  FiChevronUp,
  FiChevronsUp,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setTimeSession } from "../store";

const CounterSession = () => {
  const dispatch = useDispatch();
  const timeSession = useSelector((state) => state.timeSession);

  const handleChange = (operator) => {
    switch (operator) {
      case "add":
        if (timeSession >= 60) return;
        dispatch(setTimeSession(timeSession + 1));
        break;

      case "substract":
        if (timeSession <= 1) return;
        dispatch(setTimeSession(timeSession - 1));
        break;

      case "max":
        dispatch(setTimeSession(60));
        break;

      case "min":
        dispatch(setTimeSession(1));
        break;

      default:
        break;
    }
  };

  return (
    <div id="session-label">
      <p>Session Length</p>
      <div className="d-flex">
        <FiChevronsDown
          size={20}
          onClick={() => handleChange("min")}
          style={{ cursor: "pointer" }}
        />
        <FiChevronDown
          size={20}
          id="session-decrement"
          onClick={() => handleChange("substract")}
          style={{ cursor: "pointer" }}
        />
        <p id="session-length">{timeSession}</p>
        <FiChevronUp
          size={20}
          id="session-increment"
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

export default CounterSession;

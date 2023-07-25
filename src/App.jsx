import React, { useState, useReducer, useEffect } from "react";
import {reducer, initialState} from "./reducer"
var myInt;


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    dispatch({ type: "set_initial"});
  }, []);

  useEffect(() => {
    if (state.sec == 0) {
      dispatch({ type: "decrease_minute" });
      dispatch({ type: "set_default_sec" });
    }
    if (state.min == -1) {
      clearInterval(myInt);
      dispatch({ type: "finished" });
      dispatch({ type: "set_minute", payload: 0 });
    }
  }, [state.sec, state.min]);

  const passSec = () => {
    dispatch({ type: "decrease_sec" });
  };
  const handleStart = () => {
    if (!state.finished) {
      myInt = setInterval(passSec, 1000);
      dispatch({ type: "disable" });
      dispatch({ type: "startButton", payload: "Resume" });
    }
  };

  const handleStop = () => {
    clearInterval(myInt);
    dispatch({ type: "not_disable" });
  };

  const reset = () => {
    clearInterval(myInt);
    if (state.isSetTime) {
      dispatch({ type: "set_sec" });
      dispatch({ type: "set_minute", payload: state.minVal });
    } else {
      dispatch({ type: "set_default_sec" });
      dispatch({ type: "reset_minute" });
    }
    dispatch({ type: "not_disable" });
    dispatch({ type: "not_finished" });
    dispatch({ type: "startButton", payload: "Start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInterval(myInt);
    dispatch({ type: "not_disable" });
    dispatch({ type: "not_finished" });
    dispatch({ type: "startButton", payload: "Start" });
    dispatch({ type: "is_set_time" });
    dispatch({ type: "set_random" });
  };

  return (
    <>
      {!state.finished ? (
        <div style={{ color: "white" }}>
          <h1>
            {state.sec == state.secondPerMinute &&
            state.min == state.givenMinute - 1 
              ? state.givenMinute
              : state.min}{" "}
            : {state.sec < 10 ? "0" : ""}{state.sec == state.secondPerMinute ? "00" : state.sec}
          </h1>
        </div>
      ) : (
        <h1 style={{ color: "red" }}>TIME IS UP</h1>
      )}
      <button id="start" disabled={state.dis} onClick={handleStart}>
        {state.startButtonValue}
      </button>
      <br></br>
      <button id="stop" disabled={state.finished} onClick={handleStop}>
        Stop
      </button>
      <br></br>
      <button id="reset" onClick={reset}>
        RESET
      </button>

      <form onSubmit={handleSubmit}>
        <p>Custom time</p>
        <input
          value={state.minVal}
          onChange={(e) =>
            dispatch({
              type: "handle_change_min",
              payload: parseInt(e.target.value),
            })
          }
          placeholder=" minute"
          type="number"
          max="60"
          min="0"
        />
        <br />
        <input
          value={state.secVal}
          onChange={(e) =>
            dispatch({
              type: "handle_change_sec",
              payload: parseInt(e.target.value),
            })
          }
          placeholder=" second"
          type="number"
          max="59"
          min="0"
        />
        <button
          disabled={
            (!parseInt(state.minVal) && !parseInt(state.secVal)) ||
            (state.minVal > 60 || state.secVal < 0)
          }
          id="set"
          type="submit"
        >
          set time
        </button>
      </form>
    </>
  );
}

export default App;

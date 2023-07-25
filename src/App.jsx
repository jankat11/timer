import React, { useState, useReducer, useEffect } from "react";

var myInt;

const reducer = (state, action) => {
  switch (action.type) {
    case "decrease_sec":
      return {
        ...state,
        sec: state.sec - 1,
      };
    case "disable":
      return {
        ...state,
        dis: true,
      };
    case "not_disable":
      return {
        ...state,
        dis: false,
      };
    case "startButton":
      return {
        ...state,
        startButtonValue: action.payload,
      };
    case "set_minute":
      return {
        ...state,
        min: action.payload,
      };
    case "reset_minute":
      return {
        ...state,
        min: state.givenMinute - 1,
      };
    case "decrease_minute":
      return {
        ...state,
        min: state.min - 1,
      };
    case "set_default_sec":
      return {
        ...state,
        sec: state.secondPerMinute,
      };
    case "set_sec":
      return {
        ...state,
        sec: state.secVal,
      };
    case "finished":
      return {
        ...state,
        finished: true,
      };
    case "not_finished":
      return {
        ...state,
        finished: false,
      };
    case "set_initial":
      return {
        ...state,
        sec: action.payload,
        min: state.givenMinute - 1,
      };
    case "handle_change_min":
      return {
        ...state,
        minVal: action.payload || 0,
      };
    case "handle_change_sec":
      return {
        ...state,
        secVal: action.payload || 0,
      };
    case "set_random":
      return {
        ...state,
        givenMinute: state.minVal,
        sec: state.secVal,
        min: state.minVal,
      };
    case "is_set_time":
      return {
        ...state,
        isSetTime: true,
      };
  }
};

const initialState = {
  secondPerMinute: 60,
  givenMinute: 30,
  sec: null,
  min: null,
  dis: false,
  finished: false,
  startButtonValue: "Start",
  minVal: "",
  secVal: "",
  isSetTime: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    dispatch({ type: "set_initial", payload: state.secondPerMinute });
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
            state.min == state.givenMinute - 1 &&
            state.givenMinute !== 1
              ? state.givenMinute
              : state.min}{" "}
            : {state.sec == state.secondPerMinute ? "00" : state.sec}
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

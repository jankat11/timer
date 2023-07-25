export const reducer = (state, action) => {
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
        sec: state.secondPerMinute,
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
        sec: state.secVal || 0,
        min: state.minVal || 0,
      };
    case "is_set_time":
      return {
        ...state,
        isSetTime: true,
      };
  }
};


export const initialState = {
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
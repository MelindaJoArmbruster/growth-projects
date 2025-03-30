import { type ReactNode, createContext, useContext, useReducer } from "react";
import Timer from "../components/Timer";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    stopTimers: () => void;
    startTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

// if instead you want to use the useReducer hook, you can do it like this:
//First set up initial state
const initialState: TimersState = {
    isRunning: true,
    timers: [],
};

export function useTimersContext() {
    const timersCtx = useContext(TimersContext);

    if (!timersCtx) {
        throw new Error('useTimersContext must be used within a TimersContextProvider');
    }

    return timersCtx;
}

type TimersContextProviderProps = {
    children: ReactNode;
};

type StartTimersAction = {
    type: 'START_TIMERS';
}
type StopTimersAction = {
    type: 'STOP_TIMERS';
}
type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer;
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
    // Define the reducer function to handle state changes
    // The reducer function takes the current state and an action as arguments
    // and returns the new state based on the action type
    switch (action.type) {
        case 'ADD_TIMER':
            return {
                ...state,
                timers: [
                    ...state.timers,
                    {
                        name: action.payload.name,
                        duration: action.payload.duration,
                    }
                ],
            };
        case 'START_TIMERS':
            return {
                ...state,
                isRunning: true,
            };
        case 'STOP_TIMERS':
            return {
                ...state,
                isRunning: false,
            };
        default:
            return state;
    }
}

export default function TimersContextProvider({children}: TimersContextProviderProps) {
    const [timerState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimersContextValue = {
        timers: timerState.timers,
        isRunning: timerState.isRunning,
        addTimer(timerData) {
            dispatch({
                type: 'ADD_TIMER',
                payload: timerData,
            });
        },
        startTimers() {
            dispatch({type: 'START_TIMERS'});
        },
        stopTimers() {
            dispatch({type: 'STOP_TIMERS'});
        },
    };

    return (
        <TimersContext.Provider value= {ctx}>
            {children}
        </TimersContext.Provider>
    );
}
# useState
- It lets u add state to ur functional components
- It returns a state variable and a func to handle it

### Lazy Initial State
- The initial state can be set using a function
- The function is only executed once during the component's initial render
- Useful when calculating the initial value is expensive

```js
// so rather than
// const [count, setCount] = useState(expensiveFun()); -> renders every time so to prevent it we use 
// lazy initial state -> renders only once 

const [count, setCount] = useState(() => expensivefunc());

/**
 *  Even if count is set as const but still setCount will be 
 *  able to update the value of count because it creates
 *  a new binding of that variable i.e a new variable is created and old one is deleted 
 *  when component is re rendered.
 * /
```


### Function updates vs direct updates
- Direct Updates - You pass the new value directly
```js
setCount(5)
```

- Function Updates - You pass a function that receives the previous state. It is preferred when new state is depend on prev state
```js
setCount(prevCount => prevCount + 1)
```

# useEffect
- It handles side effects like data fetching, subscriptions, or manual DOM manipulation
- Runs after every render by default
- It has optional 2nd argument - `Dependency Array` which controls when the effect runs
    - No dependency array - runs after every single render
    - Empty dependency array([]) - runs only once after initial render
    - Specified dependency array ([dep1, dep2]) - The effect runs only on the initial render and whenever any value in the array chnges
- useEffect can return a function, which is its `cleanup function`. The function runs before the component unmounts or before the effect runs again due to a dependency chnge. Essential for cleaning up resources.
```js
useEffect(()=>{
    // main work like api fetch, subscription

    return () => {
        // remove subscription or timers etc
        // this is called cleanup function
    }
}, [dependency array])
```


# useContext
- It allows to consume context in a functional component
- Context is like a global state that can be shared across different components without prop drilling
- `useContext`, `createContext` and `Provider` are a trio used to manage truly global data like a user's authentication status or lang settings or current theme
    - createContext - creates a context object
    - <Context.Provider> component provides the context's value to its all children
    - useContext - a hook that consumes the context's value in a child component

```jsx
import { useContext, createContext } from 'react';

const authContext = createContext();


function AuthProvider({ children }){
  // api for accessing user from backend
    return (

        <authContext.Provider value = {{ user , isLoading }}>
            {children}
        </authContext.Provider>

    )
}

export function useAuth(){
    const getUser = useContext(authContext);
    return getUser;
}

// or

// const useAuth = () => useContext(authContext);
```
- **Performance Consideration** - Change in Context Value triggers a re-render of all components consuming that context, even if they don't use that value. To mitigate this, use `useMemo` to memoize the value we pass the provider or break ur context into smaller more specific contexts.


# useMemo
- It lets you cache the prev result between the re-renders
```jsx
const cachedValue = useMemo(calculatedValue, [dependencies])
```

- Now if while re-rendering the dependecy is same then it will not recompute the calculated value
- Generally, React rerenders componenets whenever state or props chnges, meaning all calculations run again. That can decrease performance when an expensive function recalculates everytime, even though having same argument 


```jsx

import { useMemo, useState } from "react";

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const expensiveValue = useMemo(() => {
    console.log("Calculating...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) sum += i;
    return sum + count;
  }, [count]); // Only re-run when count changes

  return (
    <div>
      <h2>Expensive Value: {expensiveValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setShow(!show)}> 
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

```

✅ Without useMemo:

That huge loop runs every render, even when toggling show.

✅ With useMemo:

The loop runs only when count changes.

Toggling show (unrelated state) doesn’t re-run the heavy computation.

- Thus improves performance
    - when component renders frequently
    - when component rendering is expensive
    - when props rarely chnge

```
| Concept                 | What it checks                                                              |
| ----------------------- | --------------------------------------------------------------------------- |
| `useEffect(fn, [x])`    | React re-runs `fn` when `x` changes , it can't memoize the value                                       |
| `useMemo(fn, [x])`      | React recomputes memoized value when `x` changes                            |

```

```useMemo stores only ONE previous value — the last computed value.```

# useRef
- Creates a mutable reference object that persists across re-renders.
- Returns an object which has property .current
- `.current` property holds the value that doesn't trigger re - rendering.
- Eg, Focus Inputs, Timers etc. 

```jsx
const ref = useRef(initialValue);
ref.current = newValue;

```

# useReducer
- Used for managing complex state logic in functional components.
- Alternative to useState and is helpful when state depends on prev states or multiple related state variables

```jsx
const [state, dispatch] = useReducer(reducerFunction, initialState);

// dispatch -> as a setter of useState
// state -> new state
// reducerFunction -> function that decides how state changes
```

Example:
```jsx
import {useReducer} from 'react'
function reducer(prevState, action) {
    switch(action.type) {
        case "increment":
            return { count: prevState.count + 1 }; 
            // we can also deconstruct here if we have an object in our state => {...prevState, ...newState}, here we have only single element so no need to deconstruct
        
        case "decrement":
            return {count  : prevState.count - 1};
        
        case "reset"
            return {count : 0 };

        default : return prevState;
    }
}

export default function Counter() {
const [state, dispatch] = useReducer(reducer, {count : 0});

return (
    <div>
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
);
}
```

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { name: "", email: "" };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, { name: "", email: "" });

  const handleChange = (e) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
  };

  return (
    <form>
      <input name="name" value={state.name} onChange={handleChange} />
      <input name="email" value={state.email} onChange={handleChange} />
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </form>
  );
}
```


- It is called useReducer Because it’s based on the “reducer” pattern — a pure function that reduces (combines) a current state and an action into a new state.
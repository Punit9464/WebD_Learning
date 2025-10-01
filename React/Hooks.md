# useState
- It lets u add state to ur functional components
- It returns a state variable and a func to handle it

### Lazy Initial State
- The initial state can be set using a function
- The function is only executed once during the component's initial render
- Useful when calculating the initial value is expensive

```js
const [count, setCount] = useState(() => expensivefunc());
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

function useAuth(){
    const getUser = useContext(authContext);
    return getUser;
}

function AuthProvider({ children }){

    return (

        <authContext.Provider value = {{ user , isLoading}}>
            {children}
        </authContext.Provider>

    )
}
```
- **Performance Consideration** - Change in Context Value triggers a re-render of all components consuming that context. To mitigate this, use `useMemo` to memoize the value we pass the provider or break ur context into smaller more specific contexts.

# useReducer
- Used for managing complex state logic in functional components.
- Alternative to useState and is helpful when state depends on prev states or multiple related state variables
- 
# React Fundamentals
- React is a **declarative**, **component-based** JS library for building user interfaces
- Maintained By facebook / Meta
- Allow developers to create reusable components
- Uses **Virtual DOM**, a in-memory, lightweight copy of the real DOM. 
- When the state of a component changes, react first updates its virtual DOM, then efficiently calculates the minimal chnges needed to update real DOM => Better Performance


### Component LifeCycle
- 3 Phases 
1. Mounting - when the component is first rendered and inserted into DOM
2. Updating - component rerenders due to states or props chnge
3. Unmounting - component is removed from DOM


### How does react update the UI efficiently?
- Virtual DOM - react creates an in memory copy of original DOM
- Diffing Algorithm - React compares the new virtual DOM with previous one to find chnges
- Batching Updates - React groups multiple state updates and applies them together, reducing unnecessary renders
- Reconcillation - React applies only necessary chnges to real DOM

# JSX (Javascript XML)
- Javascript Syntax extension used in React
- Allow writing html like code inside JS
- Not a new lang, it's a syntatic sugar
- JSX expression must have a single root element (div / react fragment ..)

# Components - Functional vs Class
## Functional Components
- Defined as Functions
- Accepts `Props` and return `jsx`
- Hooks can be used to manage state or life cycle (using hooks, they can use all the capabilities of class components)

## Class Components
- Defined using ES6 `class` syntax
- Extends `React.Component`
- Use `this.state` and lifecycle methods
- They can manage their own state and lifecycle using its methods
- But they are more verbose and complex , and with Hooks, their use has been largely phased out

# State
- A javascript object that holds data specific to a component.
- When state of a component chnges, react re-renders the component and its children
- Mutable and used for data that can chnge, like user input, API response
- In functional components, states are manages using `useState` hook
```js
const [count, setCount] = useState (0);
//functional


this.state = {count : 0};
//class
```


# Props
- Short for `Properties`
- Uses to pass data from parent component to child component
- **Read only and immutable** in child components
- Ensure **unidirectional** data flow, which makes application easy to debug and understand

# Hooks
- Functions that let you use states and lifecycle features in functional components
- Introduced in react 16.8 - to allow functional components to have same capability as class components


# Conditional Rendering
- Rendering UI based on conditions
- Uses javascript expressions like if, ternary operator(cond ? exp1 : exp2) or logical operators (&&)
```
{isLoggedIn ? <Dashboard /> : <Login />}
```

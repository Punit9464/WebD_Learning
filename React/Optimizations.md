# Code Splitting And Lazy Loading
When we build a React App, everything we write that builds up into a bundle.js -> A large javascript file, that loads on the client side to display the components -> Slow initial load.

Goal: Load only when it's needed now, and fetch other parts later when needed. That's Code Splitting + Lazy Loading.

### Code Splitting
Means: Split app's code into multiple small chunks instead of one big bundle

Instead of:
```
bundle.js = All Components + All routes + All Libraries
```

We Get:
```
home.chunk.js
dashboard.chunk.js
profile.chunk.js
vendor.chunk.js
```

**React (With Vite or Webpack)** loads each chunk only when needed.


### Lazy Loading
Loads chunks only when they are being actually used.

Instead of importing from upfront:
```jsx
import HeavyComponent from './HeavyComponent.jsx'
```

You use:
```jsx
const HeavyComponent = React.lazy(() => import("./HeavyComponent.jsx"));
```


#### Suspense Component
- When React loads a lazy Component, it takes few milliseconds to fetch the JS file.
- During that time, we can't show the blank screen. so we use Suspense to show the fallback UI.
```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

<Suspense fallback={<Loader />}>
    <LazyComponent />
</Suspense>
```

- Shows fallback while loading

This is like showing a “Loading…” spinner while React is downloading that part of your app.

#### Route-Level Code Splitting
- Perfect for large apps with multiple pages.
- Loads entire routes/pages only when the user navigates to them 
```jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import {Suspense} from 'react'

const Home = React.lazy(() => import('./Home'));
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

- So when we are at '/', only home component loads in our browser and not dashboard component

#### Component - level lazy loading with conditions
So sometimes you want to load a component only when user interacts
```jsx
function App() {
  const [showChart, setShowChart] = React.useState(false);
  const Chart = React.lazy(() => import('./Chart'));

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}
```


- Chart JS is not downloaded until showChart becomes true.
- Suspense shows a loading UI while fetching the chunk.


#### Lazy Loading Images/Assets
It's just not React / JS Part, we can load images lazy using native html.
Example:
```html
<img src={imgUrl} loading="lazy" alt="..." />
```
- Browser only loads the image when it’s near the viewport.
- Reduces page load and memory usage.
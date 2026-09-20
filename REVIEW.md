# Code Review

## Findings Summary

| ID | Category | Issue | Severity |
|---|---|---|---|
| BUG-001 | Bug | Task update swallows pre-existing global fetch errors | Medium |
| BUG-002 | Bug | Activity fetch failures are silently swallowed | Medium |
| PERF-001 | Performance | `setInterval` causes continuous unnecessary re-renders | High |
| PERF-002 | Performance | Redundant filtering algorithm executes twice | Low |
| REACT-001 | React Best Practices | `forcedList` intentionally defeats referential equality | High |
| REACT-002 | Next.js Conventions | Synchronous access of `params` in route handler | Medium |
| MAINT-001 | Maintainability | Duplicated logic blocks for time formatting and filtering | Medium |
| MAINT-002 | Maintainability | Monolithic Activity Feed component lacks boundaries | Medium |
| UX-001 | UX | Redundant timestamp rendered on each activity item | Low |

---

# 1. Bugs

## BUG-001 — Task update swallows pre-existing global fetch errors

### What is wrong?
In `hooks/useTasks.ts`, the `updateTaskStatus` function unconditionally calls `setError("")` at the beginning of its execution. If the initial `fetchTasks` call failed and correctly set an error state, attempting to click a task's toggle button will instantly erase the global error message indicating the initial failure.

```ts
// frontend/hooks/useTasks.ts
const updateTaskStatus = useCallback(async (taskId: string, completed: boolean) => {
  try {
    setUpdatingTaskId(taskId);
    setError(""); // <-- This unconditionally clears any global error
    
    // ...
```

### Why it matters
If a user is viewing a stale dashboard (perhaps due to a network drop when loading), the global error banner informs them of the issue. Clicking a checkbox will silently swallow that error message, replacing it with a successful (or failed) mutation state, breaking the user's mental model of the application's true state.

### Recommended improvement
Separate query errors from mutation errors by using two distinct state variables (e.g., `fetchError` and `updateError`), or only clear the error if it was strictly caused by a previous failure of the same mutation.

## BUG-002 — Activity fetch failures are silently swallowed

### What is wrong?
In `app/activity/page.tsx`, the `useEffect` that fetches `/api/activity` catches errors but simply sets the activity arrays to empty arrays `[]` without tracking the error state.

```ts
// frontend/app/activity/page.tsx
useEffect(() => {
  fetch("/api/activity")
    // ...
    .catch(() => {
      setAllActivity([]);
      setShownActivity([]);
      setForcedList([]);
    });
}, []);
```

### Why it matters
Users have no indication whether they have zero recent activities or if the application is completely failing to communicate with the backend. Silent failures severely degrade UX and make bug reporting difficult.

### Recommended improvement
Introduce an `error` state variable (`const [error, setError] = useState<string>("")`). Update it in the `.catch()` block and render an error banner to the user if it contains a message.

---

# 2. Performance

## PERF-001 — `setInterval` causes continuous unnecessary re-renders

### What is wrong?
In `app/activity/page.tsx`, a `setInterval` hook executes every 1400ms, doing nothing but incrementing a `tick` state variable. 

```ts
// frontend/app/activity/page.tsx
useEffect(() => {
  const id = setInterval(() => {
    setTick((value) => value + 1);
  }, 1400);

  return () => clearInterval(id);
}, []);
```

### Why it matters
Because `tick` is listed in the dependency arrays of subsequent `useEffect` hooks, this forces the entire monolithic `ActivityPage` to recalculate its state and re-render the DOM every 1.4 seconds. Since there is no actual network polling occurring, this burns CPU cycles and drains device batteries for absolutely no functional benefit.

### Recommended improvement
Remove the `setInterval` and the `tick` state entirely. If live data is required, implement a proper polling mechanism that re-fetches data or use WebSockets.

## PERF-002 — Redundant filtering algorithm executes twice

### What is wrong?
In `app/activity/page.tsx`, the component applies `applyFilterA` to the dataset, and then immediately applies `applyFilterB` to the output of the first filter.

```ts
// frontend/app/activity/page.tsx
useEffect(() => {
  const a = applyFilterA(allActivity, query);
  const b = applyFilterB(a, query); // b is applied on top of a
  setShownActivity(b);
}, [query, allActivity, tick]);
```

### Why it matters
Both functions perform functionally identical logical checks (`.includes()` vs `.indexOf() !== -1`). Running a second filter over an array that has already been filtered by the exact same logical constraints is a waste of computation. 

### Recommended improvement
Remove `applyFilterB` completely. Use only one filtering pass to derive the filtered list.

---

# 3. React Best Practices & Next.js Conventions

## REACT-001 — `forcedList` intentionally defeats referential equality

### What is wrong?
In `app/activity/page.tsx`, a `useEffect` watches `shownActivity` and `tick`, and intentionally creates shallow clones of the array on every tick, either via spread syntax or mapping.

```ts
// frontend/app/activity/page.tsx
useEffect(() => {
  if (tick % 2 === 0) {
    setForcedList([...shownActivity]);
  } else {
    setForcedList(shownActivity.map((item) => ({ ...item })));
  }
}, [shownActivity, tick]);
```

### Why it matters
This is a severe anti-pattern in React. Creating shallow copies of an array when the underlying data has not changed deliberately circumvents React's referential equality checks (`Object.is`), forcing the DOM to reconcile list items unnecessarily.

### Recommended improvement
Remove `forcedList`. Pass `shownActivity` directly to the rendering logic. 

## REACT-002 — Synchronous access of `params` in route handler

### What is wrong?
In `app/api/tasks/[id]/route.ts`, the Next.js route handler accesses `params.id` synchronously.

```ts
// frontend/app/api/tasks/[id]/route.ts
export async function PATCH(request: Request, { params }: RouteParams) {
  // ...
  const task = await updateTaskInBackend(params.id, payload.completed);
```

### Why it matters
Starting in Next.js 14+ (App Router), `params` is a Promise. While synchronous access might work locally without crashing in some minor versions due to backward compatibility shims, it emits warnings and is officially an invalid pattern that will break in future updates.

### Recommended improvement
Update the type to `params: Promise<{ id: string }>` and `await` it before accessing properties:
`const { id } = await params;`

---

# 4. Maintainability & UX

## MAINT-001 — Duplicated logic blocks for time formatting and filtering

### What is wrong?
`app/activity/page.tsx` defines two sets of functionally identical functions: `formatTimeA`/`formatTimeB` and `applyFilterA`/`applyFilterB`. 

### Why it matters
Dead and duplicate code increases the cognitive load for engineers, inflates bundle sizes slightly, and creates a risk that a future developer updates one function but forgets to update its twin, introducing subtle logic drift.

### Recommended improvement
Delete the `B` variants. Keep a single `formatTime` and a single `applyFilter` function.

## MAINT-002 — Monolithic Activity Feed component lacks boundaries

### What is wrong?
The entire `app/activity/page.tsx` file handles API fetching, state management, search logic, polling, layout, and item rendering in one 134-line component.

### Why it matters
Lack of component decomposition violates the Single Responsibility Principle. It makes unit testing individual pieces (like a single activity item's layout) impossible without mocking network requests. 

### Recommended improvement
Extract data fetching and filtering into a custom hook (e.g., `useActivity`). Extract the list and list item UI into `<ActivityList>` and `<ActivityItem>` components, mirroring the much cleaner architecture used in the Tasks module.

## UX-001 — Redundant timestamp rendered on each activity item

### What is wrong?
In `app/activity/page.tsx`, the list rendering maps over items and calls both `formatTimeA` and `formatTimeB`, printing the exact same string twice on two separate lines.

```tsx
// frontend/app/activity/page.tsx
<small style={{ color: "var(--muted)" }}>{formatTimeA(item.when)}</small>
<br />
<small style={{ color: "var(--muted)" }}>{formatTimeB(item.when)}</small>
```

### Why it matters
This clutters the UI and confuses users who may wonder why the exact same timestamp is printed twice.

### Recommended improvement
Remove the `<br />` and the second timestamp call. Render the timestamp only once.

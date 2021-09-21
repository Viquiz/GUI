## useAsync Hook
```tsx
const {
	loading as boolean, // false if finished loading
	value as any,
	error as any,		
	trigger as function() // trigger the call back function again
	} = useAsync(callback as async function,dependencies as [])

```
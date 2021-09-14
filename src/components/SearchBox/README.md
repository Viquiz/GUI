### ToggleButton Props
```tsx
interface SearchBoxProps
{
	placeholder?:string //placeholder string for input
	callback?:(value:string) => void // when text change call this function
	icon?:IconType // if not exist it is magnify glass icon
}
```
# Example
```tsx
<SearchBox callback={(value:string)=>{
			console.log(value)
		}} icon={FaReact} placeholder="Search" className="w-36"/>
```
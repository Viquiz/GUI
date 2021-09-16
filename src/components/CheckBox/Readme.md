```tsx
interface PROPS{
	labelLeft:boolean // Label on left
	label:string // what to display
	onChange: (checked:boolean)=> void // checkbox call this function when state change
}
```
```tsx
<CheckBox onChange={e =>console.log(e)} label="123" labelLeft/>
```
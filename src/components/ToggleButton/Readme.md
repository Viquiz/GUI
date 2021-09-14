### ToggleButton Props
```tsx
interface ToggleBtnPROPS
{
	label:string //show this label when value if true
	label_off?:string //show this label when value is false
	//if not exist show the default label
	disabled?:boolean // just as it said
	onToggle?: (value:boolean) => any //event handling function when value change
}
```
# Example: toggle button say hello when true and goodbye when false
> also logging the button value to console
```tsx
<ToggleButton onToggle={(value:boolean)=>{ console.log(value)}} 
		label={'Hello'}
		label_off={'Good bye'}
		/>
```
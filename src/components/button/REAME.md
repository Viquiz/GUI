```tsx
interface Button_PROPS {
	disabled?:boolean // whether the button is disable
	text?:string //what to display in button
	onClick:React.MouseEventHandler // Function to handle on click
}
```

This Example to create a button:
>Disabled button</br>
>label: Click me</br>
>print to console Event object when clicked
```tsx 
function consoleLog(ev)
{
	console.log(ev)
}
<Button disabled className="bg-button-primary" text="Click me" onClick={consoleLog}/>
```
```tsx
<<<<<<< HEAD:src/components/button/REAME.md
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
=======
<Button disabled className="bg-button-primary" text="Click me" onClick={(ev)=> {
			alert("clicked")
		} }/>
```
>>>>>>> 5af07ce57158e8e8e8dbcd69482b62989227b762:src/components/button/README.md

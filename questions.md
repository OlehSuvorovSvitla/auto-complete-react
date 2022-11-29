### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

> PureComponent implements `shouldComponentUpdate()` and performs comparison of state and props values.
> 
> Example of problem: If you pass props values into PureComponent it may not be re-rendered
> 
> Example of problem: If you put non-pure component as a child of PureComponent the child will not be re-rendered even on state changes

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

> Since `Context`'s purpose is to update linked components by state's change, it could be accidentally ignored with `ShouldComponentUpdate`
> 
> Also `ShouldComponentUpdate` is deprecated now and marked as `UNSAFE_`

### 3. Describe 3 ways to pass information from a component to its PARENT.

> Render Props methodology (Parent rendering is tuned up in a Child)
> 
> Parent passes callback/setter function to the Child as prop. Child uses this function to send/change data for Parent
>  
> Using a shared/upper context or a global state

### 4. Give 2 ways to prevent components from re-rendering.

> `shouldComponentUpdate()` returns false (actually PureComponent works this way)
> 
> Use `PureComponent` instead of `Component` (if values changed on top-level)

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

> It is JSX syntax `<>...</>` or `<React.Fragment>...</React.Fragment>`
> 
> Fragments don't render wrapping `div` or other tag. It may break styling, but useful for inline rendering and FlexBox elements.

### 6. Give 3 examples of the HOC pattern.

> - connect
> - withRouter
> - withTranslation

### 7. What's the difference in handling exceptions in promises, callbacks and async...await.

> - Promise "eats" exceptions by providing own `.catch()`
> - Callback usually required `try..except` block
> - `async...await` is a sugar syntax around Promises which allows to make `try catch finally`

### 8. How many arguments does setState take and why is it async.

> `setState()` accept 2 parameters:
> - object - to merge with current State
> - callback - called after State has been mutated
>
> It is "async" because changes/mutations of the component State are delayed. It allows to update several changes at once.

### 9. List the steps needed to migrate a Class to Function Component.
> - Create `[var, setVar] = useState(prop.value || defaultValue)` for every field in the state
> - Replace life-cycle methods with `useEffects()`, `useCallback()`
> - If `defaultProps` are used, put them into props destruction `const { prop1 = defaultProp1, prop1 = defaultProp2 } = props`
> - Add `const` for every event handler
> - Test new component hardly, especially for corner cases.
> - Remove `render` method and use `return` in the end

### 10. List a few ways styles can be used with components.

> - inline styling `<Component style={{backgroundColor: #ccc}}/>`
> - include .css file directly into component file and use `<Component className='classFromCss'/>`
> - CSS Modules `import styles from './styles.css';` then `<Component className='styles.component'/>`
> - Styled Components
> - `useStyles()` hooks and `withStyle()` HOCs (Material UI, and similar)

### 11. How to render an HTML string coming from the server.

> We can use `dangerouslySetInnerHTML` attribute

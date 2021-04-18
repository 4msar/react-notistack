# React Snackbar

A minimal beautiful standalone Toast/Snackbar for your react web application.

Table of Contents
--
- [How to use](#how-to-use)
- [Online demo](#online-demo)
- [Credits](#credits)


## Getting Started
Use your preferred package manager:
```
npm install react-notistack
yarn add react-notistack
```

### How to use

**1:** Wrap your app inside a `SnackbarProvider` component: (see [docs](#api) for a full list of available props)
<br />
**Note:** If you're using material-ui `ThemeProvider`, make sure `SnackbarProvider` is a child of it.
```jsx
import { SnackbarProvider } from 'react-notistack';

<SnackbarProvider maxSnack={3}>
    <App />
</SnackbarProvider>

```


**2:** Export any component that needs to send notification using `withSnackbar`. By doing this, you'll have access to methods `enqueueSnackbar` and `closeSnackbar`, where the former can be used to send snackbars.

```javascript
import { withSnackbar } from 'react-notistack';

class MyComponent extends Component {
  handleNetworkRequest = () => {
     fetchSomeData()
        .then(() => this.props.enqueueSnackbar('Successfully fetched the data.'))
        .catch(() => this.props.enqueueSnackbar('Failed fetching data.'));
  };

  render(){
     //...
  };

};

export default withSnackbar(MyComponent);
```

**2 (alternative):** You can use `useSnackbar` hook in your functional components as well.

```javascript
import { useSnackbar } from 'react-notistack';

const MyButton = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love hooks');
    };

    return (
        <Button onClick={handleClick}>Show snackbar</Button>
    );
}
```

### Online demo
Demo [here](http://msar.me/react-notistack/example/dist/) 

[codesandbox](https://codesandbox.io/s/github/4msar/react-notistack/tree/main/example/src?hidenavigation=1&module=Example.js)

### API
Will be added soon.

### To Do
- Further improvement

### Credits
This snackbar idea is comes from [Notistack](https://iamhosseindhv.com/notistack) by Hossein Dehnokhalaji which is depend on material-ui.  
And the design of snackbar/toastr catched from bootstrap.


### Contribution
Open an issue and your problem will be solved.


### Author - Contact
Saiful Alam - [https://msar.me](https://msar.me)

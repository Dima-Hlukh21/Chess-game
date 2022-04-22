import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Connect from './Socket'

const useStyles = makeStyles((theme) => ({
    login__text:{
        color: '#FFB138',
        paddingTop: '35px',
        
    },
    button__login: {
    width: '400px',
    backgroundColor: '#FFF',
    padding: '10px 172pX',
    marginTop: '25px',
    border: 'none',
    color: '#000',
    justifyContent: 'center',
    display: 'block',
    },
    container: {
        marginLeft: '740px',
        marginTop: '280px',
        width: '100%',
        height:'100%',
    },
    
    '@global':{
        html: {
            overflow: 'scroll',
            overflowY: 'hidden',
            overflowX:'hidden',
            
             },
    body :{
        width: '100vh',
        height: '100vh',
        background: 'radial-gradient( ellipse at left bottom,rgba(49,44,133,1) 0%, rgba(59,5,88,1) 56%, rgba(0,0,0,1) 80%)',
    },
},
    dataIn:{
        width: '400px',
        padding: '15px ',
        backgroundColor: '#FFF',
        marginTop: '5px',
        border: '0px',
        color: '#000',
        display: 'block',
        boxSizing: 'border-box',
        marginBottom: '10px'
    },
    dataColor:{
        width: '400px',
        backgroundColor: '#FFF',
        display: 'block',
        boxSizing: 'border-box',
        marginTop: '25px',
        height:'45px',
        
        
    }
   
        
}));

export default function FirstPage () {
    const classes = useStyles();
    const { register, handleSubmit, } = useForm();
    const onSubmit = data =>
     console.log(data);
     
  
    
   
  return (
    <div className={classes.container}>
        <div className={classes.login__container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <h2 className={classes.login__text}>Username</h2>
            <input {...register('userName')} className={classes.dataIn} name="userName" type="userName" placeholder="User Name" />
            <FormControl>
            <InputLabel  id="Color">Color</InputLabel>
            <Select color="black" variant="outlined"  labelId="color"  {...register('color')}  className={classes.dataColor}>
                
            <MenuItem value="White">White</MenuItem>
            <MenuItem value="Black">Black</MenuItem>
            </Select>
            </FormControl>
            <button type="submit" className={classes.button__login}>Play</button >
        </form>
        
  
        </div>
        <Connect></Connect>
    </div>
  );
};


import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";



const useStyles = makeStyles((theme) => ({
    login__text:{
        color: '#FFB138',
        paddingTop: '35px',
        
    },
    button__login: {
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
        padding: '15px 30PX',
        backgroundColor: '#FFF',
        marginTop: '5px',
        border: '0px',
        color: '#000',
    }
   
        
}));

export default function Login () {
    const classes = useStyles();
    const { register, handleSubmit, } = useForm();
    const onSubmit = data =>
     console.log(data);
     
  const xhr = new XMLHttpRequest();
  xhr.open('POST', "http://localhost:10000/user/login/");
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  

  xhr.send(onSubmit);
    
   
  return (
    <div className={classes.container}>
        <div className={classes.login__container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes.login__text}>Username</h2>
            <input {...register('email')} className={classes.dataIn} name="email" type="email" placeholder="Email" />
    
    
            <h2 className={classes.login__text}>Password </h2> 
            <input {...register('password')} className={classes.dataIn} name="password" type="password" placeholder="Password" />
            <button type="submit" className={classes.button__login}>Sign up</button >
        </form>
        
  
        </div>
    </div>
  );
};


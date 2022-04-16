import React from 'react'
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    login__text:{
        color: '#FFB138',
        paddingTop: '35px',
        
    },
    button__login: {
    backgroundColor: '#FFF',
    color: '#fff',
    padding: '10px 172pX',
    marginTop: '25px',
    border: 'none',
    color: '#000',
    justifyContent: 'center'
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
        color:'aliceblue',
        marginTop: '5px',
        border: '0px',
        color: '#000',
    }
   
        
}));

export default function Login () {
    const classes = useStyles();
  return (
    <div className={classes.container}>
    <div className={classes.login__container}>
    <form>
         <h2 className={classes.login__text}>Username</h2>
         <input className={classes.dataIn} name="email" type="email" placeholder="Email" />
    
    
         <h2 className={classes.login__text}>Password </h2> 
         <input className={classes.dataIn} name="password" type="password" placeholder="Password" />
  
   </form>
   <button type="submit" className={classes.button__login}>Sign up</button >
    </div>
    </div>
  );
};
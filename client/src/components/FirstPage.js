import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {SocketContext} from './Socket'
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { GameContext } from './GameContext';


const useStyles = makeStyles((theme) => ({
    login__text:{
        color: '#E19D00',
        paddingTop: '100px',
        fontFamily: 'Courier New',
    },
    button__login: {
    width: '400px',
    background: 'url(https://media.istockphoto.com/photos/gold-background-golden-polished-metal-with-steel-texture-picture-id1293988705?b=1&k=20&m=1293988705&s=170667a&w=0&h=-GZd0JoIIXFKz9DhsQCLML_F3HYbocrK7UIS4U1LKE8=)',
    padding: '10px 172pX',
    marginTop: '25px',
    border: 'none',
    color: '#000',
    justifyContent: 'center',
    display: 'block',
    cursor: 'pointer',
    fontFamily: 'Courier New',
    fontWeight: '900',
    },
    container: {
        width: '100%',
        height:'100%',
    },
    login__container:{
        marginLeft: '740px',
        justifyContent: 'center',
        marginTop: '200px',
        width: '400px',
        height: '400px',
    },
  
    Hufflepuff:{
        width: '200px',
        height: '200px',
        position: 'absolute',
        right: '0px',
        bottom: '0px',
    },
    border: {
        position: 'absolute',
        top: '250px',
        left: '700px',
        width: '500px',
        height: '350px',
        zIndex: '-1',
    },
 
    '@global':{
        html: {
            overflow: 'scroll',
            
            overflowX:'hidden',
            
             },
    body :{
        width: '100vh',
        height: '100vh',
        background: 'url(https://cdn.wallpapersafari.com/79/26/u6sDao.jpg) no-repeat center top fixed',
        webkitBackgroundSize: 'cover',
        mozBackgroundSize: 'cover',
        oBackgroundSize: 'cover',
        backgroundSize: 'cover',
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
        marginBottom: '10px',
        fontFamily: 'Courier New',
    },
    dataColor:{
        width: '400px',
        backgroundColor: '#FFF',
        display: 'block',
        boxSizing: 'border-box',
        marginTop: '25px',
        height:'45px',
        fontFamily: 'Courier New',
    }
   
        
}));

export default function FirstPage () {
    let navigate = useNavigate();
    const socket = useContext(SocketContext);
    const { updateGameboard } = React.useContext(GameContext);
    const classes = useStyles();
    const { register, handleSubmit, } = useForm();
    const [message, setMessage] = useState(false);

    const onSubmit =  useCallback((data) => {
        console.log(data)
        socket.emit('start', {
            user: data.userName,
            white: data.white
        })
       function test() {
           setMessage(true)
        }
       test();
    }, []);     
        
    useEffect(() => { 
        console.log('game start')
        socket.on ('ready', (data) => {
            updateGameboard(data.gameBoard)
            if(message === true)  {
                navigate("/game");
            }            
            console.log('test')
        })
    }, [message]);
        
  return (
    <div className={classes.container}>   

        <div className={classes.login__container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <h2 className={classes.login__text}>Username</h2>
            <input {...register('userName')} className={classes.dataIn} name="userName" type="userName" placeholder="User Name" />
            <FormControl>
                <InputLabel  id="Color">Color</InputLabel>
                <Select color="black" variant="outlined"  labelId="color"  {...register('white')}  className={classes.dataColor}>
                
                <MenuItem value="true">White</MenuItem>
                <MenuItem value="false">Black</MenuItem>
                </Select>
            </FormControl>
            <button type="submit" className={classes.button__login}>Play</button >
        </form>
        <img className={classes.Hufflepuff} src = 'https://www.nicepng.com/png/full/43-439104_hufflepuff-crest-harry-potter-banner-harry-potter-hufflepuff.png'></img>
        <img className={classes.border} src = 'https://www.freeiconspng.com/uploads/photo-frame-border-png-4.png'></img>
        
  
        </div>
       
    </div>
  );
};


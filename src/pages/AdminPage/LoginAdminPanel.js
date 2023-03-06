import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import validator from 'validator';

function LoginAdminPanel(){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Логин не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate()

    const blurHandler = (e) => {
      switch(e.currentTarget.name) {
        case 'login':
          setEmailDirty(true)
        break;
        case 'password':
          setPasswordDirty(true)
        break;
        default:
      }
    }

    function loginUser(e) {
      setLogin(e.currentTarget.value)
      if(!validator.isEmail(e.currentTarget.value)) {
        setEmailError('Некоректный логин')
      } else {
        setEmailError('')
      }
    }

    function passwordUser(e) {
      setPassword(e.currentTarget.value)
      if(e.target.value.length < 6) {
        setPasswordError('Некоректный пароль')
        if(!e.target.value){
          setPasswordError('Пароль не может быть пустым')
        }
      } else {
        setPasswordError('')
      }
    }

    useEffect(() => {
      if(emailError || passwordError) {
        setFormValid(false)
      } else {
        setFormValid(true)
      }
    },[emailError, passwordError])

    return ( <div className='bg-img' style={{display: 'flex', justifyContent: 'center',height: '100vh', alignItems: 'center'}}>
       
        <Card style={{ width: '18rem' }}>

          <Card.Body>
            <Card.Title style={{textAlign: 'center', padding:'10px'}}>Вход в Admin Home :)</Card.Title>
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div> }
            <Form.Control onBlur={e => blurHandler(e)} name='login1' value={login} onChange={loginUser} placeholder='Login' className="mb-3 logW" type="email"/>
            {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
            <Form.Control onBlur={e => blurHandler(e)} name='password' value={password} onChange={passwordUser} placeholder='Password' className="mb-3 logW" type="password"/>
            <Button disabled={!formValid} variant="primary" >Next</Button>
          </Card.Body>
        </Card>
        </div>
      );
}

export default LoginAdminPanel
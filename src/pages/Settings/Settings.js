import { Form } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { reducerTypes } from "../../store/Users/types";
import { axiosChangeNickname, axiosChangePassword } from "../../api/user";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import validator from 'validator';


function Settings() {

    const dispatch = useDispatch();
    const { user } = useAppSelector((store) => store.user)
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErorr, setPasswordErorr] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [passwordV2, setPasswordV2] = useState("");
    const [errorLogin, setErrorLogin] = useState('');
    const [formValidPassword, setFormValidPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState("");
    const [NewPasswordError, setNewPasswordError] = useState("");
    const [errorLoginLength, setEerrorLoginLength] = useState('');

    function changeNickname(e) {
        setNickname(e.currentTarget.value)
    }

    function cheakLengthLogin(e) {
        if (e.currentTarget.value.length < 5) {
            setEerrorLoginLength('Минимум 5 символов')
        } else {
            setEerrorLoginLength('')
        }
    }

    function getPassword(e) {
        setPassword(e.currentTarget.value)
        if (user.password !== e.currentTarget.value) {
            setPasswordErorr('Проверьте введенные данные')
            if (!e.currentTarget.value) {
                setPasswordErorr('Пароль не может быть пустым')
            }
        } else {
            setPasswordErorr('')
        }
    }

    function getPasswordV2(e) {
        setPasswordV2(e.currentTarget.value)
        if (user.password !== e.currentTarget.value) {
            setPasswordError('Проверьте введенные данные')
            if (!e.currentTarget.value) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    function getNewPasswordOnChange(e) {
        setNewPassword(e.currentTarget.value)
        if (!validator.isStrongPassword(e.currentTarget.value, { minSymbols: 0, minUppercase: 0 })) {
            setNewPasswordError('Минимальная длина 8 и минимум 1 цифра')
            if (!e.currentTarget.value) {
                setNewPasswordError('Пароль не может быть пустым')
            }
        } else {
            setNewPasswordError('')
        }

    }

    async function getNicknames(e) {
        e.preventDefault()
        const result = await axiosChangeNickname(nickname, user.id, user.password)
        console.log('result', typeof result, typeof result === 'string')
        if (typeof result === 'string') {
            if (result === 'Пользователь с таким именем уже существует') {
                setErrorLogin(result)
            } else {
                return;
            }
        }
        dispatch({
            type: reducerTypes.GET_USER,
            payload: result
        });
    }

    async function getNewPassword(e) {
        e.preventDefault()
        dispatch({
            type: reducerTypes.GET_USER,
            payload: await axiosChangePassword(newPassword, user.id, user.password)
        });
    }

    useEffect(() => {
        if (user.password === password) {
            if (nickname !== '' || errorLoginLength) {
                setFormValid(true)
            }
        } else {
            setFormValid(false)
        }
    }, [nickname, password, user.password, errorLoginLength])

    useEffect(() => {
        if (user.password === passwordV2) {
            if (newPassword !== '') {
                if (NewPasswordError === '') {
                    setFormValidPassword(true)
                }
            }
        } else {
            setFormValidPassword(false)
        }
    }, [newPassword, passwordV2, user.password, NewPasswordError])

    return <div className="bg-img" style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <div style={{ paddingBottom: "117px", minHeight: '70vh' }} className="container">
            <h3 className="header-inner_title login-inner_title">Настройки</h3>
            <hr className="hr-viss" />
            <div className="flex-adapt" style={{ display: 'flex' }}>
                <Form className="width-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="color-input-name">Сменить ваше имя:</Form.Label>
                        <Form.Control value={nickname} onChange={(e) => { changeNickname(e); cheakLengthLogin(e) }} name='login' type="email" placeholder="" />
                        {errorLogin ? <div style={{ color: 'red' }}>{errorLogin}</div> : ''}
                        {errorLoginLength ? <div style={{ color: 'red' }}>{errorLoginLength}</div> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="color-input-name">Введите ваш пароль:</Form.Label>
                        <Form.Control value={password} onChange={getPassword} name='password' type="password" placeholder="" />
                        {passwordErorr ? <div style={{ color: 'red' }}>{passwordErorr}</div> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <button disabled={!formValid} onClick={(e) => getNicknames(e)} className="btn-class-v2">Сменить ник</button>
                </Form>
                <Form className="width-form">
                    <Form.Group className="mb-3" controlId="formBasicEmailV2">
                        <Form.Label className="color-input-name">Новый пароль:</Form.Label>
                        <Form.Control value={newPassword} onChange={getNewPasswordOnChange} name='login' type="password" placeholder="" />
                        {NewPasswordError ? <div style={{ color: 'red' }}>{NewPasswordError}</div> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordV2">
                        <Form.Label className="color-input-name">Введите ваш пароль:</Form.Label>
                        <Form.Control value={passwordV2} onChange={getPasswordV2} name='password' type="password" placeholder="" />
                        {passwordError ? <div style={{ color: 'red' }}>{passwordError}</div> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <button style={{ width: '135px' }} disabled={!formValidPassword} onClick={(e) => getNewPassword(e)} className="btn-class-v2">Сменить пароль</button>
                </Form>
            </div>
        </div>
    </div>
}

export default Settings
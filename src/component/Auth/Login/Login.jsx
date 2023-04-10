
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";
import "../Login.css";
import { ReactComponent as Openeye} from "../img/eyeopen.svg";
import { ReactComponent as Closedeye} from "../img/eyeclos.svg"

export const Login =({setShowModal})=>{
    const {register, handleSubmit, formState: {errors}} = useForm({mode:"onSubmit" });
    const navigate= useNavigate();
    const [type, setType]= useState(false)

    const handleClick = (e)=>{
        e.preventDefault();
        navigate('/registr');
    }

  const sendData= async (data)=>{
    try{
        const res= await authApi.login(data);
        localStorage.setItem('token', res.token);
        navigate('/');
    } catch (error) {
        alert('Неправильные логин и пароль')
    }
  } 

const emailRegistr = register('email',{
    required:'Email обязателен',  
})

const passwordRegistr = register('password',{
    required:'Пароль обязателен',  
    pattern,
})

useEffect(()=>{
    setShowModal(true)
},[setShowModal])

return (
<>
<Form  submitForm={handleSubmit(sendData)} title={'Вход'}>
    <div className="auth_controls">
<input type='text'
       {...emailRegistr}
    placeholder="Email"
    className="auth_input"
    />
     {errors?.email && (
        <span className="auth_warning">{errors.email?.message}</span>)}

    <div className="form_eye-wrapper">
    <input type={type ? 'text' :'password'}
       {...passwordRegistr}
    placeholder="Password"
    className="auth_input"
    />
    <span className="form_eye" onClick={()=>setType(!type)}>{type ? <Closedeye/> : <Openeye/>}</span>
    </div>
    
     {errors?.password && (
        <span className="auth_warning">{errors.password?.message}</span>)}
    <span className="auth__info auth_link" onClick={()=>navigate('/reset-password')}>Восстановить пароль</span>
    <div className="auth__actions">
    <BaseButton type="submit" color={'yellow'}>
    <span>Войти</span>
    </BaseButton>
    <BaseButton onClick={handleClick} color={'white'}>
    <span>Регистрация</span>
    </BaseButton>
    </div>
    </div>
</Form>
</>
)
}
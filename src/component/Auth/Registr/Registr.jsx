import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton"
import { Form } from "../../Form/Form"
import { ReactComponent as Openeye} from "../img/eyeopen.svg";
import { ReactComponent as Closedeye} from "../img/eyeclos.svg";
import "../Login.css";

export const Registr=({setShowModal})=>{
    const {register, handleSubmit, formState: {errors}} = useForm({mode:"onSubmit" });
    const navigate = useNavigate()
    const [type, setType]= useState(false)

    const handleClick =(e)=>{
   e.preventDefault();
   navigate('/login')
   } 

   const sendData = async (data)=>{
   try{
    await authApi.registerUser({...data, group:'group-10'});
    navigate('/login');
} catch (error) {
    alert(error);
}

   }

   const emailRegistr = register('email',{
    required:'Email обязателен',  
})

const passwordRegistr = register('password',{
    required:'Пароль обязателен',  
    pattern: pattern,
})

useEffect(()=>{
    setShowModal(true)
},[setShowModal])

    return (
        <>
<Form  submitForm={handleSubmit(sendData)} title={'Регистрация'}>
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
    <span className="form_eye-reg" onClick={()=>setType(!type)}>{type ? <Closedeye/> : <Openeye/>}</span>
    </div>

     {errors?.password && (
        <span className="auth_warning" >{errors.password?.message}</span>)}
    <span className="auth__info">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
                        Политикой конфиденциальности и соглашаетесь на информационную
                        рассылку.</span>
    <div className="auth__actions">
    <BaseButton type="submit"  color={'yellow'}>
    <span>Зарегистрироваться</span>
    </BaseButton>
    <BaseButton onClick={handleClick} color={'white'}>
    <span>Войти</span>
    </BaseButton>
    </div>
    </div>
</Form>
</>
    )
}
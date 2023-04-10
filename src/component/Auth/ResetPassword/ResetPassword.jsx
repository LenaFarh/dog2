import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton"
import { Form } from "../../Form/Form"
import "../Login.css";
import { ReactComponent as Openeye} from "../img/eyeopen.svg";
import { ReactComponent as Closedeye} from "../img/eyeclos.svg"


export const ResetPass =({setShowModal})=> {
    const [tokenResp, setTokenResp] = useState(null)
    const {register, handleSubmit, formState: {errors}} = useForm({mode:"onSubmit" });
    const [type, setType]= useState(false)
    const emailRegistr = register('email',{
        required:'Email обязателен',  
    });

    const sendData= async (data) => {
    if (!tokenResp) {
        try {
            const res=  await authApi.resetPass(data);
            console.log({res})
            setTokenResp(true);
          } catch (error) {
              console.log({error});
              alert('Что-то пошло не так')
          }
    } else {
        try {
          const res=  await authApi.changePass(data.token, {password: data.password});
          localStorage.setItem('token', res.token)
        navigate('/')
      } catch (error) {
        console.log({error});
        alert('Что-то пошло не так')
      }
    }

        
    }

    const passwordRegistr = register('password',{
        required: tokenResp ?'Пароль обязателен': false,  
        pattern:pattern,
    })

    useEffect(()=>{
        setShowModal(true);
    },[setShowModal])

    const navigate= useNavigate();

    return(
<>
<Form submitForm={handleSubmit(sendData)} title={'Восстановление пароля'}>
    <div className="auth_controls">
    <span className="auth__info">Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
    <input type='text'
       {...emailRegistr}
    placeholder="Email"
    className="auth_input"
    />
     {errors?.email && (
        <span className="auth_warning">{errors.email?.message}</span>)}
{tokenResp && <>

    <div className="form_eye-wrapper">
    <input type={type ? 'text' :'password'}
       {...passwordRegistr}
    placeholder="Password"
    className="auth_input"
    disabled= {!tokenResp}
    />
<span className="form_eye-reg" onClick={()=>setType(!type)}>{type ? <Closedeye/> : <Openeye/>}</span>
    </div>

    {errors?.password && (
        <span className="auth_warning">{errors.password?.message}</span>)}
<input type={'text'}
       {...register('token', { required: tokenResp ? 'Токен обязателен': false})}
    placeholder="token"
    className="auth_input"
    disabled= {!tokenResp}
    />
    {errors?.password && (
        <span className="auth_warning">{errors.password?.message}</span>)}
</>}

    <span className="auth__info auth__back" onClick={()=>navigate(-1)}>{'<'}Назад</span>    
    <span className="auth__info">Срок действия временного пароля 24 ч.</span>
    <div className="auth__actions">
    <BaseButton type="submit" color={'yellow'}>
    <span>Отправить</span>
    </BaseButton>
    </div>
    </div>
</Form>
</>
    )
}
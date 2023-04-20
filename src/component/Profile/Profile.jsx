import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useForm } from 'react-hook-form'
import {Form} from '../Form/Form'
import { BaseButton } from '../BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../storage/user/userSlice'


export const Profile = () => {


   const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const { setIsAuthentificated } = useContext(UserContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = useSelector(s => s.user.data)

  const sendProfileData = async (data) => {
      await dispatch(updateUser({ name: data.name, about: data.about }))
  }

  const required = {
      required: {
          value: true
      }
  }

  const sendAvatar = async ({ avatar }) => {
      await dispatch(updateUser({ avatar: avatar }))
  }


//   const handleLogout = () => {
//       localStorage.removeItem('token');
//       setIsAuthentificated(false)
//       navigate('/login');
//   }


   return <div className="profile">
         <div className='profile__back' onClick={() => navigate(-1)}>{'<'}Назад</div>
         <div>
            <h1>Мои данные</h1>
         </div>
{currentUser?.name && currentUser?.about && (<>
         <Form submitForm={handleSubmit(sendProfileData)}>
            <div className='profile__user'>
               <input {...register('name', required)} className='profile_input' defaultValue={currentUser.name} type='text' placeholder='Имя'></input>
               <input {...register('about', required)} className='profile_input' defaultValue={currentUser.about} placeholder='Описание'></input>
               <input {...register('email')} className='profile_input' defaultValue={currentUser?.email} disabled placeholder='email'></input>
               <input {...register('id')} className='profile_input' defaultValue={currentUser?._id} disabled placeholder='id'></input>
            <BaseButton type="submit" color={'yellow'}>Отправить</BaseButton>
            </div>
         </Form>

         <div className='profile__avatar'>
        <Form submitForm={handleSubmit(sendAvatar)}>
        <div className='profile__user'>
        <img className='profile__avatar-img' src={currentUser.avatar} alt='avatar'></img>
        <input className='profile_input' {...register('avatar')} defaultValue={currentUser?.avatar} placeholder='URL аватара'></input>
        <BaseButton type="submit" color={'yellow'}>Отправить</BaseButton>
        </div>
        </Form>
         </div></>)
}
      </div>
}
import { useForm } from 'react-hook-form';
import './UpdateProduct.css'
import { Form } from '../Form/Form'
import { BaseButton } from "../BaseButton/BaseButton"
import {api} from "../../utils/api"
import { openNotification } from '../Notification/Notification';


export const UpdateProduct = ({ setUpdateModal, product, id}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onSubmit" });


    const UpdateProduct = async (data) => {
        let arr = data.tags.split(","); 
        try {
           const res= await api.updateProduct(product._id, {...data,  tags:[...arr]});
           setUpdateModal(false)
           reset();
           openNotification('success', 'Успешно', 'Описание товара успешно изменен')
        } catch (error) {
            openNotification('error', 'Ошибка', 'Не удалось изменить описание товара')
        }
    }


    return (
        <div className='update_product'>
            <span onClick={() => setUpdateModal(false)}>x</span>
                <Form title={'Редактировать товар'} submitForm={handleSubmit(UpdateProduct)} >
                <div className='form_edit_inputs'>
                     <input type="text" className='update-product_input' defaultValue={product?.name} placeholder='Название' {...register('name', {required:true})} />
                    <input type="number" className='update-product_input' defaultValue={product?.price} placeholder='Цена' {...register('price', {required:true})} />
                     <input type="text" className='update-product_input' defaultValue={product?.description} placeholder='Описание' {...register('description')} />
                     <input type="text" className='update-product_input' defaultValue={product?.wight} placeholder='Вес' {...register('wight')} />
                     <input type="text" className='update-product_input' defaultValue={product?.pictures} placeholder='URL зображения' {...register('pictures', {required:true})} />   
                    <input type="number" className='update-product_input' defaultValue={product?.discount} placeholder='Скидка' {...register('discount')} />
                    <input type="text" className='update-product_input' defaultValue={product?.tags} placeholder='Теги' {...register('tags')} />
                    <input type="number" className='update-product_input' defaultValue={product?.stock} placeholder='Количество на складе' {...register('stock')} />
                    </div>
               <BaseButton color={'yellow'} type= "submit">Отправить</BaseButton>
                </Form>
        </div>
    )
}
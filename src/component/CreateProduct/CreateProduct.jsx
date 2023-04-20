import { useForm } from 'react-hook-form';
import './CreateProduct.css'
import { Form } from '../Form/Form'
import { BaseButton } from "../BaseButton/BaseButton"
import {api} from "../../utils/api"
import { openNotification } from '../Notification/Notification';

export const CreateProduct = ({ setCreateModal }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onSubmit" });

    const createProduct = async (data) => {
        let arr = data.tags.split(" "); 
        try {
             await api.addNewProduct({...data, tags:[...arr]})
             openNotification('success', 'Успешно', 'Товар успешно добавлен')
            setCreateModal(false)
            reset();
        } catch (error) {
            openNotification('error', 'Ошибка', 'Не удалось добавить товар')
        }
    }

    return (
        <div className='create_product'>
            <span onClick={() => setCreateModal(false)}>x</span>
            <div>
                <Form title={'Создать товар'} submitForm={handleSubmit(createProduct)}>
                <div className='form_edit_inputs'>
                    <input type="text" className='create-product_input' placeholder='Название' {...register('name', {required:true})} />
                    <input type="number" className='create-product_input' placeholder='Цена' {...register('price', {required:true})} />
                    <input type="text" className='create-product_input' placeholder='Описание' {...register('description')} />
                    <input type="text" className='create-product_input' placeholder='URL зображения' {...register('pictures', {required:true})} />
                    <input type="number" className='create-product_input' placeholder='Вес' {...register('wight')} />
                    <input type="number" className='create-product_input' placeholder='Количество на складе' {...register('stock')} />
                    <input type="number" className='create-product_input' placeholder='Скидка' {...register('discount')} />
                    <input type="text" className='create-product_input' placeholder='Теги' {...register('tags')} />
                    </div>
               <BaseButton color={'yellow'} type= "submit">Отправить</BaseButton>
                </Form>
            </div>
        </div>
    )
}
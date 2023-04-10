import s from './Product.module.css';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import cn from 'classnames';
import {ReactComponent as Save} from './img/save.svg';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { UserContext } from '../../context/userContext';
import { findLike } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Rating } from '../Rating/Rating';

import {Form} from '../Form/Form';
import { useForm } from 'react-hook-form';
import { BaseButton } from "../BaseButton/BaseButton";
import {ReactComponent as Bascet} from './img/bascet.svg';
import { openNotification } from '../Notification/Notification';

export const Product = ({id, product, reviews, onSentReview, onDeleteReview}) => { 

const [rate, setRate] = useState(3) 
const [currentRating, setCurrentRating]= useState(0)
const [reviewsProduct, setReviewsProduct]= useState(reviews)
const [users, setUsers] =  useState([])
const [showForm, setShowForm]= useState(false)
const [productCount, setProductCount]= useState(0)

const {setParentCounter}= useContext(UserContext);
const {currentUser} = useContext(UserContext);

const {register, handleSubmit, reset} = useForm({mode:"onSubmit" });

const sentReview = async (data)=>{
const newProduct = await api.addCommentProduct(product._id, {text: data.review, rating:rate})
try {
onSentReview(newProduct);
// setReviewsProduct(state=>[...newProduct.reviews])
setShowForm(false)
reset()
openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен')
} catch (error) {
  openNotification('error', 'Ошибка', 'Ваш отзыв отправить не удалось')
}
}

const isLiked = ()=> { 
const res= product?.likes?.find((el) => el === currentUser._id);
return res;}

const navigate = useNavigate()   

const getUser= (id)=>{
  if (!users.length) return 'User'
  let user = users.find(e=> e._id ===id);
  if (user?.avatar.includes('default-image')){
  user={...user, avatar:'https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-d23c3848-2d30-4c9a-8895-9cd55298bc6a'}
  }
  return user
}

const options = {
day: 'numeric',
month: 'short',
year: "numeric",
}

const textRegister= register("review", {
  required: "review обязателен",
})

const deleteReview = async(id)=> {
  //  setReviewsProduct(()=>[...res.reviews])
  try {
  const res= await onDeleteReview(id)
  openNotification('success', 'Успешно', 'Ваш отзыв удален')
} catch (error) {
  openNotification('error', 'Ошибка', 'Ваш отзыв удалить не получилось')
}

}

const hideReviews =()=> {
  setReviewsProduct(()=>[...reviews.slice(0,2)])
}

const showMore =()=> {
  setReviewsProduct((state)=>[...reviews.slice(0, state.length+ 2)])
}

useEffect(()=>{
  setReviewsProduct(()=>reviews)
}, [reviews])

useEffect(()=>{
  if (!product?.reviews) return;
const rateAcc = (product.reviews.reduce((acc, el)=> acc=acc+el.rating, 0))
const accum = Math.floor(rateAcc/product.reviews.length)
setRate(accum)
setCurrentRating(accum)
},[product?.reviews])

useEffect(()=>{
api.getUsers().then((data)=>setUsers(data))
},[])


  return (
    <>
    <div><span className={s.product_back} onClick={()=>navigate(-1)}>{'< '}Назад</span></div>
    <div className= {s.title}>{product.name}</div>
        <div className={s.rateInfo}>
          <span>Артикул:<b>2388907</b></span>
          <Rating rate={currentRating} setRate={()=>{}}/>
          <span>{product?.reviews?.length} отзывов</span>
          </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e)=>(<span key={e} className={`tag tag_type_${e}`}>{e}</span>))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>
          {product.price}&nbsp;₽
          </span>
          {!!product.discount && (
          <span className={`${s.price} card__price_type_discount`}>
              -{product.discount}&nbsp;%
            </span>)}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus} onClick={()=>productCount>0 && setProductCount((s)=>s-1)}>-</button>
              <span className={s.num}>{productCount}</span>
              <button className={s.plus} onClick={()=>productCount< product.stock && setProductCount((s)=>s+1)}>+</button>
            </div>
            <button onClick={()=>setParentCounter((state)=>state + productCount)} className={`btn btn_type_primary ${s.cart}`}>
              В корзину
            </button>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLiked() })}>
            <Save />
            <span>{isLiked() ? 'В избранном':'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span></p>
                <p className={s.text}> Доставка до пункта выдачи - <span className={s.bold}>от 199 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
            <div className={s.right}>
              <h3 className={s.name}>Гарантия качества</h3>
              <p className={s.text}>
              Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт {product.wight}</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>{product.price} ₽ за {product.wight}</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
<div className={s.review__wtapper}>
  <button className='btn' onClick={()=>setShowForm(true)}>Добавить отзыв</button>
  {showForm && 
    <Form className={s.review__form} submitForm={handleSubmit(sentReview)}>
      <Rating rate={rate} isEditable={true} setRate={setRate}/>
      <span>Оставьте ваш отзыв</span>
    <textarea placeholder='Ваш отзыв' className={s.review__form__text}
    {...textRegister}
    />
    <BaseButton color={'yellow'} type='submit'>Сохранить отзыв</BaseButton>
    </Form>
  }
  <div className={s.review__show_more}>
  <span onClick={showMore}>Еще отзывы</span>
  <span onClick={hideReviews}>Скрыть отзывы</span>
  </div>
  </div>

      <div>
        {users && reviewsProduct
        .sort((a,b)=>new Date (b.created_at)-new Date (a.created_at))
        .map((r)=><div key={r._id} className={s.review}>
          <div className={s.review_author}>
            <div className={s.review__info}> 
            <img className={s.review__avatar} src={getUser(r.author)?.avatar} alt="avatar" />
              <span>{getUser(r.author)?.name ?? 'User'}</span>
              <span className={s.review__date}>{new Date(r.created_at).toLocaleString('ru', options).slice(0, 12)}</span>
              </div>
            <Rating rate={r.rating} isEditable={false}/>
            </div>
          <div className={s.text}>
          <span>{r.text}</span>
          {currentUser._id ===r.author &&
          <Bascet onClick={()=>deleteReview(r._id)} className={s.text__img}/>
        }</div>
        </div> )}
      </div>
    </>
  );
};

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../component/Product/Product"
import { api } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { findLike } from "../../utils/utils";
import { fetchChangeProductLike } from "../../storage/products/productSlice";

export const ProductPage =()=>{
    const id = useParams();
    const [product, setProduct]= useState(null);  
    const [reviews, setReviews]= useState([]) 
    const currentUser = useSelector(s=>s.user.data)
    const dispatch= useDispatch()

    const onProductLike = () => {
        const wasLiked = findLike(product, currentUser);
        dispatch(fetchChangeProductLike(product))
        if (wasLiked) {
          const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
          setProduct({ ...product, likes: filteredLikes });
        } else {
          const addedLikes = [...product.likes, currentUser._id];
          setProduct({ ...product, likes: addedLikes });
        }
      };

    const onSentReview = (newProduct)=>{
    setProduct(()=>({...newProduct}));
    }

    const deleteReview = async(id)=> {
        const result= await api.deleteCommentProduct(product._id, id)
        setProduct(state=>({...result}))
        return result
       }

    useEffect(()=>{
        if (!id?.productId){
            return
        }
        api.getProductById(id?.productId).then((data)=>setProduct(data));
        },[id?.productId])

    useEffect(()=>{
   if (product?.reviews && Array.isArray(product?.reviews)){
   setReviews(()=>[...product.reviews?.sort((a,b)=>new Date (b.created_at)-new Date (a.created_at))])
   }
    },[product, product?.reviews])    

return (<>
{product && currentUser ?
<Product product={product} 
reviews={reviews}
onDeleteReview= {deleteReview}
onSentReview ={onSentReview}
onProductLike={onProductLike}
id={id.productId}/> 
: <div>Loading</div>}
</>  
)}
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../component/Product/Product"
import { api } from "../../utils/api";
import { UserContext } from '../../context/userContext';

export const ProductPage =()=>{
    const id = useParams();
    const [product, setProduct]= useState(null);  
    const { currentUser } = useContext(UserContext);
    const [reviews, setReviews]= useState([]) 

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
id={id.productId}/> 
: <div>Loading</div>}
</>  
)}
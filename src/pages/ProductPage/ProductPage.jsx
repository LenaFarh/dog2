import { useParams } from "react-router-dom";
import { Product } from "../../component/Product/Product"

export const ProductPage =()=>{
    const id = useParams();
    return <Product id={id.productId}/>
}
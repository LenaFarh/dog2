import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { findLike } from "../../utils/utils"
import { api } from "../../utils/api"

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', 
    async function (paginator, {extra:api, fulfillWithValue, rejectWithValue, getState}){
    try {
       const {user }= getState()
       const products = await api.getProductList(
        paginator.page ?? 1, 
        paginator.pageSize ?? 10
        )
       return fulfillWithValue({...products, user:user.data})
    } catch (error) {
        rejectWithValue(error) 
    }
})

export const fetchProductsSearch = createAsyncThunk(
    'products/fetchProductsSearch', 
    async function (search, {extra:api, fulfillWithValue, rejectWithValue, getState}){
    try {
        if (search){
            const products = await api.searchProducts(search)
            return fulfillWithValue(products)
        } else{
            const {products}= getState()
            const result = await api.getProductList(
                products.page ?? 1, 
                products.pageSize ?? 10)
            return fulfillWithValue(result.products) 
        }
    } catch (error) {
        rejectWithValue(error) 
    }
})


export const fetchChangeProductLike= createAsyncThunk(
    'products/fetchChangeProductLike', 
    async function (product, {rejectWithValue, fulfillWithValue, getState, extra:api}
) {
   try {
    const {user} = getState()
    const wasLiked= findLike(product, user.data)
    const data= await api.changeLikeProductStatus(product._id, wasLiked)
    return fulfillWithValue({product:data, wasLiked:wasLiked})
   } catch (error) {
    rejectWithValue(error) 
   } 
})

export const fetchAddProduct= createAsyncThunk(
    'products/fetchAddProduct', 
    async function (data, {rejectWithValue, fulfillWithValue}
) {
   try {
    const newProduct= await api.addNewProduct(data)
    return fulfillWithValue(newProduct)
   } catch (error) {
    rejectWithValue(error) 
   } 
})

const initialState = {
    data: [],
    favorites: [],
    total: null,
    loading: false,
    error: null,
    currentSort: 'newest',
    page:1,
    pageSize:10,
}

const productSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers: {
        sortedProducts: (state, action) => {
            switch (action.payload) {
                case "Популярные":
                    state.data = state.data.sort((a, b) => b.likes.length - a.likes.length);
                    break;
                case 'Новинки':
                    state.data = state.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case 'Сначала дешевые':
                    state.data = state.data.sort((a, b) => a.price - b.price);
                    break;
                case 'По скидке':
                    state.data = state.data.sort((a, b) => b.discount - a.discount);
                    break;     
                default:
                state.data = state.data.sort((a, b) => b.price - a.price);
                break;    
        }
    },
    setPage: (state, action)=>{
        state.page= action.payload},
        setPagesize: (state, action)=>{
            state.pageSize= action.payload}
},

    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
        state.loading= true;   
        state.error= null;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            const {user, products}= action.payload;
            state.data=products;
            state.total=action.payload.total ?? 0;
            state.favorites = products.filter((e)=>findLike(e, user));
            state.loading= false;   
    })
    .addCase(fetchChangeProductLike.fulfilled, (state, action)=>{
        state.loading= false;   
        state.error= null;
        const {product, wasLiked}= action.payload
        state.data= state.data.map(card=>{
            return card._id === product._id ? product : card
        })
        if (!wasLiked) {
            state.favorites.push(product)
        } else{
            state.favorites= state.favorites.filter(cardFav=> cardFav._id !== product._id)
        }
})
    .addCase(fetchProductsSearch.fulfilled, (state, action)=>{
        state.data= action.payload;
        state.loading= false;   
    })
    .addCase(fetchAddProduct.fulfilled, (state, action)=>{
        state.data= [...state.data, action.payload];
        state.loading= false;  
    })
}
})
export const {sortedProducts, setPage, setPagesize}= productSlice.actions
export default productSlice.reducer

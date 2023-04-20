import { Select } from 'antd';
import { useContext, useEffect, useState } from "react"
import { Cards } from "../../component/Cards/Cards"
import { Sort } from "../../component/Sort/Sort"
import { UserContext } from "../../context/userContext"
import { getAnswer } from "../../utils/utils"
import "../../component/Footer/Footer.css"
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../component/Modal/Modal'
import { CreateProduct } from '../../component/CreateProduct/CreateProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsSearch, setPage, setPagesize } from '../../storage/products/productSlice';

export const CatalogPage = ({ setShowModal, activeModal }) => {

    const { statSarch } = useContext(UserContext);
    const [optionsPage, setOptionsPage] = useState([]);
    const [isCreateModalActive, setCreateModal] = useState(false);
    const products = useSelector(s => s.products.data)
    const {total, page, pageSize} = useSelector(s => s.products)
    const dispatch = useDispatch()

    useEffect(() => {
        const pages = Math.ceil(total / pageSize);
        const pageCounter = new Array(pages).fill({}).map((e, i) => ({
            value: i + 1, label: `${i + 1}`
        }));
        setOptionsPage(pageCounter);
    }, [products, pageSize])

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, pageSize }))
        dispatch(setPage(1))
    }, [dispatch, pageSize])

    useEffect(() => {
        if(page===1) return
        dispatch(fetchProducts({ page, pageSize }))
    }, [page])


    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/?page=${page}&size=${pageSize}`)
    }, [navigate, pageSize, page])

    const optionsSize = [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
        { value: 40, label: 40 },
        { value: 50, label: 50 },
    ]

    const handleChange = (v) => {
       dispatch(setPagesize(v))
    }

    return <>
        {statSarch && (
            <p>По запросу {statSarch} найдено {products?.length} {getAnswer(products.length)}
            </p>
        )}

        <button className='btn' onClick={() => setCreateModal(true)}>Добавить товар</button>
        {isCreateModalActive && <Modal activeModal={isCreateModalActive} setShowModal={setCreateModal}>
            <CreateProduct setCreateModal={setCreateModal} />
        </Modal>}
        <Sort></Sort>
        <Cards cards={products} />
        <Select className='select' defaultValue={10} options={optionsSize} onChange={handleChange} />
        <Select className='select' defaultValue={1} value={page} options={optionsPage} onChange={(v)=>dispatch(setPage(v))} />
    </>
}
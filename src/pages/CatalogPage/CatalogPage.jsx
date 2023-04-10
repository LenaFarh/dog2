import { Select } from 'antd';
import { useContext, useEffect, useState } from "react"
import { Cards } from "../../component/Cards/Cards"
import { Sort } from "../../component/Sort/Sort"
import { CardContext } from "../../context/cardContext"
import { UserContext } from "../../context/userContext"
import { getAnswer } from "../../utils/utils"
import "../../component/Footer/Footer.css"
import { useNavigate } from 'react-router-dom';

export const CatalogPage =()=>{

    const {statSarch} = useContext(UserContext);
    const {cards}= useContext(CardContext);
    const [pageSize, setPageSize]=  useState(10);
    const [page, setPage]=  useState(1);
    const [paginatedCards, setPaginatedCards]=  useState([]);
    const [optionsPage, setOptionsPage]=  useState([]);

    useEffect(()=>{
    const total= cards.length;  
    const pages = Math. ceil(total/pageSize);
    const pageCounter= new Array(pages).fill({}).map((e, i)=>({
        value: i+1, label: `${i+1}`
    }));
    setOptionsPage(pageCounter);
    setPage(1);
    }, [cards, pageSize])

    useEffect(()=>{
    const paginated = cards.slice(pageSize*(page-1), pageSize*page);
    setPaginatedCards(paginated);
    },[cards, pageSize, page]);

    const navigate= useNavigate();

    useEffect(()=>{
        navigate(`/?page=${page}&size=${pageSize}`)
    },[navigate,pageSize, page])

    const optionsSize = [
        { value: 10, label:10},
        { value: 20, label:20},
        { value: 30, label:30},
        { value: 40, label:40},
        { value: 50, label:50},   
    ]

     const handleChange = (v)=>{
        setPageSize(v)
    }

    return  <>
    {statSarch && (
    <p>По запросу {statSarch} найдено {cards?.length} {getAnswer(cards.length)}
    </p>
    )}
    <Sort></Sort>
    <Cards cards={paginatedCards}/>
    <Select  className='select' defaultValue={10} options={optionsSize} onChange= {handleChange}/>
    <Select  className='select' defaultValue={1} value={page} options={optionsPage} onChange= {setPage}/>
    </>
}
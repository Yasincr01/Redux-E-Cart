import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
    const {id} = useParams()
    // console.log(id);
    const [product,setProduct] = useState({}) 
    const userCart = useSelector(state=>state.cartReducer)
    const userWishlist = useSelector(state=>state.wishlistReducer)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(sessionStorage.getItem("allProducts")){
            const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
            setProduct(allProducts?.find(item=>item.id==id))
        }
    },[])

    // console.log(product);
    const handleWishlist = (product)=>{
        const existingProduct = userWishlist?.find(item=>item.id==product.id)
        if(existingProduct){
            alert("Product Already in your Wishlist!!!")
        }else{
            dispatch(addToWishlist(product))
        }
    }

    const handleCart = (product)=>{
        dispatch(addToCart(product))
        const existingProduct = userCart?.find(item=>item.id==product.id)
        if(existingProduct){
            alert("Product Quantity is Incrementing!!!")
        }
    }




    
  return (
   <>
        <Header/>
        <div style={{paddingTop:'100px'}} className='flex content-center items-center mx-5'>
            <div className='grid grid-cols-2 items-center'>
            <img width={'90%'} height={'300px'} src={product?.thumbnail} alt="" />
           
            <div>
                <h3>PTD: 6</h3>
                <h1 className='text-5xl font-bold mb-3'>{product?.title}</h1>
                <p className='text-lg font-semibold mt-3'>Brand : <span className='text-blue-800'>{product?.brand}</span></p>
                <p>
                    <span className='font-bold text-lg'>Category </span>: {product?.category}
                </p>
                <h4 className='text-2xl font-bold text-red-500 mt-2 mb-2'>$ {product?.price}</h4>
                <p>
                    <span className='font-bold mt-4 mb-2'>Description </span>: {product?.description}
                </p>
                <p className='text-lg font-semibold mt-3'>Rating : <span className='text-red-600'>{product?.rating}/5</span></p>

                

                <div className='flex justify-between mt-5'>
                    <button onClick={()=>handleWishlist(product)} className='text-white bg-blue-600 rounded p-2'>ADD TO WISHLIST</button>
                    <button onClick={()=>handleCart(product)} className='text-white bg-green-600 rounded p-2'>ADD TO CART</button>
                    </div>
            </div>
            </div>
        </div>
        </>
      )
    }
   

export default View
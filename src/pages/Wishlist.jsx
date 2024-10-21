import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'



const Wishlist = () => {
    const userCart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()
const userWishlist = useSelector(state=>state.wishlistReducer)


const handleCart = (product)=>{
    dispatch(addToCart(product))

    const existingProduct = userCart?.find(item=>item.id==product.id)
    dispatch(removeWishlistItem(product.id))
    if(existingProduct){
        alert("Product Quantity is Incrementing!!!")
    }
}
  return (

        <>
        <Header/>
        
        <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
            {
                userWishlist?.length>0?
           
        <>
        <h1 className='text-5xl font-bold text-red-700'>My Wishlist <i className="fa-solid fa-heart "></i></h1>
        <div className='grid grid-cols-4 gap-4'>
            {
                userWishlist?.map(product=>(
                    <div key={product?.id} className='rounded border p-2 mt-4 shadow'>
                <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
                <div className='text-center'>
                     <h3 className='text-xl font-bold'>{product?.title}</h3>
                     <div className="flex justify-evenly mt-3">
                      <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='text-xl'> <i className='fa-solid fa-heart-circle-xmark text-red-600'></i> </button>
                      <button onClick={()=>handleCart(product)} className='text-xl'> <i className='fa-solid fa-cart-plus text-green-600'></i> </button>

                     </div>
                </div>
            </div>
                ))
            }
        </div>
        </>
        :
        <div style={{width:'100vw',height:'50vh'}} className='flex flex-col font-bold justify-center items-center my-5'>
           <img style={{width:'600px'}} src="https://cdn.dribbble.com/users/1465772/screenshots/5726748/____dri.gif" alt="" />
           <h1 className='text-blue-700 font-semibold text-5xl '>Your Wishlist is Empty</h1>
           
           </div>
    }
        </div>
        </>
         )
}

export default Wishlist
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { fetchAllProducts } from '../redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,error} = useSelector(state=>state.productReducer)
  // console.log(allProducts,loading,error);
  
  const [currentPage,setCurrentPage] = useState(1)
  const productPerPage = 8
  const totalPage = Math.ceil(allProducts?.length/productPerPage)
  const currentPageLastProductIndex = currentPage * productPerPage
  const currentPageFirstProductIndex = currentPageLastProductIndex - productPerPage
  const visibleProductCards = allProducts?.slice(currentPageFirstProductIndex,currentPageLastProductIndex)

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

  const navigateToNextPage = ()=>{
    if(currentPage!=totalPage){
      setCurrentPage(currentPage+1)
    }
  }
  
  const navigateToPrevPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }
  return (
    <>
        <Header/>
        
        <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
        {
          loading ?
           <div className='flex flex-col justify-center items-center my-5 text-lg'>
            <img width={'350px'} className='me-2' src="https://cdnl.iconscout.com/lottie/premium/thumb/loading-circle-5383835-4510717.gif" alt="" />
            <h1 className='text-green-800 font-bold text-5xl'>Loading...</h1>
           </div>
           :
          <>
        <div className='grid grid-cols-4 gap-4'>

            {
              allProducts?.length>0 ?
              visibleProductCards?.map(product=>(
                <div key={product?.id} className='rounded border p-2 shadow'>
                <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
                <div className='text-center'>
                     <h3 className='text-xl font-bold'>{product?.title}</h3>
                     <Link className='bg-green-900 rounded p-1 mt-3 text-white inline-block' to={`${product?.id}/view`}>View More</Link>
                </div>
            </div>
              ))
              :

        <div style={{width:'100vw',height:'50vh'}} className='flex font-bold justify-center items-center text-red-700 my-5 text-5xl  '><i class="fa-solid fa-circle-exclamation me-3 text-4xl"></i>Product Not Found</div>
            }

        </div>
        <div className="text-center text-2xl fw-bolder my-10">
          <span onClick={navigateToPrevPage} className='cursor-pointer'> <i className="fa-solid fa-backward me-5"></i></span>
          <span>{currentPage} of {totalPage}</span>

          <span onClick={navigateToNextPage} className='cursor-pointer'> <i className="fa-solid fa-forward ms-5"></i></span>

        </div>
        </>
        }
        </div>
    </>
  )
}

export default Home
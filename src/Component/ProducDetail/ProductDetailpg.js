import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const ProductDetailpg = () => {
    const Detail = useLocation();
    const [productDetail, setProductDetail] = useState(null)
    console.log(Detail);
    useEffect(() => {
        if (Detail.state !== null) {
            setProductDetail(Detail.state)
            // const data = Object.values(Detail.state); // Convert object values to an array
            // setProductDetail(data);
            console.log(productDetail)
        } else {
            // console.log(Detail.search)
            // const responce = await axios.get( 'https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductFromCartById',{ params: { id: productId } });
            // setProductDetail(responce)
        }
    }, [])
    return (
        <div className='container'>
            <h1>Product details</h1>
            {productDetail && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{productDetail.productShortName}</h5>
                    </div>
                    <div className="card-body row">
                        <div className='col-md-6'>
                            <img src={productDetail.productImageUrl} className="card-img-top" alt="Product Image" style={{ width: '450px', height: '450px' }} />
                        </div>
                        <div className='col-md-6'>
                            <h5 className="card-title">{productDetail.productName}</h5>
                            <p className="card-text">{productDetail.productDescription}</p>
                            <h4 className="card-text"> ₹{productDetail.productPrice}</h4>
                            <p className="card-text"><strong>deliveryTimeSpan - </strong>{productDetail.deliveryTimeSpan}</p>
                            <button className='btn btn-primary mt-3'>Buy Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailpg;
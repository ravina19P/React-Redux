import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GetData } from './Common';

const UpdateProduct = () => {
    const detail = useLocation();
    const [product,setProduct] = useState({});
    const [navData, setNavData] = useState([]);
    useEffect(()=>{
        GetData().then((data) => {
            // data   47 data
            setNavData(data);
          });

        if(detail.state !==null){
            console.log(detail.state);
            const obj = detail.state;
            setProduct({
                ProductId: obj.productId,
                ProductSku:obj.productSku,
                ProductName:obj.productName,
                ProductPrice:obj.productPrice,
                ProductShortName:obj.productShortName,
                ProductDescription:obj.productDescription,
                CreatedDate:obj.createdDate,
                DeliveryTimeSpan:obj.deliveryTimeSpan,  // drop
                CategoryId:obj.categoryId,    //drop
                ProductImageUrl:obj.productImageUrl
            })
        }else{

            console.log(detail.search)
            // api call krna hai product by id
            // setProductDetil(response)
        }
    },[])

    const onChangeHandler=(fieldname,value)=>{
        setProduct(prevState=>({
            ...prevState,[fieldname]:value
        }))
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        console.log(product);
        //api logic
  
        let reqBoy = product;
        reqBoy.CreatedDate= new Date();
  
     const res = await axios.post ("https://onlinetestapi.gerasim.in/api/Ecomm/UpdateProduct",reqBoy);
     console.log(res)
      }

    return (
        <div>
            <div className='container'>
                <div className='row col-6 offset-3'>
                    
                    <form onSubmit={(e)=>submitHandler(e)}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">ProductSku</label>
                            <input type="text" value={product.ProductSku} onChange={(e)=>onChangeHandler("ProductSku",e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">ProductName</label>
                            <input type="text" value={product.ProductName} onChange={(e)=>onChangeHandler("ProductName",e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">ProductPrice</label>
                            <input type="text" value={product.ProductPrice} onChange={(e)=>onChangeHandler("ProductPrice",e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">ProductShortName</label>
                            <input type="text" value={product.ProductShortName} onChange={(e)=>onChangeHandler("ProductShortName",e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">ProductDescription</label>
                        <input type="text" value={product.ProductDescription} onChange={(e) => onChangeHandler("ProductDescription", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputEmail1">Delivery Time Span</label>
                        <select class="form-select" onChange={(e)=>onChangeHandler("DeliveryTimeSpan",e.target.value)} aria-label="Default select example">
                            <option selected>Select time span</option>
                            <option value="1 week">1 week</option>
                            <option value="15 days">15 days</option>
                            <option value="12 days">12 days</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputEmail1">Select Product </label>
                        <select class="form-select" onChange={(e)=>onChangeHandler("CategoryId",e.target.value)} aria-label="Default select example">
                            <option selected>Open this select category</option>
                            {navData.slice(0, 5).map((item, index) => {
                                return (
                                    <option value={item.categoryId}>{item.categoryName}</option>
                                 )

                            })}
                        </select>

                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">ProductImageUrl</label>
                        <input type="text" value={product.ProductImageUrl} onChange={(e)=>onChangeHandler("ProductImageUrl",e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>



                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                </div>

                </div>
        </div>
    );
};

export default UpdateProduct;
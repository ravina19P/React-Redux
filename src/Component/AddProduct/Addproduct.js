import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetData } from '../../Other/Common';

const Addproduct = () => {
    const [info, setInfo] = useState({
        ProductId: 0,
        ProductSku: '',
        ProductName: '',
        ProductPrice: '',
        ProductShortName: '',
        ProductDescription: '',
        CreatedDate: new Date().toISOString(),
        DeliveryTimeSpan: '',
        CategoryId: 0,
        ProductImageUrl: ''
    });

    const [error, setError] = useState([]);
    const [data, setData] = useState([]);
    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }

    useEffect(() => {
        GetData().then((Responcedata) => {
            setData(Responcedata);
        })
    }, [])
    const submitHandle = async (event) => {
        const { ProductSku, ProductName, ProductPrice, ProductShortName, ProductDescription, DeliveryTimeSpan, CategoryId, ProductImageUrl } = info
        event.preventDefault();
        let ErrorArray = [];
        for (let x in info) {
            if (info[x] === "") {
                ErrorArray.push(x)
            }
        }
        setError(ErrorArray);
        if (ErrorArray.length <= 0) {
            let reqBody = {
                "ProductSku": ProductSku,
                "ProductName": ProductName,
                "ProductPrice": ProductPrice,
                "ProductShortName": ProductShortName,
                "ProductDescription": ProductDescription,
                "CreatedDate": new Date(),
                "DeliveryTimeSpan": DeliveryTimeSpan,
                "CategoryId": CategoryId,
                "CategoryId": parseInt(CategoryId) || 0,
                "ProductImageUrl": ProductImageUrl
            }
            try {
                const result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/CreateProduct", reqBody);
                console.log('Response Data:', result.data);
            } catch (error) {
                console.error('Error:', error.response.data);
            }
        }
    }
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    return (
        <div className='container border border-primary p-5 m-5'>
            <h1>Add products</h1>
            <form class="row g-3" onSubmit={(e) => submitHandle(e)}>
                <div class="col-md-6">
                    <label class="form-label">Product Sku</label>
                    <input type="text" class={HandleError("ProductSku") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductSku} onChange={(e) => OnchangeHandle(e, 'ProductSku')} placeholder="Product Sku" />
                    {HandleError("ProductSku") && <div class="invalid-feedback">
                        Please choose a ProductSku.
                    </div>}
                </div>
                <div class="col-md-6">
                    <label class="form-label">Product Name</label>
                    <input type="text" class={HandleError("ProductName") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductName} onChange={(e) => OnchangeHandle(e, 'ProductName')} placeholder='Product Name' />
                    {HandleError("ProductName") && <div class="invalid-feedback">
                        Please choose a ProductName.
                    </div>}
                </div>
                <div class="col-6">
                    <label class="form-label">Product Price</label>
                    <input type="text" class={HandleError("ProductPrice") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductPrice} onChange={(e) => OnchangeHandle(e, 'ProductPrice')} placeholder='ProductPrice' />
                    {HandleError("ProductPrice") && <div class="invalid-feedback">
                        Please choose a ProductPrice.
                    </div>}
                </div>
                <div class="col-6">
                    <label class="form-label">Product ShortName</label>
                    <input type="text" class={HandleError("ProductShortName") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductShortName} onChange={(e) => OnchangeHandle(e, 'ProductShortName')} placeholder='ProductShortName' />
                    {HandleError("ProductShortName") && <div class="invalid-feedback">
                        Please choose a ProductShortName.
                    </div>}
                </div>
                <div class="col-md-12">
                    <label class="form-label">Product Description</label>
                    <input type="text" class={HandleError("ProductDescription") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductDescription} onChange={(e) => OnchangeHandle(e, 'ProductDescription')} placeholder='Description' />
                    {HandleError("ProductDescription") && <div class="invalid-feedback">
                        Please choose a ProductDescription.
                    </div>}
                </div>
                <div class="col-md-6">
                    <label class="form-label">DeliveryTimeSpan</label>
                    <select class={HandleError("DeliveryTimeSpan") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.DeliveryTimeSpan} onChange={(e) => OnchangeHandle(e, 'DeliveryTimeSpan')}>
                        <option selected>Choose...</option>
                        <option value={"5 days"} >5 days</option>
                        <option value={"8 Days"}>8 Days</option>
                        <option value={"1 weak"}>1 weak</option>
                        <option value={"2 weak"}>2 weak</option>
                    </select>
                    {HandleError("DeliveryTimeSpan") && <div class="invalid-feedback">
                        Please choose a DeliveryTimeSpan.
                    </div>}
                </div>
                <div class="col-md-6">
                    <label class="form-label">CategoryId</label>
                    <select class={HandleError("CategoryId") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.CategoryId} onChange={(e) => OnchangeHandle(e, 'CategoryId')}>
                        <option  selected>Choose...</option> 
                        {data.slice(0, 5).map((item, index) => {
                            return (
                                <option value={item.categoryId} key={index}>{item.categoryName}</option>
                            )
                        })}
                    </select>
                    {HandleError("CategoryId") && <div class="invalid-feedback">
                        Please choose a CategoryId.
                    </div>}
                </div>
                <div class="col-md-12">
                    <label class="form-label">ProductImageUrl</label>
                    <input type="text" class={HandleError("ProductImageUrl") ? "form-control is-invalid mt-2" : "form-control mt-2"} value={info.ProductImageUrl} onChange={(e) => OnchangeHandle(e, 'ProductImageUrl')} />
                    {HandleError("ProductImageUrl") && <div class="invalid-feedback">
                        Please choose a ProductImageUrl.
                    </div>}
                </div>
                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Addproduct;
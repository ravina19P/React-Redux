import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [info, setInfo] = useState({
        CategoryId: 0,
        CategoryName: " ",
        ParentCategoryId: 0
    });

    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    const submitHandle = async (event) => {
        const { CategoryId, CategoryName, ParentCategoryId} = info
        event.preventDefault();
        let reqBody = {
            "CategoryId": CategoryId,
            "CategoryName": CategoryName,
            "ParentCategoryId": ParentCategoryId
        }
        try {
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/CreateNewCategory", reqBody);
            console.log('Response Data:', result.data);
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }
    useEffect(() => {

    })
    return (
        <div className='container border border-primary p-5 m-5'>
            <h1>Create Category</h1>
            <form onSubmit={(e) => submitHandle(e)}>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" value={info.CategoryName} onChange={(e) => OnchangeHandle(e, 'CategoryName')} placeholder="Category Name" />
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" value={info.ParentCategoryId} onChange={(e) => OnchangeHandle(e, 'ParentCategoryId')} placeholder="parent Category Id" />
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;
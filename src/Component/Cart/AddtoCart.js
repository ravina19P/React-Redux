import React, { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../../App';
import { DeleteProductFromCartById } from '../../Other/Common';

const AddtoCart = () => {
    const cartnumb = useContext(Appcontext)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        cartnumb.setActiveTB("AddtoCart")
        console.log(cartnumb.cartDatainfo)
        let add = 0;
        if (cartnumb?.cartDatainfo && cartnumb.cartDatainfo.length > 0) {
            for (let x of cartnumb.cartDatainfo) {
                if (x.quantity > 0 && x.productPrice) {
                    add = add + x.quantity * x.productPrice;
                }
            }
        }
        setTotal(add);
    }, [])
    const handleCartDelete = (productId) => {
        DeleteProductFromCartById(productId).then((response) => {
            console.log("Product deleted from cart:", response);
            cartnumb.getCartNum(prevstate => prevstate.filter(item => item.productId !== productId));
        })
    }
    return (
        <div className='container'>
            {cartnumb?.cartDatainfo && cartnumb.cartDatainfo.length > 0 && cartnumb.cartDatainfo.map((item, index) => {
                return (
                    <div className="card mt-3"><button type="button" className="close position-absolute top-0 end-0" aria-label="Close" style={{ zIndex: 1 }} onClick={() => handleCartDelete(item.productId)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                        <div className="card-header">
                            {item.productName}
                        </div>
                        <div className="card-body d-flex row">
                            <div className='col-md-6'>
                                <h5 className="card-title">{item.categoryName}</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <p>Quantity: <strong>{item.quantity}</strong></p>
                                <p>Price: <strong>{item.productPrice}</strong></p>
                                <h6 style={{ alignSelf: 'flex-end' }}>
                                    Subtotal : {item.quantity * item.productPrice}</h6>
                            </div>
                            <div className='col-md-6'>
                                <img src={item.productImageUrl} alt={item.productName} style={{ width: '200px', height: '200px' }} />
                            </div>
                        </div>
                    </div>)
            })}
            <div className="card">
                <div className="card-body">
                    Your final Total Amount in rupees is : <strong>{total} Rs.  </strong>
                    <button className='btn btn-primary'>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default AddtoCart;
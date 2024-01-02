import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const Card = (props) => {
    return (  
            <div className="card  m-3 p-3" style={{ width: "18rem", height: "38rem" }}>
                {props.Admin &&
                    <div className="d-flex justify-content-end" >
                        <FontAwesomeIcon className="left mr-3" onClick={() => props.openUpdateCart(props.item)} style={{ cursor: "pointer", color: "grey" }} icon={faEdit} />
                        <FontAwesomeIcon className="right" onClick={() => props.deletProduct(props.item)} icon={faTrash} style={{ cursor: "pointer", color: "grey" }} />
                    </div>
                }
                <img src={props.item.productImageUrl} className="card-img-top" alt="Card Image" style={{ height: '200px', objectFit: 'cover' }} onClick={() => props.OpenProduct(props.item)} />
                <div className="card-body">
                    <h5 className="card-title">{props.item.productName}</h5>
                    <h5 className="card-text">₹ {props.item.productPrice}</h5>
                    <p className="card-text"><strong>FREE delivery - </strong>{props.item.deliveryTimeSpan}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        {props.userInfo !== null && <>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary" onClick={() => props.IncrementLogic(props.index)}>+</button>
                                <button type="button" className="btn btn-primary">{props.item.quantity ? props.item.quantity : 0}</button>
                                <button type="button" className="btn btn-primary" onClick={() => props.DecrementLogic(props.index)}>-</button>
                            </div>
                            < button disabled={props.item.quantity ? false : true} type="button" className="btn btn-primary" onClick={() => props.addtoCart(props.item)}>Add to Cart</button> </>
                        }
                    </div>
                </div>
            </div>
    );
};

export default memo(Card);
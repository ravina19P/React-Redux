import React from 'react';
import Label from '../Label/Label';
const Checkbox = (props) => {
    return (
        <>
            <div className="form-group">
                <Label labelName={props.labelName}></Label>
                {props.options.map((item, index) => (
                    <div  className={props.HandleError ? "form-check form-check is-invalid" : "form-check"} key={index}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={item}
                            id={props.fieldname} 
                            onChange={(e) => props.onchangeHandle(props.fieldname, e.target.value)}
                        />
                        <label className="form-check-label">
                            {item}
                        </label>
                    </div>
                ))}
                {props.HandleError && (
                    <div className="invalid-feedback">
                        Please choose a {props.fieldname}
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkbox;

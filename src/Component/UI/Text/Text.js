import React from 'react';

const Text = (props) => {
    return (
        <>
            <input type={props.type} id={props.fieldname} 
              className={props.handleError ? "form-control is-invalid" :"form-control"} 
              value={props.value}  onChange={(e)=>props.onChange(e, props.fieldname)}
              placeholder={props.placeholder}></input>
            {props.handleError &&  <div className="invalid-feedback">
                        Please provide a {props.fieldname}.
                    </div>}
        </>
    );
};

export default Text;

const Select = (props) => {
    return (
        <>
            <select
                value={props.value}
                className={props.HandleError(props.fieldname) ? "form-select form-control is-invalid" : "form-select form-control"}
                id={props.fieldname}
                onChange={(e) => props.onChangeHandler(props.fieldname, e.target.value)}
            >
                <option value="" disabled>Select an option</option>
                {props.options.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {props.HandleError(props.fieldname) && (
                <div className="invalid-feedback">
                    Please choose a {props.fieldname}
                </div>
            )}
        </>
    );
};

export default Select;

import React from 'react';


const SelectInput = ({input, name, label, defaultOption, options, meta: {touched, error, warning}}) => {

    return(
        <div className="form-group">
            <div htmlFor={name}>{label}</div>
            <div className="field">
                <select
                    {...input}
                    name={name}
                    className="form-control"
                >
                </select>

                    {touched && ((error && <p className="text-danger">{error}</p>) || (warning && <p className="text-danger">{warning}</p>))}

            </div>
        </div>
    );
};


export default SelectInput;
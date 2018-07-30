import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';

export const RewardForm = ({ handleSubmit, pristine, reset, submitting, heading, handleSave, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="user"
                label="Name"
                placeholder="Name"
                component={FieldInput}
            />

            <Field
                type="text"
                name="experience"
                label="Experience"
                component={FieldInput}
            />

            <Field
                type="text"
                name="date"
                label="Date"
                placeholder="Date"
                component={FieldInput}
            />

            <Field
                type="text"
                name="status"
                label="Status"
                placeholder="Status"
                component={FieldInput}
            />

            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.category) {
        errors.category = 'Required';
    }

    if (!values.length) {
        errors.length = 'Required';
    }

    if (!values.authorId) {
        errors.authorId = 'Required';
    }

    return errors;
};

export default reduxForm({
    form: 'CourseForm',
    validate
})(RewardForm);

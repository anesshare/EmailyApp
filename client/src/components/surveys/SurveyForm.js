import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from "./formFields";

class SurveyForm extends React.Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type='text' label={label} name={name} />;
        });
    }

    render() {
        return (
            <div className="row">
                <form className="col s12 m8 offset-m2 l6 offset-l3" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className='teal btn-flat right white-text'>
                        NEXT <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name.toLowerCase()}!`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);

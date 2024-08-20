import React from "react";
import { connect } from 'react-redux';
import formFields from "./formFields";
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <h5>Please confirm your entries</h5>
                {reviewFields}
                <button className="red white-text btn-flat" onClick={onCancel}>BACK</button>
                <button
                    className="teal white-text btn-flat right"
                    onClick={() => submitSurvey(formValues, history)}
                >
                    Send Survey <i className="material-icons right">email</i>
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));

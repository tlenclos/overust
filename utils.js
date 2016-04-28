function formatSequelizeErrorsToReduxForm(sequelizeErrors) {
    if (sequelizeErrors.errors) {
        let errors = {};
        sequelizeErrors.errors.map((error) => {
            errors[error.path] = error.message;
        })
        return errors;
    }

    return sequelizeErrors;
}

function checkStatusOfJsonResponse(response) {
    let json = response.json();

    if (response.status >= 200 && response.status < 300) {
        return json
    } else {
        return json.then(Promise.reject.bind(Promise));
    }
}

export {
    formatSequelizeErrorsToReduxForm,
    checkStatusOfJsonResponse
};

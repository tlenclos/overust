import { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {reduxForm} from 'redux-form';
import s from './WipeForm.css';

function checkStatus(response) {
    let json = response.json();

    if (response.status >= 200 && response.status < 300) {
        return json
    } else {
        return json.then(Promise.reject.bind(Promise));
    }
}

const handleSubmit = event => {
    event.preventDefault();

    return fetch('/api/wipe', {
        credentials: 'include',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({test: 1})
    })
    .then(checkStatus)
    .then(function(data) {
        console.log('request succeeded with JSON response', data);
        // TODO Redirect to wipe list
        // TODO Save new wipe in state
    })
    .catch(function(errors) {
        // TODO Add form error validation
        console.log('errors', errors);
    });
}

let WipeForm = ({ from, to, serverName }) => (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Start date</label>
            <input type="text" placeholder="Start date" {...from}/>
        </div>
        <div>
            <label>End of wipe</label>
            <input type="text" placeholder="End of wipe" {...to}/>
        </div>
        <div>
            <label>Server name</label>
            <input type="text" placeholder="Server name" {...serverName}/>
        </div>
        <button type="submit">Submit</button>
    </form>
)

WipeForm = reduxForm({
    form: 'wipe',
    fields: ['from', 'to', 'serverName']
})(WipeForm);

export default withStyles(WipeForm, s);

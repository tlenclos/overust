import { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {reduxForm} from 'redux-form';
import s from './WipeForm.css';

function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/wipe', {
        credentials: 'include',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({test: 1})
    })
    .then(response => response.json())
    .then(json =>
        console.log(json)
    );
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

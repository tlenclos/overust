import { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {reduxForm} from 'redux-form';
import AutoComplete from 'react-autocomplete';
import s from './WipeForm.css';
import { checkStatusOfJsonResponse, formatSequelizeErrorsToReduxForm } from './../../utils';

class WipeForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        this.autocomplete = this.autocomplete.bind(this);

        this.state = {
            searchValue: '',
            steamSearch: []
        }
    }

    submit(values, dispatch) {
        console.log('values', values);

        return new Promise((resolve, reject) => {
            fetch('/api/wipe', {
                credentials: 'include',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            .then(checkStatusOfJsonResponse)
            .then((data) => {
                console.log('request succeeded with JSON response', data);
                // TODO Save new wipe in state
                resolve({then: () => {
                    this.context.router.push('/app');
                }});
            })
            .catch(function(errors) {
                reject({...formatSequelizeErrorsToReduxForm(errors),  _error: 'Wipe creation failed.' })
            });
        })
    }

    autocomplete(value) {
        console.log('autocomplete for value', value);
    }

    render() {
        const { fields: { from, to, serverName }, error, handleSubmit } = this.props;
        return <form onSubmit={handleSubmit(this.submit)}>
            <div>
                <label>Start date</label>
                <input type="date" placeholder="Start date" {...from}/>
                {from.touched && from.error && <div>{from.error}</div>}
            </div>
            <div>
                <label>End of wipe</label>
                <input type="date" placeholder="End of wipe" {...to}/>
                {to.touched && to.error && <div>{from.error}</div>}
            </div>
            <div>
                <label>Server name</label>
                <input type="text" placeholder="Server name" {...serverName}/>
                {serverName.touched && serverName.error && <div>{serverName.error}</div>}
            </div>
            <div>
                <AutoComplete
                    labelText="Team"
                    ref="autocomplete"
                    value={this.state.searchValue}
                    inputProps={{
                        type: 'search',
                        placeholder: 'Search for your team mates on steam'
                    }}
                    items={this.state.steamSearch}
                    getItemValue={(item) => item.name}
                    onSelect={(value, item) => {
                        console.log(value);
                    }}
                    onChange={(event, value) => {
                        this.setState({ searchValue: value, loading: true })
                        this.autocomplete(value);
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                          key={item.name}
                          id={item.name}
                        >{item.name}</div>
                    )}
                />
            </div>

            {error && <div>{error}</div>}
            <button type="submit">Submit</button>
        </form>
    }
}

WipeForm.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

WipeForm = reduxForm({
    form: 'wipe',
    fields: ['from', 'to', 'serverName']
})(WipeForm);

export default withStyles(WipeForm, s);

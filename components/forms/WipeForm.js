import { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {reduxForm} from 'redux-form';
import Select from 'react-select';
import classNames from "classnames";
import s from './WipeForm.css';
import { checkStatusOfJsonResponse, formatSequelizeErrorsToReduxForm } from './../../utils';

class UserSelectValue extends Component {
    render() {
        let {children, placeholder, value} = this.props;
        return <div className="Select-value" title={this.props.value.title}>
            <span className="Select-value-label">
                <img src={value.avatar} />
                {this.props.children}
            </span>
        </div>
    }
}

class UserSelectOption extends Component {
    constructor(props) {
        super(props);
    }
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    }
    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }
    render () {
        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown.bind(this)}
                 onMouseEnter={this.handleMouseEnter.bind(this)}
                 onMouseMove={this.handleMouseMove.bind(this)}
                 title={this.props.option.title}>
                <img src={this.props.option.avatar} />
                {this.props.children}
            </div>
        );
    }
}

class WipeForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        this.getFriends = this.getFriends.bind(this);

        this.state = {
            searchValue: '',
            steamSearch: [],
            friends: [], // Result from friends API
            friendsSelected: ''
        };
    }

    submit(values, dispatch) {
        values.team = this.state.friendsSelected.split(',');
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

    getFriends(input, callback) {
        // TODO Handle errors
        fetch('/api/friends', {
            credentials: 'include',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(checkStatusOfJsonResponse)
        .then((data) => {
            this.setState({friends: data});

            callback(null, {
                options: data.map((friend) => {
                    return {
                        value: friend.steamid,
                        label: friend.personaname,
                        avatar: friend.avatar,
                        clearableValue: true
                    }
                }),
                complete: true
            });
        });
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
                <Select.Async
                    multi
                    simpleValue
                    name="team"
                    value={this.state.friendsSelected}
                    loadOptions={this.getFriends}
                    onChange={(friendsSelected, test) => {
                        this.setState({ friendsSelected });
                    }}
                    valueComponent={UserSelectValue}
                    optionComponent={UserSelectOption}
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

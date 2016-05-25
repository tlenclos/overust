import { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RoundAvatar.css';

const RoundAvatar = ({ user }) => {
    return <img className={s['tiny-avatar']} src={user.avatar} />
};

RoundAvatar.propTypes = {
    user: PropTypes.object.isRequired
};

export default withStyles(RoundAvatar, s);

import { PropTypes } from 'react';
import { Link } from 'react-router';
import RoundAvatar from './RoundAvatar';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WipesList.css';

const WipesList = ({ wipes }) => (
    <div>
        {wipes.map((wipe, key) => {
            return <Link key={key} to={`/app/wipe/create`}>
                <div key={wipe.id} className={s.wipeItem} style={{
                    backgroundImage: 'url(/img/wipe1.png)'}
                }>
                    <div className={s.wipeContent}>
                        <h3>{wipe.serverName}</h3>
                        <p>{wipe.from} - {wipe.to}</p>
                        <ul className={s.userList}>
                            {wipe.users.map((user, key) => {
                                return <li key={key} data-username={user.username}>
                                    <RoundAvatar user={user} />
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </Link>
        })}
    </div>
);

WipesList.propTypes = {
    wipes: PropTypes.array
};

WipesList.defaultProps = {
    wipes: []
};

export default withStyles(WipesList, s);

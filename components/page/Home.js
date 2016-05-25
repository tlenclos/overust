import { PropTypes } from 'react';
import Helmet from "react-helmet";

const Home = () => (
    <div>
      <div className="header">
        <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
          <a className="pure-menu-heading" href="">OveRust</a>

          <ul className="pure-menu-list">
            <li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Home</a></li>
            <li className="pure-menu-item"><a href="/auth/steam" className="pure-menu-link">Sign Up</a></li>
          </ul>
        </div>
      </div>

      <div className="splash-container">
        <div className="splash">
          <h1 className="splash-head">Rust manager</h1>
          <p className="splash-subhead">
            An app to manage your team through the wipes.
          </p>
          <div id="steam-login"></div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="pure-u-3-24"></div>
        <div className="content pure-u-18-24">
          <h2 className="content-head is-center">Features</h2>

          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <h3 className="content-subhead">
                <i className="fa fa-users"></i>
                Manage player of your clan
              </h3>
              <p>
                Add, remove, promote members. Everybody knows everybody and your team is safer.
              </p>
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <h3 className="content-subhead">
                <i className="fa fa-calendar-check-o"></i>
                Create game events
              </h3>
              <p>
                Organize all your team on a common goal
              </p>
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <h3 className="content-subhead">
                <i className="fa fa-bell-o"></i>
                Custom alerts for raids
              </h3>
              <p>
                <span className="tag">(coming soon)</span><br />
                Send email and push notif alerts to all members. Never miss an online raid.
              </p>
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <h3 className="content-subhead">
                <i className="fa fa-star-o"></i>
                Public page
              </h3>
              <p>
                <span className="tag">(coming soon)</span><br />
                Remember that great base your built the last wipe, keep this beauty in history and show it to the world.
              </p>
            </div>
          </div>
        </div>
        <div className="pure-u-3-24"></div>

        <div className="ribbon l-box-lrg pure-g">
          <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
            <img className="pure-img-responsive" alt="We need you" src="img/weneedyou.png" />
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">

            <h2 className="content-head content-head-ribbon">Contribute</h2>

            <p>
              Your feedback is really important to us. Don't hesitate to follow us on Twitter and in the subreddit.
            </p>
          </div>
        </div>

        <div className="footer l-box is-center">
          © Rust manager 2016 | Contact @rustover
        </div>
      </div>
    </div>
);

export default Home;

'use strict';

const React = require('react');
const Helmet = require('react-helmet').Helmet;

class PageShell extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-assembly/v0.13.0/assembly.min.css"
          />
          <script
            async
            defer
            src="https://api.mapbox.com/mapbox-assembly/v0.13.0/assembly.js"
          />
        </Helmet>
        <div className="wmax480 mx-auto mt72">
          {this.props.children}

          <div className="mt72 p24 bg-gray-faint">
            <a className="link inline-block mr24" href="/">home</a>
            <a className="link inline-block mr24" href="/about">about</a>
            <a className="link inline-block mr24" href="/about/security">
              about/security
            </a>
            <a className="link inline-block mr24" href="/posts/one">one</a>
            <a className="link inline-block mr24" href="/posts/two">two</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PageShell;

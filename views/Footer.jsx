var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="row">
            <div className="col-sm-7 col-xs-5">
              <div className="copyright">Apple Tea &copy; 2016</div>
            </div>
            <div className="col-sm-5 col-xs-7">
              <p><b>Apple Tea</b> is one of many exciting projects we're working on. If you want to support our development and help keep Apple Tea servers running, you can send us a donation. We'll love you for it. <i className="fa fa-heart"></i></p>
              <button type="button" className="btn btn-dark">Donate</button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
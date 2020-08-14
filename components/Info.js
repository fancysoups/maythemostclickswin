import React from 'react';

const Info = ({ clicks }) => {
  return (
    <div className="info">
      <div className="info-inner">
        <div className="top">
          <a
            href="https://twitter.com/intent/tweet?text=maythemostclicks.win"
            target="_blank"
          >
            Put <span className="site">{process.env.NEXT_PUBLIC_DOMAIN}</span>{' '}
            anywhere in a public tweet to play.
          </a>
          <div className="clicks">
            {clicks.toLocaleString()} total clicks from Twitter
          </div>
        </div>

        <a
          href="https://www.nass.org/can-I-vote/voter-registration-status"
          target="_blank"
          className="vote"
        >
          Are you over 18? Do you live in the United States? Click here to make
          sure you're registered to vote in 30 seconds or less.
        </a>
      </div>
      <style jsx>{`
        .info {
          height: 100%;
          max-width: 600px;
        }
        .info-inner {
          position: sticky;
          top: 0;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100vh;
        }
        a {
          color: black;
          text-decoration: none;
          padding: 5px 10px;
          display: inline-block;
          text-align: left;
        }
        .site {
          color: magenta;
          cursor: progress;
        }
        .vote {
          background: magenta;
          color: white;
        }
        .clicks {
          margin: 5px 10px;
          opacity: 0.5;
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .info {
            max-width: none;
          }
          .info-inner {
            padding: 0 10px;
            padding-top: 40px;
            text-align: center;
            position: relative;
            height: auto;
            display: block;
          }
          a {
            margin-bottom: 10px;
            text-align: center;
          }
          .clicks {
            text-align: center;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Info;

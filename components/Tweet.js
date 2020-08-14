import React, { forwardRef } from 'react';
import shortNumber from 'short-number';
const isProd = process.env.NODE_ENV === 'production';

const Tweet = forwardRef(({ tweet, number }, ref) => {
  let silent = false;
  let text;
  if (!tweet.text.replace(tweet.tcoLink, '').length) {
    silent = true;
    text = '';
  } else {
    text = tweet.text
      .replace(/(<([^>]+)>)/gi, '')
      .replace(
        new RegExp(tweet.tcoLink, 'g'),
        `<span style="color: magenta; font-weight: 500;">${process.env.NEXT_PUBLIC_DOMAIN}</span>`
      );
  }
  const onDelete = (ban = false) => {
    fetch('/api/delete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweetID: tweet.tweetID, ban }),
    });
  };
  return (
    <div className="tweet" ref={ref}>
      <div className="user">
        <img className="avatar" src={tweet.avatarURL} />
        <a
          target="_blank"
          href={`https://twitter.com/${tweet.username}`}
          className="username"
        >
          {tweet.displayName}
        </a>
        <div className="hits">{shortNumber(tweet.hits)} clicks</div>
      </div>
      <div className="meta">
        <div className="position">#{shortNumber(number + 1)}</div>
        <a
          className="text"
          target="_blank"
          href={`https://twitter.com/${tweet.username}/status/${tweet.tweetID}`}
          style={{
            opacity: silent ? 0.5 : 1,
            fontStyle: silent ? 'italic' : 'normal',
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      {!isProd && (
        <div className="controls">
          <button onClick={() => onDelete()}>Delete</button>
          <button onClick={() => onDelete(true)}>Delete and Ban</button>
        </div>
      )}
      <style jsx>{`
        .tweet {
          border: 1px dashed #777;
          margin-bottom: 10px;
        }
        .user {
          height: 30px;
          display: flex;
          align-items: center;
          background: #f1f1f1;
          border-bottom: 1px dashed #777;
        }
        .avatar {
          height: 30px;
          width: 30px;
          object-fit: cover;
        }
        .controls {
          text-align: right;
        }
        .username {
          padding: 10px;
          flex: 1 1 auto;
          font-size: 14px;
          font-weight: 500;
          display: block;
          text-decoration: none;
          color: black;
        }
        .text {
          border-top: none;
          padding: 10px;
          flex: 1 1 auto;
          color: black;
          text-decoration: none;
        }
        .meta {
          display: flex;
          align-items: flex-start;
        }
        .position {
          min-width: 30px;
          width: 30px;
          padding-top: 10px;
          text-align: center;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 10px;
        }
        .link {
          color: magenta;
          font-weight: 500;
        }
        .hits {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 11px;
          text-transform: uppercase;
          margin-right: 10px;
          color: #444;
        }
      `}</style>
    </div>
  );
});

export default Tweet;

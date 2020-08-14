import React from 'react';
import Tweet from './Tweet';
import FlipMove from 'react-flip-move';

const Top = ({ top }) => {
  return (
    <div className="top">
      <div className="top-list">
        <FlipMove>
          {top.map((tweet, number) => (
            <Tweet
              key={`${tweet._id}-${number}`}
              tweet={tweet}
              number={number}
            />
          ))}
        </FlipMove>
      </div>
      <style jsx>{`
        .top {
          margin: 20px 15px;
        }
        .top-list {
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .top {
            margin: 20px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Top;

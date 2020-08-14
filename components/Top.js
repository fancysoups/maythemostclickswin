import React from 'react';
import useSWR from 'swr';
import Tweet from './Tweet';
import FlipMove from 'react-flip-move';
const isProd = process.env.NODE_ENV === 'production';
const URL = isProd
  ? `https://cdn.${process.env.NEXT_PUBLIC_DOMAIN}/api/top.json`
  : 'http://localhost:3000/api/top.json';

const fetcher = url => fetch(url).then(res => res.json());

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

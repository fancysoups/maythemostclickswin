import incrementTweet from 'backend/functions/increment-tweet';
import searchTweet from 'backend/functions/search-tweet';
import Head from 'next/head';
import Info from 'components/Info';
import Top from 'components/Top';
import useSWR from 'swr';

const isProd = process.env.NODE_ENV === 'production';
const URL = isProd
  ? `https://cdn.${process.env.NEXT_PUBLIC_DOMAIN}/api/top.json`
  : 'http://localhost:3000/api/top.json';

export const getServerSideProps = async ctx => {
  const referer = ctx.req.headers.referer;
  if (referer) {
    let tweet = await incrementTweet(referer);
    if (tweet && !tweet.tweetID) await searchTweet(tweet);
  }
  const initialData = await fetch(URL).then(res => res.json());
  return { props: { initialData } };
};
const fetcher = url => fetch(url).then(res => res.json());

const Index = ({ initialData }) => {
  const { data } = useSWR(URL, fetcher, {
    initialData: initialData,
    refreshInterval: 15 * 1000,
  });
  return (
    <div className="index">
      <Head>
        <title>may the most clicks win</title>
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.maythemostclicks.win/icon.png"
        />
      </Head>
      <Info clicks={data.clicks} />
      <Top top={data.top} />
      <style jsx>{`
        .index {
          display: grid;
          grid-template-columns: auto 400px 1fr;
          height: 100%;
        }
        @media (max-width: 768px) {
          .index {
            display: block;
          }
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html,
        body {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          padding: 0;
          margin: 0;
          background: #fff;
          overscroll-behavior: none;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Index;

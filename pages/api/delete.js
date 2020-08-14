import Tweet from 'backend/models/Tweet';
import User from 'backend/models/User';
import connectDB from 'backend/connectDB';
const isProd = process.env.NODE_ENV === 'production';

export default async (req, res) => {
  if (isProd) return res.json({ error: true });
  await connectDB();
  const { tweetID, ban = false } = req.body;
  const tweet = await Tweet.findOneAndUpdate(
    { tweetID },
    { deleted: true },
    { new: true }
  );
  if (ban)
    await User.updateOne(
      { userID: tweet.userID },
      { banned: true },
      { upsert: true }
    );
  if (process.env.BUNNY_CDN_KEY)
    await fetch(
      `https://bunnycdn.com/api/purge?url=${encodeURIComponent(
        'https://cdn.maythemostclicks.win/api/top.json'
      )}`,
      {
        headers: {
          AccessKey: process.env.BUNNY_CDN_KEY,
        },
      }
    );
  return res.json({ success: true });
};

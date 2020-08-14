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
  await fetch(
    `https://bunnycdn.com/api/purge?url=${encodeURIComponent(
      'https://cdn.maythemostclicks.win/api/top.json'
    )}`,
    {
      headers: {
        AccessKey:
          '26e7737a-faaa-494e-b43c-ddbaad46d0b24f917210-eccb-4b61-9a1c-dccd9a6777a0',
      },
    }
  );
  return res.json({ success: true });
};

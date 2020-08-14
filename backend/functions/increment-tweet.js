import Tweet from 'backend/models/Tweet';
import connectDB from 'backend/connectDB';

const incrementTweet = async tcoLink => {
  await connectDB();
  if (!tcoLink || !tcoLink.length || !tcoLink.startsWith('https://t.co/'))
    return;
  tcoLink = tcoLink.split('?')[0];
  const tweet = await Tweet.findOneAndUpdate(
    { tcoLink },
    { $inc: { hits: 1 } },
    { upsert: true, new: true }
  );
  return tweet;
};

export default incrementTweet;

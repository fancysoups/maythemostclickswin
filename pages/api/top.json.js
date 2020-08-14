import Tweet from 'backend/models/Tweet';
import connectDB from 'backend/connectDB';

export default async (req, res) => {
  await connectDB();
  const top = await Tweet.find({ active: true, deleted: { $ne: true } })
    .sort({
      hits: -1,
    })
    .select(
      '_id hits avatarURL text tcoLink userID tweetID displayName username'
    )
    .limit(500)
    .lean();
  const stat = await Tweet.aggregate([
    { $group: { _id: null, amount: { $sum: '$hits' } } },
  ]);
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({ top, clicks: stat[0].amount });
};

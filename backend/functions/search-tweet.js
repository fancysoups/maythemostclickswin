import Twitter from 'twitter';
import Tweet from 'backend/models/Tweet';
import User from 'backend/models/User';
import connectDB from 'backend/connectDB';

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const searchTweet = async tweet => {
  if (!tweet) return;
  console.log('searching for', tweet.tcoLink);
  if (tweet.tweetID) return;
  try {
    const tweets = await client.get(
      'https://api.twitter.com/2/tweets/search/recent',
      {
        query: `(url:"${tweet.tcoLink}" OR url:"maythemostclicks.win") -is:retweet`,
        'tweet.fields': 'created_at',
        expansions: 'author_id',
        'user.fields': 'profile_image_url',
      }
    );
    if (!tweets.data?.length) {
      console.log('no tweets found!');
      return;
    }
    const _tweet = tweets.data.find(t => t.text.includes(tweet.tcoLink));
    if (!_tweet) return;
    let user = tweets.includes.users.find(u => u.id == _tweet.author_id);
    if (!user) return;
    const banned = !!(await User.countDocuments({
      userID: user.id,
      banned: true,
    }));
    if (banned) return;
    const tweetData = {
      tweetID: _tweet.id,
      text: _tweet.text,
      tweetTime: _tweet.created_at,
      userID: user.id,
      username: user.username,
      displayName: user.name,
      avatarURL: user.profile_image_url,
      active: true,
    };
    try {
      await connectDB();
      await Tweet.updateMany({ userID: tweetData.userID }, { active: false }); // deactivate existing
      await Tweet.updateOne({ tcoLink: tweet.tcoLink }, tweetData);
      return;
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export default searchTweet;

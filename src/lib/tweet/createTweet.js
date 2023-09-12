import supabase from "../supabase";

export default async function createTweet(
  tweet,
  user_id,
  photo_url,
  name,
  username
) {
  console.log(tweet);
  const { data, error } = await supabase
    .from("tweets")
    .insert({
      user_id: user_id,
      photo_url: photo_url,
      name: name,
      username: username,
      tweet_text: tweet,
    })
    .select();
  console.log(data);
  console.log(error);
}

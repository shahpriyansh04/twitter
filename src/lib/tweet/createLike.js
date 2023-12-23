import supabase from "../supabase";

export default async function createLike(tweet_id, user_id) {
  const { data, error } = await supabase
    .from("likes")
    .insert({
      user_id: user_id,
      tweet_id: tweet_id,
    })
    .select();
}

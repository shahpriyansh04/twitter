import supabase from "../supabase";

export default async function createComment({
  user_id,
  tweet_id,
  comment_id,
  comment_text,
}) {
  const { data, error } = await supabase.from("comments").insert({
    user_id: user_id,
    tweet_id: tweet_id,
    parent_commend_id: comment_id,
    comment_text: comment_text,
  });
}

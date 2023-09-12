import supabase from "../supabase";

export default async function getTweets(user_id) {
  const { data, error } = await supabase
    .from("tweets")
    .select("*")
    .order("created_at", { ascending: false });
  if (!data) {
    return error;
  }
  return data;
}

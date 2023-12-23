import supabase from "../supabase";

export default async function removeLike(id) {
  const { data, error } = await supabase.from("likes").delete().eq("id", id);
}

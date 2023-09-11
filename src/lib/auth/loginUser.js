import supabase from "../supabase";

export default async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data);
  console.log(error);
}

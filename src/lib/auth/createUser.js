import supabase from "../supabase";

export default async function createUser(email, password, name, username) {
  console.log(password);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        username: username,
      },
    },
  });
  console.log(data);
  console.log(error);
}

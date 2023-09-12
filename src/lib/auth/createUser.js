import supabase from "../supabase";

export default async function createUser(
  email,
  password,
  name,
  username,
  photo_url
) {
  console.log(password);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        username: username,
        photo_url:
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      },
    },
  });
  if (!error) {
    const { error } = await supabase.from("users").insert({
      id: data.user.id,
      name: name,
      username: username,
      photo_url:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    });
    console.log(error);
  }
  console.log(data);
  console.log(error);
}

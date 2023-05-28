import { client } from "@/sanity/lib/client";

export default async function createComment(req, res) {
  const { id, name, email, comment, blogTitle, blogDescription } = JSON.parse(
    req.body
  );

  try {
    await client.create({
      _type: "comment",
      id,
      blogTitle,
      name,
      email,
      comment,
      blogDescription,
    });
  } catch (error) {
    return res.status(500).json({ message: "couldn't submit comment", error });
  }
  console.log("Comment Submitted!");
  res.status(200).json({ message: "Comment Submitted!" });
}

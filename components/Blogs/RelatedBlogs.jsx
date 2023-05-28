// Next impoers
import Link from "next/link";
import React from "react";

const RelatedBlogs = ({ posts, thisPage }) => {
  // Getting the tags
  const tags = thisPage.properties.Tags.multi_select.map((tag) => tag.name);

  // mapping over the tags to get the related tags
  let data = tags.map((tag) =>
    posts.filter((post) =>
      post.properties.Tags.multi_select.some(({ name }) => name.includes(tag))
    )
  );

  // getting related blogs logic
  const related = new Set();
  data.map((dat) => dat.map((info) => related.add(info)));

  const blogThree = [...related];
  const blog = blogThree.filter((blog) => blog.id !== thisPage.id);
  const relatedBlog = blog.slice(0, 3);

  return (
    <div>
      <h1 className="text-xl text-center  text-primary pt-8 pb-2">
        Related Blogs
      </h1>
      <div className="grid max-lg:grid-cols-1 grid-cols-3 p-4 gap-8">
        {relatedBlog.map((blog) => (
          <div
            key={blog.id}
            className="rounded-md p-6 max-lg:p-4 flex items-center justify-start hover:text-primary border text-xl shadow-md hover:shadow-primary hover:border-primary transition-all duration-150 ease-in-out"
          >
            <h1 className="">
              <Link href={`/blogs/${blog.id}`} className="">
                {blog.properties.Blog_Title.title[0].plain_text}
              </Link>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;

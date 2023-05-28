const comment = {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "blogTitle",
      type: "string",
      title: "Blog title",
    },
    {
      name: "blogDescription",
      type: "string",
      title: "Blog Description",
    },
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "approved",
      type: "boolean",
      title: "Approved",
      description: "comments won't show on the site without approval",
    },
    {
      name: "approvedHome",
      type: "boolean",
      title: "Approved For Home",
      description: "comments to show on the Home Page",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "id",
      type: "string",
      title: "Post ID",
    },
    {
      name: "comment",
      type: "text",
      title: "Comment",
    },
  ],
};

export default comment;

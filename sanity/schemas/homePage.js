const homePage = {
  name: "homePage",
  title: "Home Page Info",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "logoTitle",
      title: "Logo Title",
      type: "string",
    },
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    },
    {
      name: "heroPara",
      title: "Hero Paragraph",
      type: "string",
    },
  ],
};

export default homePage;

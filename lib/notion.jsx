import { Client } from "@notionhq/client";
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "publish?",
      checkbox: {
        equals: true,
      },
      // sorts: [
      //   {
      //     property: "Created_Time",
      //     direction: "descending",
      //   },
      // ],
    },
  });
  return response.results;
};

export const getHomeDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "publish?",
      checkbox: {
        equals: true,
      },
      property: "HomePage",
      checkbox: {
        equals: true,
      },
    },
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results;
};

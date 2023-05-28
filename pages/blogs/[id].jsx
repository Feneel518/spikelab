import RelatedBlogs from "@/components/Blogs/RelatedBlogs";
import HeroSection from "@/components/HeroSection/HeroSection";
import Layout from "@/components/Layout/Layout";
import AMA from "@/components/Modal/AMA";
import { getBlocks, getDatabase, getPage } from "@/lib/notion";
import useModal from "@/modalState";
import { client } from "@/sanity/lib/client";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useForm, submitHandler } from "react-hook-form";

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// for rich text
export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? "font-bold" : "",
          code ? "" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline underline-offset-2" : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={index}
      >
        {text.link ? (
          <a className="text-primary " href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// if list then this function
const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// content check
const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="mt-4">
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="text-4xl font-bold mt-4">
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-3xl font-semibold mt-4">
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-2xl font-semibold mt-4">
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul className="mt-4">
          {value.children.map((child) => renderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="mt-4">
          {value.children.map((child) => renderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div className="mt-4">
          <label htmlFor={id} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={id}
              defaultChecked={value.checked}
              className="checkbox checkbox-primary"
            />{" "}
            <span className="label-text">
              <Text text={value.rich_text} />
            </span>
          </label>
        </div>
      );
    case "toggle":
      return (
        <details
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4"
        >
          <summary className="collapse-title text-xl font-medium">
            <Text text={value.rich_text} />
          </summary>
          <div className="collapse-content">
            {block.children?.map((child) => (
              <Fragment tabIndex={0} key={child.id}>
                {renderBlock(child)}
              </Fragment>
            ))}
          </div>
        </details>
      );
    case "child_page":
      return (
        <div className="mt-4">
          <strong>{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure className="mt-4">
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote className="mt-4" key={id}>
          {value.rich_text[0].plain_text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="mt-4">
          <code key={id}>{value.rich_text[0].plain_text}</code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure className="mt-4">
          <div>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a className="mt-4" href={href} target="_brank">
          {href}
        </a>
      );
    case "table": {
      return (
        <table>
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement =
                value.has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return <div>{block.children.map((block) => renderBlock(block))}</div>;
    }
    case "column": {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
const Blogs = ({ page, blocks, data, database, bgGradient }) => {
  // if no content then return blank
  if (!page || !blocks) {
    return <div />;
  }

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // for validation of comments

  const modal = useModal((state) => state.modal);
  const closeModal = useModal((state) => state.closeModal);

  return (
    <>
      <Head>
        <title>{page.properties.Blog_Title.title[0].plain_text}</title>
        <meta
          name="description"
          content={page.properties.Description.rich_text[0].plain_text}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className=" ">
        <div className="mt-20 cursor-default">
          {/* ////////////////////////////////////////////////////// */}
          {/* ////////////////////////////////////////////////////// */}
          {/* cover image */}

          {page.cover ? (
            <div className="relative">
              <img
                className="w-full h-[450px] object-cover"
                src={
                  page.cover.type === "external"
                    ? page.cover.external.url
                    : page.cover.file.url
                }
                alt="cover-image"
              />
              <h1
                data-theme="corporate"
                className="max-lg:text-3xl text-5xl absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center py-2"
              >
                {page.properties.Blog_Title.title[0].plain_text}
              </h1>
            </div>
          ) : (
            <div className={`${bgGradient} h-[450px] relative`}>
              <h1
                data-theme="corporate"
                className="text-5xl absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center py-2"
              >
                {page.properties.Blog_Title.title[0].plain_text}
              </h1>
            </div>
          )}
        </div>

        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* author and dat info */}
        <div className="text-right mt-4 cursor-default">
          <h5 className="text-xl">
            written by:{" "}
            <strong>{page.properties.Author.rich_text[0].plain_text}</strong>
          </h5>
          <h5>
            {new Date(
              page.properties.Created_Time.created_time
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "2-digit",
              weekday: "short",
            })}{" "}
            / {page.properties.Reading_Time.rich_text[0].plain_text} mins
          </h5>
        </div>
        <div className="divider"></div>
        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* page content */}
        <section className="mt-20 flex flex-col cursor-default">
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
        <div className="divider"></div>

        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* hero section again */}
        <section>
          <HeroSection heroData={data}></HeroSection>
        </section>
        <div className="divider"></div>
        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* related blogs */}
        <RelatedBlogs posts={database} thisPage={page}></RelatedBlogs>
        <div className="divider"></div>
        <AMA
          isVisible={modal}
          title={page.properties.Blog_Title.title[0].plain_text}
          onClose={closeModal}
        ></AMA>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

// fetch details for blogs
export const getStaticProps = async (context) => {
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  // gradients for background if no cover image then
  const gradients = [
    "bg-gradient-to-r from-blue-200 to-cyan-200",
    "bg-gradient-to-r from-teal-200 to-teal-500",
    "bg-gradient-to-r from-violet-200 to-pink-200",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
  ];
  const bgGradient = gradients[Math.floor(Math.random() * 6)];

  const { id } = context.params;

  const database = await getDatabase();

  const page = await getPage(id);

  const blocks = await getBlocks(id);

  return {
    props: {
      bgGradient,

      database,

      page,
      blocks,
    },
    revalidate: 1,
  };
};

export default Blogs;

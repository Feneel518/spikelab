This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- Steps to follow -->

1. Notion Integrations

   - Go to https://www.notion.so/my-integrations and add a new integration.
   - Add an associated workspace from where you will be adding blogs and give it a name and upload a logo if you need so.
   - You will get a secret you can add it to .env.local file with the name:- NOTION_KEY = your secret, please note the name should be as exact as provided here\

2. Getting Notion page Id

   - Go to notion.so and create a new page. On creating a page, you will get your id on the url:- The url will look like https://www.notion.so/85999258018f406692330533f66b07f8 , so your id will be 85999258018f406692330533f66b07f8
     -After getting the ID, add it to your .env.local file with the name:- NOTION_DATABASE_ID = your page id\

3. On the main Index.js page there's an object named:- websiteMetaInfo, you can change it to change your title as well as metadata for your SEO.

4. In HeroSection.js Theres an object named:- heroData, you can change it to change your banner data.

5. To pass AI summary to the modal, you can pass it from Blogs.jsx, in which you can pass description as props to AiModal children and in AiModal chnage the p tag

6. The Blog page on notion should be exactly same with same names as provided now, will share the image in public folder

7. Register with emailjs, after login add a new service with gmail or any other services, connect your account and then click on create service.

   - Add that service ID to .env.local with the name as:- EMAIL_JS_SERVICE_ID = your service number
   - Add a new template
     - you can use variables from the following
       1. {{name}} = client's name
       2. {{question}} = client's question
       3. {{topic}} = blog's name
     - after creating a new template add its tempalte id to .env.local file with name as:- EMAIL_JS_TEMPLATE_ID = your template id
   - Then go to account and get the PUBLIC key and ad it to .env.local file with name as:- EMAIL_JS_PUBLIC_KEY = your public key
   - your email js is registered and can be used

8. Deployuing code to vercel
   - you can deploy via 2 ways
     1. via github, connect to github on vercel and it will ask which repository to deploy.
        You need to add the environment variables separately by going into settings and add envirnment variables
     2. you can install vercel via npm globally and directly push to vercel
        You need to add the environment variables separately by going into settings and add envirnment variables

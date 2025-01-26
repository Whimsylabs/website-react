import React from "react";
import { Helmet } from "react-helmet";
import BubbleContainer from "./BubbleContainer";

const Blog = () => {
  const posts = [
    { title: "How Whimsylabs Revolutionizes Science Education", slug: "whimsylabs-science-education" },
    { title: "Virtual Labs: The Future of STEM Learning", slug: "virtual-labs-stem" },
    { title: "AI-Powered Laboratories for Students", slug: "ai-laboratories" },
  ];

  return (
    <BubbleContainer>
      <Helmet>
        <title>Blog - Whimsylabs</title>
        <meta
          name="description"
          content="Explore how Whimsylabs is transforming science education through virtual labs and AI-driven environments."
        />
        <meta name="keywords" content="Whimsylabs, virtual labs, STEM education, AI laboratories" />
        <link rel="canonical" href="https://whimsylabs.ai/blog" />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <ul className="list-disc list-inside text-left">
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </BubbleContainer>
  );
};

export default Blog;

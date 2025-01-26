import React from "react";
import WelcomeSection from "./WelcomeSection";
import { Helmet } from "react-helmet";

const Blog = () => {
const posts = [
    { title: "How Whimsylabs Revolutionizes Science Education", slug: "whimsylabs-science-education" },
    { title: "Virtual Labs: The Future of STEM Learning", slug: "virtual-labs-stem" },
    { title: "AI-Powered Laboratories for Students", slug: "ai-laboratories" },
    ];
  return (
    <div className="container-fluid text-center p-0">
        <Helmet>
        <title>Blog - Whimsylabs</title>
        <meta name="description" content="Explore how Whimsylabs is transforming science education through virtual labs and AI-driven environments." />
        <meta name="keywords" content="Whimsylabs, virtual labs, STEM education, AI laboratories" />
        <link rel="canonical" href="https://whimsylabs.ai/blog" />
      </Helmet>

    <section className="gradient-section">
        <div className="bubble-container" />
        <div className="content">
        <h1>Blog</h1>
        <ul>
            {posts.map((post) => (
            <li key={post.slug}>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
            ))}
        </ul>
        </div>
    </section>
</div>
  );
};

export default Blog;
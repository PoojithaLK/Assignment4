import React, { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from 'react-xml-parser';
import { Link, useParams } from "react-router-dom";
import XML from "../xmlData.xml";

const Main = () => {
  const { blogTitle } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getXmlData = async () => {
      try {
        const response = await axios.get(XML, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
        const xml = new XMLParser().parseFromString(response.data);
        setBlogs(xml.children);
      } catch (error) {
        console.error("Error while fetching XML data:", error);
      }
    };

    if (blogs.length === 0) {
      getXmlData();
    }
  }, [blogs]);

  const renderSingleBlogPost = () => {
    const blogPost = blogs.flatMap((child) =>
      child.children.find((a) => a.name.toUpperCase() === "BODY" && a.attributes.title === blogTitle)
    );
    if (blogPost) {
      return (
        <div className='single-post' key={blogPost.attributes.title}>
          <h2>{blogPost.attributes.title}</h2>
          <p className='post-content'>{blogPost.children[0].value}</p>
        </div>
      );
    } else {
      return <div>No post found with the title "{blogTitle}"</div>;
    }
  };

  const renderBlogPosts = () =>
    blogs.flatMap((child) =>
      child.children.map((a) => {
        const name = a.name.toUpperCase();
        if (name === "SUMMARY") {
          const [img, summary] = a.children.flatMap((c) => c.value);
          return (
            <React.Fragment key={summary}>
              <div className='posts'>
                <p>
                  <img src={img} alt={img}></img>
                </p>
              </div>
              <h5 style={{ marginLeft: "10px" }}>{name}:</h5>
              <p style={{ marginLeft: "10px", marginTop: "-10px" }}>{summary}</p>
              <hr/>
            </React.Fragment>
          );
        } else if (name !== "BODY") {
          return (
            <div key={a.value} style={{ marginTop: "15px" }}>
              <div className='posts' style={{ marginTop: "-30px" }}>
                <h5>{name}:</h5>
                <p>{name !== "TITLE" ? a.value : <Link to={`/blog/${a.value}`}>{a.value} </Link>}</p>
              </div>
            </div>
          );
        }
      })
    );

  return <main className='main'>{blogTitle ? renderSingleBlogPost() : renderBlogPosts()}</main>;
};

export default Main;

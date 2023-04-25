import React from 'react';
import axios from 'axios';
import XMLData from '../xmlData.xml';
import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { useParams } from 'react-router-dom';

const XMLRes = () => {
const { postTitle } = useParams();
const [blogPostData, setBlogPostData] = useState(null);

useEffect(() => {
const fetchBlogPostData = async () => {
try {
const response = await axios.get(XMLData, {
headers: {
'Content-Type': 'application/xml; charset=utf-8',
},
});
const xmlData = new XMLParser().parseFromString(response.data);
const blogPost = xmlData.children.filter((post) => {
return post.children.find((child) => child.name === 'Title' && child.value === postTitle);
});
setBlogPostData(blogPost[0]);
} catch (error) {
console.error(error);
setBlogPostData(null);
}
};
fetchBlogPostData();
}, [postTitle]);

return (
<div className='blog-post'>
{blogPostData ? (
blogPostData.children.map((child) => {
let nodeType = child.name.toUpperCase();
if (nodeType === 'SUMMARY') {
const summaryData = child.children.map((c) => c.value);
return (
<div key={nodeType}>
<div className='post-image'>
<img src={summaryData[0]} alt='Blog post summary' />
</div>
<h4>{nodeType}:</h4>
<span>{summaryData[1]}</span>
</div>
);
} else {
return (
<div key={nodeType} className='post-data'>
<h4 style={{marginBottom:'10px'}}>{child.name}:</h4>
<span style={{marginTop:'23px'}}>{child.value}</span>
</div>
);
}
})
) : (
<div className='loader'>
<span className='loader__element'></span>
<span className='loader__element'></span>
<span className='loader__element'></span>
<span className="loader__element"></span>
</div>
)}
</div>
);
};

export default XMLRes;





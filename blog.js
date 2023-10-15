
const blogDetail = document.querySelector('.blog-detail');

// Get the blog post ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

let docRef = db.collection("blogs").doc(blogId);
docRef.get().then((doc) => {
    setupBlog(doc.data());
})
const setupBlog = (data) => {
   
    const blogTitle = document.querySelector('.title');
    
    const titleTag = document.querySelector('title');
    const article = document.querySelector('.article');
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    article.innerHTML+=article.innerHTML=data.article;
}
  
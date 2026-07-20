// Sample blogs data
let blogs = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        content: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
        author: "John Doe"
    },
    {
        id: 2,
        title: "Understanding Express.js",
        content: "A comprehensive guide to building web applications using Node.js and Express framework.",
        author: "Jane Smith"
    }
];

// Load blogs from localStorage if available
function loadBlogs() {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
        blogs = JSON.parse(storedBlogs);
    }
}

// Save blogs to localStorage
function saveBlogs() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Render blogs on the home page
function renderBlogs() {
    const blogsContainer = document.querySelector('.blogs-container');
    if (!blogsContainer) return;

    blogsContainer.innerHTML = '';

    blogs.forEach(blog => {
        const article = document.createElement('article');
        article.innerHTML = `
            <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <p><small>Author: ${blog.author}</small></p>
        `;
        blogsContainer.appendChild(article);
    });
}

// Delete a blog
function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
        blogs = blogs.filter(blog => blog.id !== id);
        saveBlogs();
        renderBlogs();
    }
}

// Form validation and submission
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const title = form.querySelector('#blog-title');
    const author = form.querySelector('#author-name');
    const content = form.querySelector('#blog-content');

    // Reset error states
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    let isValid = true;

    // Validate title
    if (!title.value.trim()) {
        showError(title, 'Blog title is required');
        isValid = false;
    } else if (title.value.trim().length < 3) {
        showError(title, 'Blog title must be at least 3 characters');
        isValid = false;
    }

    // Validate author
    if (!author.value.trim()) {
        showError(author, 'Author name is required');
        isValid = false;
    } else if (author.value.trim().length < 2) {
        showError(author, 'Author name must be at least 2 characters');
        isValid = false;
    }

    // Validate content
    if (!content.value.trim()) {
        showError(content, 'Blog content is required');
        isValid = false;
    } else if (content.value.trim().length < 10) {
        showError(content, 'Blog content must be at least 10 characters');
        isValid = false;
    }

    if (!isValid) return;

    // Create new blog
    const newBlog = {
        id: Date.now(),
        title: title.value.trim(),
        content: content.value.trim(),
        author: author.value.trim()
    };

    // Add to blogs array
    blogs.push(newBlog);
    saveBlogs();

    // Clear form
    form.reset();

    // Show success message
    alert('Blog published successfully!');

    // Redirect to home page
    window.location.href = '/';
}

// Show error message
function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    input.classList.add('error');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadBlogs();

    // Check if we're on the home page
    if (document.querySelector('.blogs-container')) {
        renderBlogs();
    }

    // Check if we're on the add blog page
    const addBlogForm = document.querySelector('.add-blog form');
    if (addBlogForm) {
        addBlogForm.addEventListener('submit', handleFormSubmit);
    }
});

// Make deleteBlog available globally
window.deleteBlog = deleteBlog;

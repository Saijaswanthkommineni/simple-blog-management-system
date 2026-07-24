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

// =========================================
// FORM VALIDATION FUNCTIONS
// =========================================

// Validate blog title
function validateTitle(titleInput, showSuccessState = false) {
    const value = titleInput.value.trim();
    const errorElement = titleInput.parentElement.querySelector('.error');
    
    // Clear previous error
    clearError(titleInput);
    
    // Check if empty
    if (!value) {
        showError(titleInput, 'Blog title is required');
        return false;
    }
    
    // Check minimum length
    if (value.length < 5) {
        showError(titleInput, 'Blog title must be at least 5 characters');
        return false;
    }
    
    // Check maximum length
    if (value.length > 100) {
        showError(titleInput, 'Blog title must not exceed 100 characters');
        return false;
    }
    
    // Valid - only show success state if explicitly requested
    if (showSuccessState) {
        showSuccess(titleInput);
    }
    return true;
}

// Validate author name
function validateAuthor(authorInput, showSuccessState = false) {
    const value = authorInput.value.trim();
    const errorElement = authorInput.parentElement.querySelector('.error');
    
    // Clear previous error
    clearError(authorInput);
    
    // Check if empty
    if (!value) {
        showError(authorInput, 'Author name is required');
        return false;
    }
    
    // Check minimum length
    if (value.length < 3) {
        showError(authorInput, 'Author name must be at least 3 characters');
        return false;
    }
    
    // Check letters and spaces only
    const lettersAndSpacesOnly = /^[a-zA-Z\s]+$/.test(value);
    if (!lettersAndSpacesOnly) {
        showError(authorInput, 'Author name must contain only letters and spaces');
        return false;
    }
    
    // Valid - only show success state if explicitly requested
    if (showSuccessState) {
        showSuccess(authorInput);
    }
    return true;
}

// Validate blog content
function validateContent(contentInput, showSuccessState = false) {
    const value = contentInput.value.trim();
    const errorElement = contentInput.parentElement.querySelector('.error');
    
    // Clear previous error
    clearError(contentInput);
    
    // Check if empty
    if (!value) {
        showError(contentInput, 'Blog content is required');
        return false;
    }
    
    // Check minimum length
    if (value.length < 30) {
        showError(contentInput, 'Blog content must be at least 30 characters');
        return false;
    }
    
    // Valid - only show success state if explicitly requested
    if (showSuccessState) {
        showSuccess(contentInput);
    }
    return true;
}

// Show error message
function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.setAttribute('aria-live', 'polite');
    }
    input.classList.remove('success', 'valid');
    input.classList.add('error', 'invalid');
}

// Show success state
function showSuccess(input) {
    const errorElement = input.parentElement.querySelector('.error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    input.classList.remove('error', 'invalid');
    input.classList.add('success', 'valid');
}

// Clear error and success states
function clearError(input) {
    const errorElement = input.parentElement.querySelector('.error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    input.classList.remove('error', 'invalid', 'success', 'valid');
}

// Clear all form errors
function clearAllErrors(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        clearError(input);
    });
}

// Clear form
function clearForm(form) {
    form.reset();
    clearAllErrors(form);
}

// =========================================
// FORM SUBMISSION HANDLER
// =========================================

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const titleInput = form.querySelector('#blog-title');
    const authorInput = form.querySelector('#author-name');
    const contentInput = form.querySelector('#blog-content');

    // Validate all fields with success state enabled
    const isTitleValid = validateTitle(titleInput, true);
    const isAuthorValid = validateAuthor(authorInput, true);
    const isContentValid = validateContent(contentInput, true);

    // Check if all fields are valid
    if (!isTitleValid || !isAuthorValid || !isContentValid) {
        return;
    }

    // Create new blog
    const newBlog = {
        id: Date.now(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        author: authorInput.value.trim()
    };

    // Add to blogs array
    blogs.push(newBlog);
    saveBlogs();

    // Clear form
    clearForm(form);

    // Show success message
    displaySuccessMessage('Blog submitted successfully!');

    // Remove success message after 3 seconds
    setTimeout(() => {
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
    }, 3000);
}

// Display success message
function displaySuccessMessage(message) {
    const form = document.querySelector('.add-blog form');
    if (!form) return;

    // Remove existing success message if any
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.setAttribute('aria-live', 'polite');

    // Insert before the form
    form.parentElement.insertBefore(successDiv, form);
}

// =========================================
// REAL-TIME VALIDATION
// =========================================

function setupRealTimeValidation() {
    const form = document.querySelector('.add-blog form');
    if (!form) return;

    const titleInput = form.querySelector('#blog-title');
    const authorInput = form.querySelector('#author-name');
    const contentInput = form.querySelector('#blog-content');

    // Add input event listeners for real-time validation
    titleInput.addEventListener('input', () => {
        if (titleInput.value.trim()) {
            validateTitle(titleInput, false); // Don't show success state while typing
        } else {
            clearError(titleInput);
        }
    });

    authorInput.addEventListener('input', () => {
        if (authorInput.value.trim()) {
            validateAuthor(authorInput, false); // Don't show success state while typing
        } else {
            clearError(authorInput);
        }
    });

    contentInput.addEventListener('input', () => {
        if (contentInput.value.trim()) {
            validateContent(contentInput, false); // Don't show success state while typing
        } else {
            clearError(contentInput);
        }
    });
}

// =========================================
// INITIALIZATION
// =========================================

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
        setupRealTimeValidation();
    }
});

// Make deleteBlog available globally
window.deleteBlog = deleteBlog;

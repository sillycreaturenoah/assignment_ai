document.addEventListener('DOMContentLoaded', function() {
    // Mock profile data for each user
    const mockProfiles = {
        '@alice': {
            username: '@alice',
            displayName: 'Alice Johnson',
            profilePic: 'https://via.placeholder.com/100x100/818fb4/f5e8c7?text=Alice',
            banner: 'https://via.placeholder.com/400x150/818fb4/f5e8c7?text=Alice+Banner',
            previousPosts: [
                { content: 'My first post!', time: '3 days ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=Post+1' },
                { content: 'Another post about coding.', time: '5 days ago', image: 'https://via.placeholder.com/200x150/435585/f5e8c7?text=Post+2' },
                { content: 'Check out my new project!', time: '1 week ago', image: 'https://via.placeholder.com/200x150/363062/f5e8c7?text=Post+3' }
            ]
        },
        '@bob': {
            username: '@bob',
            displayName: 'Bob Smith',
            profilePic: 'https://via.placeholder.com/100x100/435585/f5e8c7?text=Bob',
            banner: 'https://via.placeholder.com/400x150/435585/f5e8c7?text=Bob+Banner',
            previousPosts: [
                { content: 'Just posted a new photo!', time: '2 days ago', image: 'https://via.placeholder.com/200x150/435585/f5e8c7?text=Photo+1' },
                { content: 'Working on a new design.', time: '4 days ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=Design' }
            ]
        },
        '@charlie': {
            username: '@charlie',
            displayName: 'Charlie Brown',
            profilePic: 'https://via.placeholder.com/100x100/363062/f5e8c7?text=Charlie',
            banner: 'https://via.placeholder.com/400x150/363062/f5e8c7?text=Charlie+Banner',
            previousPosts: [
                { content: 'Just finished a marathon coding session.', time: '1 day ago', image: 'https://via.placeholder.com/200x150/363062/f5e8c7?text=Coding+Session' },
                { content: 'Time to relax and watch some movies!', time: '2 days ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=Movies' }
            ]
        },
        '@diana': {
            username: '@diana',
            displayName: 'Diana Prince',
            profilePic: 'https://via.placeholder.com/100x100/818fb4/f5e8c7?text=Diana',
            banner: 'https://via.placeholder.com/400x150/818fb4/f5e8c7?text=Diana+Banner',
            previousPosts: [
                { content: 'Exploring the world of AI and machine learning.', time: '2 days ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=AI+Future' },
                { content: 'The future is here!', time: '3 days ago', image: 'https://via.placeholder.com/200x150/435585/f5e8c7?text=Future' }
            ]
        },
        '@eve': {
            username: '@eve',
            displayName: 'Eve Adams',
            profilePic: 'https://via.placeholder.com/100x100/435585/f5e8c7?text=Eve',
            banner: 'https://via.placeholder.com/400x150/435585/f5e8c7?text=Eve+Banner',
            previousPosts: [
                { content: 'Just tried out a new recipe for vegan lasagna.', time: '3 days ago', image: 'https://via.placeholder.com/200x150/435585/f5e8c7?text=Vegan+Lasagna' },
                { content: 'It turned out amazing!', time: '4 days ago', image: 'https://via.placeholder.com/200x150/363062/f5e8c7?text=Amazing' }
            ]
        },
        '@frank': {
            username: '@frank',
            displayName: 'Frank Castle',
            profilePic: 'https://via.placeholder.com/100x100/363062/f5e8c7?text=Frank',
            banner: 'https://via.placeholder.com/400x150/363062/f5e8c7?text=Frank+Banner',
            previousPosts: [
                { content: 'Hiking in the mountains this weekend.', time: '4 days ago', image: 'https://via.placeholder.com/200x150/363062/f5e8c7?text=Mountain+Hike' },
                { content: 'Nature is the best therapy.', time: '5 days ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=Nature' }
            ]
        },
        '@grace': {
            username: '@grace',
            displayName: 'Grace Hopper',
            profilePic: 'https://via.placeholder.com/100x100/818fb4/f5e8c7?text=Grace',
            banner: 'https://via.placeholder.com/400x150/818fb4/f5e8c7?text=Grace+Banner',
            previousPosts: [
                { content: 'Started learning how to play the guitar.', time: '1 week ago', image: 'https://via.placeholder.com/200x150/818fb4/f5e8c7?text=Learning+Guitar' },
                { content: 'It is harder than it looks!', time: '2 weeks ago', image: 'https://via.placeholder.com/200x150/435585/f5e8c7?text=Hard' }
            ]
        }
    };

    // Extract the logged-in user's username from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user') || 'User';

    // Update the username in the banner and profile card
    document.getElementById('username-display').textContent = username;
    document.getElementById('profile-username').textContent = username;

    // Modal functionality
    const modal = document.getElementById('post-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Open modal when a post is clicked
    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('click', (e) => {
            // Don't open modal if an action button was clicked
            if (e.target.closest('.action-btn')) {
                return;
            }

            const author = post.querySelector('.post-author').textContent;
            const time = post.querySelector('.post-time').textContent;
            const content = post.querySelector('.post-content p').textContent;
            const image = post.querySelector('.post-content img');
            const imageSrc = image ? image.src : '';

            // Set modal content
            modal.querySelector('.modal-post-author').textContent = author;
            modal.querySelector('.modal-post-time').textContent = time;
            modal.querySelector('.modal-post-text').textContent = content;

            const modalImage = modal.querySelector('.modal-post-image');
            if (imageSrc) {
                modalImage.src = imageSrc;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            // Set profile sidebar content
            const profile = mockProfiles[author];
            if (profile) {
                modal.querySelector('.modal-profile-username').textContent = profile.displayName;
                modal.querySelector('.modal-profile-pic').src = profile.profilePic;
                modal.querySelector('.modal-profile-banner-img').src = profile.banner;

                // Clear previous posts
                const previousPostsContainer = modal.querySelector('.modal-previous-posts-container');
                previousPostsContainer.innerHTML = '';

                // Add previous posts
                profile.previousPosts.forEach(prevPost => {
                    const postElement = document.createElement('div');
                    postElement.className = 'modal-previous-post';
                    postElement.innerHTML = `
                        <p>${prevPost.content}</p>
                        <span class="modal-previous-post-time">${prevPost.time}</span>
                        ${prevPost.image ? `<img src="${prevPost.image}" alt="Previous Post" class="modal-previous-post-image">` : ''}
                    `;
                    previousPostsContainer.appendChild(postElement);
                });
            }

            // Show modal
            modal.style.display = 'block';
        });
    });

    // Close modal when the close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Copy link functionality for all copy link buttons
    document.querySelectorAll('.copy-link-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering post click
            const postUrl = window.location.href;
            navigator.clipboard.writeText(postUrl)
                .then(() => {
                    // Visual feedback: Show a checkmark temporarily
                    const originalContent = button.innerHTML;
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    setTimeout(() => {
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy link. Please try again.');
                });
        });
    });
});
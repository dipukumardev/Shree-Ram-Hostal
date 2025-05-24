console.log('Welcome to Our Hostel Website');

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const toggle = otherItem.querySelector('.faq-toggle i');
                        if (toggle) toggle.className = 'fas fa-plus';
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                const toggle = item.querySelector('.faq-toggle i');
                if (toggle) {
                    toggle.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
                }
            });
        });
    }

    // Testimonial Slider Auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.children;
        const slideWidth = testimonials[0].offsetWidth + 30; // Width + gap

        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonialSlider.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Branch Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const branchCards = document.querySelectorAll('.branch-card');
    
    if (filterBtns.length > 0 && branchCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Show/hide branch cards based on filter
                branchCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'grid';
                    } else {
                        const categories = card.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            card.style.display = 'grid';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                    
                    // Add animation for visible cards
                    if (card.style.display === 'grid') {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    }
                });
            });
        });
    }
    
    // Virtual Tour Modal
    const virtualTourBtns = document.querySelectorAll('.virtual-tour-btn');
    const virtualTourModal = document.getElementById('virtualTourModal');
    
    if (virtualTourBtns.length > 0 && virtualTourModal) {
        const modalContent = virtualTourModal.querySelector('.modal-content');
        const closeModal = virtualTourModal.querySelector('.close-modal');
        const tourContent = virtualTourModal.querySelector('.tour-content');
        
        // Tour content for each branch
        const tourData = {
            main: {
                title: 'Main Branch - City Center',
                content: `
                    <div class="tour-gallery">
                        <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" alt="Reception">
                        <div class="tour-thumbnails">
                            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Reception" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Dining" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Recreation" class="tour-thumb">
                        </div>
                    </div>
                    <div class="tour-description">
                        <h3>About Main Branch</h3>
                        <p>Our flagship branch located in the heart of the city offers premium accommodation with all modern amenities. The branch features spacious rooms, a large dining hall, dedicated study areas, and recreation facilities.</p>
                        <p>Take a virtual walk through our facilities and experience the comfort and convenience we offer to our residents.</p>
                        <h4>Nearby Landmarks:</h4>
                        <ul>
                            <li>Central Market - 0.5 km</li>
                            <li>City Hospital - 1 km</li>
                            <li>Central Park - 0.8 km</li>
                            <li>Shopping Mall - 0.3 km</li>
                        </ul>
                    </div>
                `
            },
            university: {
                title: 'University Branch',
                content: `
                    <div class="tour-gallery">
                        <img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" alt="Building">
                        <div class="tour-thumbnails">
                            <img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Building" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Dorm Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Study Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Common Area" class="tour-thumb">
                        </div>
                    </div>
                    <div class="tour-description">
                        <h3>About University Branch</h3>
                        <p>Located near the university campus, this branch is specially designed for students. It features a large library, study rooms, and a vibrant community space for students to interact and collaborate.</p>
                        <p>Our university branch is known for its academic environment and supportive community.</p>
                        <h4>Nearby Educational Institutions:</h4>
                        <ul>
                            <li>Main University Campus - 0.3 km</li>
                            <li>Engineering College - 0.7 km</li>
                            <li>Medical College - 1.2 km</li>
                            <li>University Library - 0.5 km</li>
                        </ul>
                    </div>
                `
            },
            techpark: {
                title: 'Tech Park Branch',
                content: `
                    <div class="tour-gallery">
                        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" alt="Building">
                        <div class="tour-thumbnails">
                            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Building" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Private Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Kitchen" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Workspace" class="tour-thumb">
                        </div>
                    </div>
                    <div class="tour-description">
                        <h3>About Tech Park Branch</h3>
                        <p>Our Tech Park branch caters primarily to working professionals in the IT sector. It offers modern amenities, co-working spaces, high-speed internet, and a fitness center to help maintain work-life balance.</p>
                        <p>The branch is designed to provide a comfortable living environment for busy professionals.</p>
                        <h4>Nearby Tech Companies:</h4>
                        <ul>
                            <li>Tech Innovation Hub - 0.2 km</li>
                            <li>Software Technology Park - 0.5 km</li>
                            <li>IT Services Complex - 0.8 km</li>
                            <li>Digital Solutions Center - 1 km</li>
                        </ul>
                    </div>
                `
            },
            luxury: {
                title: 'Riverside Luxury Branch',
                content: `
                    <div class="tour-gallery">
                        <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" alt="Exterior">
                        <div class="tour-thumbnails">
                            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Premium Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Swimming Pool" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Gym" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Dining" class="tour-thumb">
                        </div>
                    </div>
                    <div class="tour-description">
                        <h3>About Riverside Luxury Branch</h3>
                        <p>Our premium offering, the Riverside Luxury Branch, provides an upscale living experience with top-notch amenities including a swimming pool, premium gym, gourmet dining, and elegantly furnished rooms.</p>
                        <p>Enjoy a luxurious lifestyle with scenic views of the riverside and premium services.</p>
                        <h4>Nearby Attractions:</h4>
                        <ul>
                            <li>Riverside Park - 0.1 km</li>
                            <li>Luxury Shopping District - 0.5 km</li>
                            <li>Fine Dining Street - 0.3 km</li>
                            <li>Art Gallery - 0.7 km</li>
                        </ul>
                    </div>
                `
            },
            business: {
                title: 'Business District Branch',
                content: `
                    <div class="tour-gallery">
                        <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80" alt="Exterior">
                        <div class="tour-thumbnails">
                            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Conference Room" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Business Center" class="tour-thumb">
                            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=100&q=80" alt="Dining" class="tour-thumb">
                        </div>
                    </div>
                    <div class="tour-description">
                        <h3>About Business District Branch</h3>
                        <p>Located in the heart of the business district, this branch caters to business professionals and executives. It features a business center, conference facilities, and comfortable accommodations.</p>
                        <p>The perfect place for those who need to stay connected to the business world.</p>
                        <h4>Nearby Business Facilities:</h4>
                        <ul>
                            <li>Financial District - 0.3 km</li>
                            <li>Corporate Towers - 0.5 km</li>
                            <li>Convention Center - 0.8 km</li>
                            <li>Business Hub - 0.2 km</li>
                        </ul>
                    </div>
                `
            }
        };
        
        // Open modal with appropriate content
        virtualTourBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const branch = btn.getAttribute('data-branch');
                if (branch && tourData[branch]) {
                    modalContent.querySelector('h2').textContent = tourData[branch].title;
                    tourContent.innerHTML = tourData[branch].content;
                    virtualTourModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                    
                    // Add click event to thumbnails
                    const thumbnails = tourContent.querySelectorAll('.tour-thumb');
                    const mainImage = tourContent.querySelector('.tour-gallery > img');
                    if (thumbnails.length > 0 && mainImage) {
                        thumbnails.forEach(thumb => {
                            thumb.addEventListener('click', () => {
                                mainImage.src = thumb.src.replace('w=150&h=100', 'w=800&h=500');
                                mainImage.alt = thumb.alt;
                            });
                        });
                    }
                }
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                virtualTourModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close modal when clicking outside of content
        virtualTourModal.addEventListener('click', (e) => {
            if (e.target === virtualTourModal) {
                virtualTourModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We will contact you shortly.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial, .team-member, .value-card, .contact-card, .branch-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial, .team-member, .value-card, .contact-card, .branch-card, .stat-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
// FAQ Toggle Function
function toggleFaq(element) {
   const answer = element.nextElementSibling;
   const isActive = answer.classList.contains('active');
   
   // Close all FAQ items
   document.querySelectorAll('.faq-answer').forEach(item => {
       item.classList.remove('active');
   });
   document.querySelectorAll('.faq-question').forEach(item => {
       item.classList.remove('active');
   });
   
   // Toggle current item if it wasn't active
   if (!isActive) {
       answer.classList.add('active');
       element.classList.add('active');
   }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();
       document.querySelector(this.getAttribute('href')).scrollIntoView({
           behavior: 'smooth'
       });
   });
});

// Add scroll effect to pricing cards
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           entry.target.style.animationPlayState = 'running';
       }
   });
}, observerOptions);

document.querySelectorAll('.pricing-card, .addon-card, .faq-item').forEach(card => {
   observer.observe(card);
});

// Button click animations with WhatsApp integration
document.querySelectorAll('.cta-button').forEach(button => {
   button.addEventListener('click', function(e) {
       e.preventDefault();
       
       // Create ripple effect
       const ripple = document.createElement('span');
       const rect = this.getBoundingClientRect();
       const size = Math.max(rect.width, rect.height);
       const x = e.clientX - rect.left - size / 2;
       const y = e.clientY - rect.top - size / 2;
       
       ripple.style.cssText = `
           position: absolute;
           border-radius: 50%;
           transform: scale(0);
           animation: ripple 0.6s linear;
           background: rgba(255, 255, 255, 0.6);
           width: ${size}px;
           height: ${size}px;
           left: ${x}px;
           top: ${y}px;
           pointer-events: none;
       `;
       
       this.style.position = 'relative';
       this.style.overflow = 'hidden';
       this.appendChild(ripple);
       
       setTimeout(() => {
           ripple.remove();
       }, 600);
       
       // WhatsApp integration
       const card = this.closest('.pricing-card');
       const planName = card.querySelector('.plan-name').textContent;
       const planPrice = card.querySelector('.plan-price').textContent;
       
       // Create WhatsApp message
       const message = `Hello Eksu Laundry! 

I'd like to place an order:
📦 Plan: ${planName}
💰 Price: ${planPrice} per load

Please let me know the next steps for pickup and delivery.

Thank you!`;
       
       // Your WhatsApp number (replace with your actual number)
       const whatsappNumber = "2348147356424"; // Replace with your number
       
       // Create WhatsApp URL
       const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
       
       // Open WhatsApp
       window.open(whatsappURL, '_blank');
   });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
   @keyframes ripple {
       to {
           transform: scale(4);
           opacity: 0;
       }
   }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.getElementById('typed-text');
    const fullText = "A 4th Year Information Technology Student.";
    
    if (!typedTextElement) return;
    
    let currentIndex = 0;
    let isDeleting = false;
    let speed = 100;
    
    function animateText() {
        
        typedTextElement.textContent = fullText.substring(0, currentIndex);
        
        if (!isDeleting && currentIndex < fullText.length) {
            
            currentIndex++;
            speed = 80 + Math.random() * 40; 
        } else if (isDeleting && currentIndex > 0) {
            
            currentIndex--;
            speed = 50; 
        }
        
        
        if (!isDeleting && currentIndex === fullText.length) {
            
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentIndex === 0) {
            
            speed = 500;
            isDeleting = false;
        }
        
        setTimeout(animateText, speed);
    }
    
    setTimeout(animateText, 1000);
});
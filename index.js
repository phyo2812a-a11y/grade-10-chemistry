/*const homelink=document.querySelector('nav a[href="#Lesson"]');
const homepanel=document.querySelector('#Lesson');
const animateitems=homepanel.querySelectorAll(".animated-fadeup,.animated-fadeleft,.animated-faderight ");

homelink.addEventListener("click",()=>{
    
    animateitems.forEach((item)=>{
        item.style.animation="none";
    });

    void homepanel.offsetWidth;

    animateitems.forEach((item)=>{
        item.style.animation="";
    });

});*/
const animationselector=".animated-fadeup,.animated-fadeleft,.animated-faderight ";
document.querySelectorAll('nav a[href^="#"]' ).forEach((link)=>{
        link.addEventListener("click", ()=> { 
            const panel=document.querySelector(link.getAttribute("href"));
            if(!panel) return;
            const animateitems=panel.querySelectorAll(animationselector);

                animateitems.forEach((item)=>{
                     item.style.animation="none";
                });
                void panel.offsetWidth;
                 animateitems.forEach((item)=>{
                 item.style.animation="";
                 });
        });
    });
document.addEventListener("DOMContentLoaded", function() {
    const fadeups = document.querySelectorAll('.lesson-card.fadeup');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeups.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", function() {
    const fadeups = document.querySelectorAll('.qa-card.fadeup');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeups.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", function() {
    const fadeups = document.querySelectorAll('.about-single-card.fadeup');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeups.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", function() {
    const fadeups = document.querySelectorAll('.mat-card.fadeup');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeups.forEach(el => observer.observe(el));
});
  function openPdfModal() {
            const modal = document.getElementById('pdfModal');
            const iframe = document.getElementById('pdfFrame');
            iframe.src = 'tb.pdf';
            modal.classList.add('active');
        }

        function closePdfModal() {
            const modal = document.getElementById('pdfModal');
            const iframe = document.getElementById('pdfFrame');
            modal.classList.remove('active');
            iframe.src = '';
        }

        window.onclick = function(event) {
            const modal = document.getElementById('pdfModal');
            if (event.target === modal) {
                closePdfModal();
            }
        }
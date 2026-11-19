document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. خلفية النجوم المتحركة (Canvas)
    // ==========================================
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = [];
        const starCount = (width * height) / 3000; // كثافة النجوم

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.3 + 0.1, // سرعة بطيئة جداً
                alpha: Math.random(),
                alphaSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            // حركة نجوم ببطء نحو الأسفل
            star.y += star.speed;
            if (star.y > height) {
                star.y = 0;
                star.x = Math.random() * width;
            }

            // تأثير الوميض
            star.alpha += star.alphaSpeed;
            if (star.alpha > 1 || star.alpha < 0.2) {
                star.alphaSpeed = -star.alphaSpeed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(drawStars);
    }

    initCanvas();
    drawStars();
    
    window.addEventListener('resize', () => {
        initCanvas();
    });

    // ==========================================
    // 2. أنيميشن GSAP مع ScrollTrigger
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    // أنيميشن الـ Hero (عند التحميل)
    const heroTl = gsap.timeline();
    heroTl.from('.gsap-hero', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('.gsap-hero-p', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .from('.gsap-hero-btn', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    // أنيميشن العناوين
    gsap.utils.toArray('.gsap-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // أنيميشن الكروت (المميزات والتقييمات)
    gsap.utils.toArray('.gsap-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15, // تأخير بسيط لكل كارت
            ease: 'power3.out'
        });
    });

    // أنيميشن قسم التواصل
    gsap.from('.gsap-contact', {
        scrollTrigger: {
            trigger: '.gsap-contact',
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // ==========================================
    // 3. تمرير ناعم للروابط
    // ==========================================
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
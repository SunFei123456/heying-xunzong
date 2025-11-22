// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 仅在存在对应元素时初始化动画
    if (document.querySelector('.hero')) initHeroAnimation();
    initNavbarEffect();
    if (document.querySelector('.section-classroom')) initClassroomAnimation();
    if (document.querySelector('.section-routes')) initRoutesAnimation();
    if (document.querySelector('.section-goods')) initGoodsAnimation();
    if (document.querySelector('.section-community')) initCommunityAnimation();
});

// 1. 首屏进场动画
function initHeroAnimation() {
    const tl = gsap.timeline();

    // 背景图缩放效果
    tl.to("#hero-bg", {
        scale: 1,
        duration: 2,
        ease: "power2.out"
    })
    // 副标题上浮
    .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1.5")
    // 主标题上浮
    .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.8")
    // 按钮出现
    .to(".hero-cta", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
    }, "-=0.5");

    // 视差滚动效果 (Parallax)
    gsap.to("#hero-bg", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 200, // 背景图向下移动，产生视差
        scale: 1.1
    });
}

// 2. 导航栏滚动变色/隐藏效果
function initNavbarEffect() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动添加背景
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3. 鹤韵课堂板块动画
function initClassroomAnimation() {
    // 标题部分动画
    gsap.from(".section-title > *", {
        scrollTrigger: {
            trigger: ".section-classroom",
            start: "top 80%", // 当元素顶部到达视口 80% 处触发
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2, // 依次触发
        ease: "power3.out"
    });

    // 卡片部分动画
    gsap.from(".card", {
        scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out"
    });
}

// 4. 鹤游线路动画
function initRoutesAnimation() {
    const rows = gsap.utils.toArray('.route-row');
    
    rows.forEach((row, i) => {
        const isReverse = row.classList.contains('reverse');
        
        // 图片进场
        gsap.from(row.querySelector('.route-img'), {
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
            },
            x: isReverse ? 100 : -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // 内容进场
        gsap.from(row.querySelector('.route-content'), {
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
            },
            x: isReverse ? -50 : 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out"
        });
    });
}

// 5. 鹤乡好物动画
function initGoodsAnimation() {
    gsap.from(".good-card", {
        scrollTrigger: {
            trigger: ".goods-grid",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // 快速交错出现
        ease: "back.out(1.7)"
    });
}

// 6. 鹤友社群动画
function initCommunityAnimation() {
    gsap.from(".wall-item", {
        scrollTrigger: {
            trigger: ".community-wall",
            start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: {
            amount: 1,
            from: "center" // 从中间向四周扩散
        },
        ease: "elastic.out(1, 0.5)"
    });
}

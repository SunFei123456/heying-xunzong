// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 仅在存在对应元素时初始化动画
    if (document.querySelector('.hero')) initHeroAnimation();
    initNavbarEffect();
    if (document.querySelector('.section-classroom')) initClassroomAnimation();
    if (document.querySelector('.section-routes')) {
        initRoutesAnimation();
        initSpotModal(); // 初始化景区弹窗
        initBookingModal(); // 初始化行程预约
    }
    if (document.querySelector('.section-goods')) {
        initGoodsAnimation();
        initGoodsTabs(); // 初始化商品Tab切换
        initGoodsModal(); // 初始化商品弹窗
        initPreorderModal(); // 初始化预购弹窗
    }
    if (document.querySelector('.section-community')) {
        initCommunityAnimation();
        initCommunityTabs(); // 初始化社区Tab切换
    }
});

// 行程预约弹窗逻辑
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const form = document.getElementById('booking-form');
    const itemInput = document.getElementById('booking-item');
    const dateInput = document.getElementById('booking-date');
    const peopleInput = document.getElementById('booking-people');
    const phoneInput = document.getElementById('booking-phone');
    const noteInput = document.getElementById('booking-note');
    const successTip = document.getElementById('booking-success');
    const closeBtn = modal.querySelector('.modal-close');
    const routeBtns = document.querySelectorAll('.book-route-btn');
    const spotBtns = document.querySelectorAll('.spot-book-btn');

    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.min = today;
    }

    const openModal = (label) => {
        itemInput.value = label;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        successTip.style.display = 'none';
        form.style.display = 'flex';
        if (dateInput) dateInput.value = today;
        if (peopleInput) peopleInput.value = 2;
        if (phoneInput) phoneInput.value = '';
        if (noteInput) noteInput.value = '';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    [...routeBtns, ...spotBtns].forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.type || '行程';
            const title = btn.dataset.title || '';
            openModal(`${type}｜${title}`);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        successTip.style.display = 'block';
        setTimeout(closeModal, 1800);
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 商品预购弹窗逻辑
function initPreorderModal() {
    const modal = document.getElementById('preorder-modal');
    if (!modal) return;

    const productInput = document.getElementById('preorder-product');
    const phoneInput = document.getElementById('preorder-phone');
    const noteInput = document.getElementById('preorder-note');
    const form = document.getElementById('preorder-form');
    const successTip = document.getElementById('preorder-success');
    const closeBtn = modal.querySelector('.modal-close');
    const preorderBtns = document.querySelectorAll('.pre-order-btn');

    const openModal = (productName) => {
        productInput.value = productName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        successTip.style.display = 'none';
        form.style.display = 'block';
        phoneInput.value = '';
        noteInput.value = '';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    preorderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productName = btn.dataset.name || '鹤乡好物';
            openModal(productName);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        successTip.style.display = 'block';
        setTimeout(closeModal, 1800);
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

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
    // 遍历所有模块进行动画设置
    const modules = gsap.utils.toArray('.section-module');

    modules.forEach(module => {
        // 标题部分动画
        gsap.from(module.querySelectorAll('.module-header > *'), {
            scrollTrigger: {
                trigger: module,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });

        // 视频卡片动画
        gsap.from(module.querySelectorAll('.video-card'), {
            scrollTrigger: {
                trigger: module.querySelector('.video-grid'),
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
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
    // 鹤望景区动画
  
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

// 商品 Tab 切换逻辑
function initGoodsTabs() {
    const tabs = document.querySelectorAll('.goods-tabs span');
    const cards = document.querySelectorAll('.good-card');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. 切换 active 状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. 获取筛选值
            const filter = tab.getAttribute('data-filter');

            // 3. 筛选卡片
            let delay = 0;
            cards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    // 显示
                    card.classList.remove('hidden');
                    card.style.display = 'block'; // 确保显示
                    // 简单的显示动画
                    gsap.fromTo(card, 
                        { opacity: 0, y: 20 }, 
                        { opacity: 1, y: 0, duration: 0.4, delay: delay, ease: "power2.out" }
                    );
                    delay += 0.05; // 增加交错延迟
                } else {
                    // 隐藏
                    card.classList.add('hidden');
                    card.style.display = 'none'; // 配合 CSS 确保隐藏
                }
            });
            
            // 重新触发 ScrollTrigger
            ScrollTrigger.refresh();
        });
    });
}

// 商品详情弹窗逻辑
function initGoodsModal() {
    const modal = document.getElementById('goods-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('goods-modal-title');
    const modalImg = document.getElementById('goods-modal-img');
    const modalDesc = document.getElementById('goods-modal-desc');
    const modalPrice = document.getElementById('goods-modal-price');
    const closeBtn = modal.querySelector('.modal-close');
    const goodCards = document.querySelectorAll('.good-card');

    // 打开弹窗
    goodCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        // 点击卡片本身打开
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            const imgSrc = card.querySelector('.good-img-box img').src;
            const price = card.querySelector('.price').textContent;
            // 获取隐藏的完整描述，如果没有则回退到简短描述
            const fullDesc = card.querySelector('.full-desc') ? card.querySelector('.full-desc').innerHTML : card.querySelector('.desc').textContent;

            modalTitle.textContent = title;
            modalImg.src = imgSrc;
            modalDesc.innerHTML = fullDesc; // 使用 innerHTML 支持 HTML 标签
            modalPrice.textContent = price;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭弹窗函数
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 绑定关闭事件
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 景区详情弹窗逻辑
function initSpotModal() {
    const modal = document.getElementById('spot-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    const spotCards = document.querySelectorAll('.spot-card');

    // 打开弹窗
    spotCards.forEach(card => {
        card.style.cursor = 'pointer'; // 添加手型光标
        
        card.addEventListener('click', (event) => {
            if (event.target.closest('.spot-book-btn')) {
                return;
            }
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('.spot-desc').textContent;
            
            modalTitle.textContent = title;
            modalDesc.textContent = desc; // 获取完整文本
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });
    });

    // 关闭弹窗函数
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    };

    // 绑定关闭事件
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // 点击遮罩层关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 6. 鹤友社群动画
function initCommunityAnimation() {
    gsap.from(".note-card", {
        scrollTrigger: {
            trigger: ".masonry-grid",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// 社区 Tab 切换逻辑
function initCommunityTabs() {
    const tabs = document.querySelectorAll('.topic-btn');
    const cards = document.querySelectorAll('.note-card:not(.join-card)'); // 排除加入卡片

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. 切换 active 状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. 获取筛选值
            const filter = tab.getAttribute('data-filter');

            // 3. 筛选卡片
            let delay = 0;
            cards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    // 显示卡片
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    
                    // 简单的显示动画
                    gsap.fromTo(card, 
                        { opacity: 0, y: 20 }, 
                        { opacity: 1, y: 0, duration: 0.4, delay: delay, ease: "power2.out" }
                    );
                    delay += 0.05; // 增加交错延迟
                } else {
                    // 隐藏卡片
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            
            // 重新触发 ScrollTrigger
            ScrollTrigger.refresh();
        });
    });
}

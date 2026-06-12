document.addEventListener("DOMContentLoaded", function () {
    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    // ==========================================
    // 💡 1. Lenis 스무스 스크롤 (관성 효과) 초기화 추가
    // ==========================================
    const lenis = new Lenis({
        duration: 1.5, // 스크롤이 뒤따라오는 시간 (숫자가 클수록 더 무겁고 미끄러짐)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 쫀득한 감속 이징
        smoothWheel: true, // 마우스 휠 스무스 켜기
    });

    // Lenis의 스크롤 위치값을 GSAP ScrollTrigger와 완벽하게 동기화
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 1. OPEN NOTEBOOK 버튼 클릭 시 부드러운 스크롤 이동
    const openBtn = document.getElementById("openNotebookBtn");
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: "#about",
                ease: "power3.inOut", // 쫀득하게 감속되는 이징 효과
            });
        });
    }

    // 2. 우측 탭 메뉴 클릭 시 해당 섹션으로 이동
    const menuTabs = document.querySelectorAll(".book-tabs a");
    menuTabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault(); // a 태그의 뚝뚝 끊기는 기본 이동 방지
            const target = this.getAttribute("href");
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power3.inOut",
            });
        });
    });

    // 3. (보너스) 스크롤을 내리면 노트 내용이 스르륵 떠오르는 등장 효과
    const sections = document.querySelectorAll("section:not(.main)");
    sections.forEach((section) => {
        const innerContent = section.querySelector(".inner");
        if (innerContent) {
            gsap.from(innerContent, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%", // 섹션이 화면의 75% 지점에 도달할 때 실행
                    toggleActions: "play none none reverse",
                },
                y: 50, // 50px 아래에서
                opacity: 0, // 투명했다가
                duration: 1.2, // 1.2초 동안
                ease: "power2.out", // 부드럽게 올라옴
            });
        }
    });
});

$(document).ready(function(){
    // Swiper part
    if($(".rockSwiper").length > 0){
        var rockSwiper = new Swiper(".rockSwiper", {
            slidesPerView: "auto",
            spaceBetween: 30,
            navigation: {
              nextEl: ".rock_right",
              prevEl: ".rock_left",
            },
            breakpoints: {
                1200: {
                    slidesPerView: "auto",
                    spaceBetween: 48,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 48,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            }
        });
    }
    if($(".partnersSwiper").length > 0){
        var partnersSwiper = new Swiper(".partnersSwiper", {
            slidesPerView: 1,
            spaceBetween: 13,
            navigation: {
              nextEl: ".partnersSwiperNext",
              prevEl: ".partnersSwiperPrev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        });
    }
    
    // hamburger
    $(".hamurger_menu").on('click',function(e){
        e.preventDefault();
        $(".header_menus").addClass("active")
        $("body").addClass("modal_open")
        $(".modal_overlay").addClass("active")
    })
    
    $(".close").on('click',function(e){
        e.preventDefault();
        $(".header_menus").removeClass("active")
        $("body").removeClass("modal_open")
        $(".modal_overlay").removeClass("active")
    })


    // Home sahifasidagi research_work section ichidagi card uchun scroll
    if($(".scroll_card_body").length > 0){
        let $scrollBody = $(".scroll_card_body");
        let $customScroll = $(".custom_scrollbar");
        let $thumb = $(".scroll_thumb");
        function updateThumb() {
            let contentHeight = $scrollBody[0].scrollHeight;
            let visibleHeight = $scrollBody.height();
            let thumbHeight = Math.max((visibleHeight / contentHeight) * visibleHeight, 50);
            
            $thumb.css({ height: thumbHeight });
        }
        updateThumb(); 
        $scrollBody.on("scroll", function () {
            let scrollTop = $(this).scrollTop();
            let maxScroll = $scrollBody[0].scrollHeight - $scrollBody.height();
            let maxThumbTop = $customScroll.height() - $thumb.height();
            let thumbTop = (scrollTop / maxScroll) * maxThumbTop;
    
            $thumb.css({ top: thumbTop });
        });
        let isDragging = false;
        let startY, startThumbTop;
        $thumb.on("mousedown", function (e) {
            isDragging = true;
            startY = e.clientY;
            startThumbTop = parseFloat($thumb.css("top")) || 0;
            $("body").addClass("no-select");
        });
        $(document).on("mousemove", function (e) {
            if (!isDragging) return;
    
            let deltaY = e.clientY - startY;
            let maxThumbTop = $customScroll.height() - $thumb.height();
            let newThumbTop = Math.min(Math.max(startThumbTop + deltaY, 0), maxThumbTop);
    
            let maxScroll = $scrollBody[0].scrollHeight - $scrollBody.height();
            let newScrollTop = (newThumbTop / maxThumbTop) * maxScroll;
    
            $thumb.css({ top: newThumbTop });
            $scrollBody.scrollTop(newScrollTop);
        });
        $(document).on("mouseup", function () {
            isDragging = false;
            $("body").removeClass("no-select");
        });
        let observer = new MutationObserver(function () {
            updateThumb();
        });
        observer.observe($scrollBody[0], { childList: true, subtree: true });
    
    }
    
    // Partners integrations card show more
    if($('.partners_card').length > 0){
        $(".partners_card:nth-child(n+4)").hide();

        $(".show_more").click(function () {
            $(".partners_card:hidden").each(function (index) {
                $(this).delay(index * 200).fadeIn(400).css({
                    opacity: 1,
                    transform: "translateY(0)"
                });
            });
    
            $(this).fadeOut(); 
        });
    }

    // position steps
    function positionSteps() {
        if (window.innerWidth < 769) {
            return; // 768 va undan kichik ekranlarda hech narsa qilmaydi
        }

        var $stepsContainer = $(".steps");
        if ($stepsContainer.length === 0) {
            return;
        }

        var $steps = $stepsContainer.children().toArray();
        var leftColumn = [];
        var rightColumn = [];
        var mid = Math.ceil($steps.length / 2);

        $.each($steps, function (index, step) {
            if (index < mid) {
                leftColumn.push(step);
            } else {
                rightColumn.push(step);
            }
        });

        $stepsContainer.empty();
        for (var i = 0; i < mid; i++) {
            if (leftColumn[i]) $stepsContainer.append(leftColumn[i]);
            if (rightColumn[i]) $stepsContainer.append(rightColumn[i]);
        }
    }

    // Sahifa yuklanganda ishlaydi
    positionSteps();

    // Ekran o'lchami o'zgarganda qayta ishlaydi
    $(window).on("resize", function () {
        positionSteps();
    });
});
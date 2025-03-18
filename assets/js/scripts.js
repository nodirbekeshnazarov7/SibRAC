$(document).ready(function(){
    // Swiper part
    var rockSwiper = new Swiper(".rockSwiper", {
        slidesPerView: "auto",
        spaceBetween: 48,
        navigation: {
          nextEl: ".rock_right",
          prevEl: ".rock_left",
        },
      });
    var partnersSwiper = new Swiper(".partnersSwiper", {
        slidesPerView: 3,
        spaceBetween: 13,
        navigation: {
          nextEl: ".partnersSwiperNext",
          prevEl: ".partnersSwiperPrev",
        },
      });
    
    // hamburger
    $(".hamurger_menu").on('click',function(e){
        e.preventDefault();
        $(".header_menus").addClass("active")
    })
    
    $(".close").on('click',function(e){
        e.preventDefault();
        $(".header_menus").removeClass("active")
    })


    // Home sahifasidagi research_work section ichidagi card uchun scroll
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
});
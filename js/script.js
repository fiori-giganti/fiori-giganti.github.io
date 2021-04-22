
document.addEventListener('DOMContentLoaded', (event) => {
   const menuBtn = document.querySelector(".menu__toggler-btn");
   if(menuBtn){
      const menuBody = document.querySelector(".menu__body");
      const header = document.querySelector(".header__menu");
      menuBtn.addEventListener('click', function(){
         menuBody.classList.toggle('active');
         menuBtn.classList.toggle('active');
         document.body.classList.toggle('no-scroll');         
      });
      
   }

   // tabs FAQ 

   let tabParent = document.querySelector('#FAQ');
   let tabsFAQ = document.querySelectorAll('.faq-block__item'); 
   let tabContent = document.querySelectorAll('.faq-block__content-item');

   tabParent.addEventListener('click', function(e){
      if (e.target && e.target.tagName == 'H3' || e.target && e.target.classList.contains('faq-block__item')){
         tabsFAQ.forEach(function(item, i){
            if (e.target == item || e.target.parentNode == item){
               tabContent[i].classList.add('active');
               item.classList.add('active');
            }
            else{
               tabContent[i].classList.remove('active');
               item.classList.remove('active');
            }
         });
      }  
   });
   // ---tabsFAQ
   //swipper
   let swiperConfig = {
      lazy: true,

      //стрілки
      navigation:{
         nextEl: '.controls__right',
         prevEl: '.controls__left'
      },
      // pagination:{
      //    el: '.swiper-pagination',
      //    // clickable: true,
      //    // dynamicBullets: true,
      //    type: 'progressbar',
         
      // },
      slidesPerView: 'auto',
      spaceBetween: 15,
      simulateTouch: true,
      // grabCursor: true,
      autoHeight: true,
      freeMode: true,

      //автопрокрутка
      // autoplay:{
      //    delay: 2000,
      //    stopOnLastSlide: true,
      //    disableOnInteraction: true,
      // },
      speed: 800,
   };
   const swipers = document.querySelectorAll('.category__gallery');
   let swiperSliders = [];

   swipers.forEach((item) => {
      swiperSliders.push( new Swiper(item, swiperConfig));
   });

   //gallery
   const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      zoomable: true,
  });

   const galleryBtns = document.querySelectorAll('.category__btn'),
         categDescBlocks = document.querySelectorAll('.category__desc'), 
         galleryWrappers = document.querySelectorAll('.category__gallery .swiper-wrapper');

   galleryBtns.forEach((item, i)=>{
      item.addEventListener('click', function(event){
         if (event.target.classList.contains('collapsed')) {
            galleryWrappers[i].classList.remove('galleryMode');
            event.target.classList.remove('collapsed');
            categDescBlocks[i].classList.remove('show');
            swiperSliders[i] = new Swiper(swipers[i], swiperConfig);
            event.target.innerHTML = 'Mostra di più';
         }
         else{
            swiperSliders[i].destroy(true, true);
            galleryWrappers[i].classList.add('galleryMode');
            event.target.innerHTML = 'Mostra di meno';
            event.target.classList.add('collapsed');
            categDescBlocks[i].classList.add('show');

         }
      });
   });
});
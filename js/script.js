document.addEventListener('DOMContentLoaded', (event) => {

   const menuBtn = document.querySelector(".menu__toggler-btn");
   if(menuBtn){
      const menuBody = document.querySelector(".menu__body");
      const header = document.querySelector(".header__menu");
      menuBtn.addEventListener('click', function(){
         menuBody.classList.toggle('active');
         menuBtn.classList.toggle('active');
         document.body.classList.toggle('no-scroll');         
         document.querySelector("html").classList.toggle('no-scroll');     
         contacts = document.querySelector("#navToOrder");
         contacts.addEventListener('click', function(e){
            menuBody.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');         
            document.querySelector("html").classList.remove('no-scroll');
         }); 
      });
      
   }
   
   /** FAQ */
   const faqTabsContainer  = document.querySelector('.faq-block__tabs-wrapper.swiper-container'),
         faqContentContainer = document.querySelector('.faq-block__content-wrapper.swiper-container');


   let faqTabsSwiper = new Swiper(faqTabsContainer, {
      
      breakpoints: {
         // when window width is >= 320px
         slidesPerView: 'auto',
         watchSlidesVisibility: true,
         watchSlidesProgress: true,
         220: {
         slidesPerView: 'auto',

         spaceBetween: 20,
         centeredSlides: true,

         },
         
         576: {
         slidesPerView: 4,
         simulateTouch: true,

         }
      }
   
   });

   let faqContentSwiper =  new Swiper(faqContentContainer,{
      slidesPerView:    1,
      spaceBetween: 15,
      simulateTouch: true,
      
      speed: 800,
      thumbs: {
         swiper: faqTabsSwiper
      }
   });

   if(window.matchMedia('(max-width: 576px)').matches){
      faqContentSwiper.thumbs.swiper = '';
      faqTabsSwiper.controller.control = faqContentSwiper;
      faqContentSwiper.controller.control = faqTabsSwiper;
   }


   function swiperConfig (controlsLeft, controlsRight){
      return {
         lazy: true,

         navigation:{
            nextEl: controlsRight,
            prevEl: controlsLeft
         },
      
         slidesPerView: 'auto',
         spaceBetween: 15,
         simulateTouch: true,
         autoHeight: true,
         freeMode: true,

         // autoplay:{
         //    delay: 2000,
         //    stopOnLastSlide: true,
         //    disableOnInteraction: true,
         // },
         speed: 800,
      };
   }

   let swiperSliders = [];
   const categories = document.querySelectorAll('.assortment__category');
   const galleryBtns = document.querySelectorAll('.category__btn'),
         categDescBlocks = document.querySelectorAll('.category__desc'); 
         


   const lazySwipers = document.querySelectorAll('.assortment__category');

   let windowHeight = document.documentElement.clientHeight;
   let lazySwipersPositions = [];

   if(lazySwipers.length>0){
      lazySwipers.forEach(item =>{
         lazySwipersPositions.push(item.getBoundingClientRect().top + pageYOffset);
         
         lazyScrollCheck();
      });
   }

   window.addEventListener('scroll', lazyScroll);

   function lazyScroll(){
      lazyScrollCheck();
   }

   function lazyScrollCheck(){
      let swiperIndex = lazySwipersPositions.findIndex(item=>pageYOffset > item - windowHeight);
      if(swiperIndex>=0){
         let gallery = lazySwipers[swiperIndex].querySelector('.category__gallery');
         const prevPhoto = lazySwipers[swiperIndex].querySelector('.controls__left'),
               nextPhoto = lazySwipers[swiperIndex].querySelector('.controls__right');

         swiperSliders.push( new Swiper(gallery, swiperConfig(prevPhoto, nextPhoto)));
         
      
         delete lazySwipersPositions[swiperIndex];
      }
   
   }

   categories.forEach((item, i) => {
      
      let gallery = item.querySelector('.category__gallery.swiper_'+(i+1));
      const prevPhoto = item.querySelector('.controls__left'),
            nextPhoto = item.querySelector('.controls__right');

      let config = swiperConfig(prevPhoto, nextPhoto);
      swiperSliders.push( new Swiper(gallery,config));
      
      prevPhoto.addEventListener('click', () => {
         swiperSliders[i].slidePrev();
       });
      nextPhoto.addEventListener('click', () => {
         swiperSliders[i].slideNext();
       });
   });

   //gallery
   const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      zoomable: true,
   });

   galleryBtns.forEach((item, i)=>{
      item.addEventListener('click', function(event){
         if (event.target.classList.contains('collapsed')) {
            categories[i].querySelector('.swiper-wrapper').classList.remove('galleryMode');
            event.target.classList.remove('collapsed');
            categDescBlocks[i].classList.remove('show');
            swiperSliders[i] = new Swiper(categories[i].querySelector('.category__gallery'), swiperConfig(item.previousElementSibling, item.nextElementSibling));
            item.nextElementSibling.classList.remove('d-none');
            item.previousElementSibling.classList.remove('d-none');
            event.target.innerHTML = 'Mostra di più';
         }
         else{
            swiperSliders[i].destroy(true, true);
            categories[i].querySelector('.swiper-wrapper').classList.add('galleryMode');
            event.target.innerHTML = 'Mostra di meno';
            event.target.classList.add('collapsed');
            item.nextElementSibling.classList.add('d-none');
            item.previousElementSibling.classList.add('d-none');

            categDescBlocks[i].classList.add('show');

         }
      });
   });


  


   





});
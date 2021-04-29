document.addEventListener('DOMContentLoaded', (event) => {

   if ( window.navigator.language.slice(0, 2) !== "it" ) {
      let langBtn = document.querySelector('.lang-toggler-btn');

      langBtn.classList.remove('d-none');      
   }

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
         document.querySelector("#navToFAQ").addEventListener('click', function(e){
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
   updateOnWindowResize: true,
   
   breakpoints: {
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      220: {
      slidesPerView: 'auto',

      centeredSlides: true,
      },
      
      576: {
      slidesPerView: 4,
      centeredSlides: false,
      simulateTouch: true,
      }
   }

});
let faqContentSwiper =  new Swiper(faqContentContainer,{
   updateOnWindowResize: true,
   slidesPerView:    1,
   spaceBetween: 15,
   simulateTouch: true,
   autoHeight: true,
   speed: 800,
   thumbs: {
      swiper: faqTabsSwiper
   }
});

   function updateSwipers(){
      

      if(window.matchMedia('(max-width: 576px)').matches){
         faqContentSwiper.thumbs.swiper = '';
         faqTabsSwiper.controller.control = faqContentSwiper;
         faqContentSwiper.controller.control = faqTabsSwiper;
      }
      faqContentSwiper.update();
      faqTabsSwiper.update();
      faqContentSwiper.updateAutoHeight();
      faqTabsSwiper.init();
      

      faqContentSwiper.init();
   
   }
   updateSwipers();


   window.addEventListener('resize', updateSwipers);
   window.addEventListener('deviceorientation ', updateSwipers);

  

   

   function swiperConfig (controlsLeft, controlsRight){
      return {
      updateOnWindowResize: true,
      lazy: true,

      initialSlide: 0,
      navigation:{
         nextEl: controlsRight,
         prevEl: controlsLeft
      },
      
      slidesPerView: 'auto',
      spaceBetween: 15,
      simulateTouch: true,
      freeMode: true,
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

            categories[i].querySelector('.swiper-wrapper').classList.remove('galleryMode' ,'swiper-no-swiping');
            event.target.classList.remove('collapsed');
            categDescBlocks[i].classList.remove('show');
            swiperSliders[i] = new Swiper(categories[i].querySelector('.category__gallery'), swiperConfig(item.previousElementSibling, item.nextElementSibling));
            item.nextElementSibling.classList.remove('d-none');
            item.previousElementSibling.classList.remove('d-none');

            let url = window.location.href.toString();
            if (url.includes('en')){
               event.target.innerHTML = 'show more';
            }else{
               event.target.innerHTML = 'Mostra di più';
            }
         }
         else{
            swiperSliders[i].translateTo(0);
            swiperSliders[i].destroy(true, false);

            categories[i].querySelector('.swiper-wrapper').classList.add('galleryMode', 'swiper-no-swiping');

            let url = window.location.href.toString();
            if (url.includes('en')){
               event.target.innerHTML = 'show less';
            }else{
               event.target.innerHTML = 'Mostra di meno';
            }
            event.target.classList.add('collapsed');

            item.nextElementSibling.classList.add('d-none');
            item.previousElementSibling.classList.add('d-none');

            categDescBlocks[i].classList.add('show');

         }
      });
   });


});
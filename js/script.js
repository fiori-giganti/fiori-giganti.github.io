/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', (event) => {
   
   let submitted = false;
   if ( window.navigator.language.slice(0, 2) !== "it" ) {
      let langBtn = document.querySelector('.lang-toggler-btn');

      langBtn.classList.remove('d-none');      
   }
   /* mobile menu toggler */

   const menuBtn = document.querySelector(".menu__toggler-btn");
   const menuBody = document.querySelector(".menu__body");
   const header = document.querySelector(".header__menu");

   if(menuBtn){
      menuBtn.addEventListener('click', function(){
         menuBody.classList.toggle('active');
         menuBtn.classList.toggle('active');
         document.body.classList.toggle('no-scroll');         
         document.querySelector("html").classList.toggle('no-scroll');     
         
      });
   }  
   /* adding anchor links */
   const navLinks = document.querySelectorAll('.nav-item.menu__link.nav-to');
   navLinks.forEach(anchor=>{
      anchor.addEventListener('click', function(e){
         
         const blockID = e.currentTarget.getAttribute('data-goto');

         let url = window.location.pathname;
         if(blockID){
            window.history.replaceState(null, null, url + '#' +blockID);
         }

         let scrollElement = document.getElementById(blockID);
         
         if (scrollElement){
            const gotoBlockValue = scrollElement.getBoundingClientRect().top + pageYOffset; 
            if (menuBody.classList.contains('active')){
               
               menuBody.classList.remove('active');
               menuBtn.classList.remove('active');
               document.body.classList.remove('no-scroll');         
               document.querySelector("html").classList.remove('no-scroll');
            }
            if(scrollElement.classList.contains('faq-block__item')){
               let numSlide = +scrollElement.getAttribute('aria-label').slice(0,1);
               faqTabsSwiper.slideTo(numSlide-1, 500, false);
               faqContentSwiper.slideTo(numSlide-1, 500, false);
   
            }
            
         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
         
         }     
   });
});

const dropdownClick = document.querySelector('#menuCollapseBtn');
const menuDropdown = document.querySelector('.menu__dropdown');
dropdownClick.addEventListener('click', (e)=>{
   e.preventDefault();
   menuDropdown.classList.toggle('active');
   menuDropdown.querySelector('.menu__dropdown-menu').classList.toggle('menu__collapsed');
});
   
   
   
   /** FAQ */
   const faqTabsContainer  = document.querySelector('.faq-block__tabs-wrapper.swiper-container'),
   faqContentContainer = document.querySelector('.faq-block__content-wrapper.swiper-container');
let faqTabsSwiper = new Swiper(faqTabsContainer, {
   updateOnWindowResize: true,
   
   breakpoints: {
     
      220: {
      slidesPerView: 2.5,

      centeredSlides: true,
      },
      576:{
         slidesPerView: 4,
         centeredSlides: false,
         simulateTouch: true,
      },
      768:{
         slidesPerView: 5,
         centeredSlides: false,
         simulateTouch: true,
         watchOverflow: true,
      },
      992: {
      slidesPerView: 5,     
      watchOverflow: true,

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

if (window.location.hash ){
   let hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
   
   let scrollElement = document.getElementById(hash);
   if (scrollElement){
      const gotoBlockValue = scrollElement.getBoundingClientRect().top + pageYOffset; 
      if(scrollElement.classList.contains('faq-block__item')){          
         let numSlide = +scrollElement.getAttribute('aria-label').slice(0,1);
         faqTabsSwiper.slideTo(numSlide-1, 500, false);
         faqContentSwiper.slideTo(numSlide-1, 500, false);
      }
      window.scrollTo({
         top: gotoBlockValue,
         behavior: 'smooth'
      });
   }
      
}

faqContentSwiper.on('slideChangeTransitionEnd', function() {
   const activeSlide = document.querySelector('.faq-block__content-item.swiper-slide-active');
   const blockID = activeSlide.getAttribute('data-category');
   
   let url = window.location.pathname;
   if(blockID){
      window.history.replaceState(null, null, url + '#' +blockID);
   }
});

   function updateSwipers(){
   
      if(window.matchMedia('(max-width: 576px)').matches){
         faqContentSwiper.thumbs.swiper = '';
         faqTabsSwiper.controller.control = faqContentSwiper;
         faqContentSwiper.controller.control = faqTabsSwiper;
      }
      faqContentSwiper.update();
      faqContentSwiper.updateProgress();
      faqTabsSwiper.update();
      faqTabsSwiper.updateProgress();

      faqContentSwiper.updateAutoHeight();   
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

   const modal = document.querySelector('.modal');

   modal.addEventListener('shown.bs.modal', function(){
      document.body.classList.add('no-scroll');         
      document.querySelector("html").classList.add('no-scroll');   
   });

   modal.addEventListener('hidden.bs.modal', function(){
      document.body.classList.remove('no-scroll');         
      document.querySelector("html").classList.remove('no-scroll'); 
      updateReviewsData();
   });

   function updateReviewsData(){
      fetch('https://spreadsheets.google.com/feeds/list/1t8DhYNRz-Rep57GsiKeW37_2VwNZsveJFt2iEq-N9LU/1/public/values?alt=json')
      .then(response => response.json())
      .then(result => {
         let data = result.feed.entry;
         let reviews = [];
         data.forEach(function(row, i){
            let dateString = (row["gsx$date"]["$t"]).slice(0, 10);
            const review = {
               name: row["gsx$name"]["$t"],
               rating:  +row["gsx$rating"]["$t"],
               recommend: row["gsx$recomend"]["$t"],
               text: row["gsx$reviewtext"]["$t"],
               date: dateString,  
            };
            reviews.push(review);
         });
         return reviews;
      })
      .then((reviewsData) => {
         const reviewsParent  = document.querySelector('#reviewscontainer .swiper-wrapper');
         const defaultElement = document.querySelector('#reviewscontainer .swiper-wrapper .reviews__item.default');
         
         reviewsParent.innerHTML = '';
         
         reviewsParent.append(defaultElement);
         reviewsData.forEach(function(review){
            const reviewElement  = createReview(review);
            reviewsParent.prepend(reviewElement);
         });
         let html = document.documentElement;
         const rem = html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize);
         const reviewsTextElements  = document.querySelectorAll('.review .review__text');
         reviewsTextElements.forEach(elem=>{
            let elemHeight = window.getComputedStyle(elem).getPropertyValue('height');
            elemHeight = +elemHeight.slice(0, elemHeight.length -2);
            
            if (elemHeight >= (11 * rem)){
               elem.parentElement.classList.add('collapsed');
            }
            
         });

      }).then(updateReviewsSwiper)
      .catch(

      );
   }
   function updateReviewsSwiper(){
         const reviews = document.querySelector('#reviewscontainer');
         let reviewsSwiper =  new Swiper(reviews,{
            updateOnWindowResize: true,
            slidesPerView: 'auto',
            
            slideToClickedSlide: true,
            freeMode: true,
            freeModeSticky: true,
            simulateTouch: true,

            speed: 500,

            breakpoints: {
               200:{
                  centeredSlides: true,
               },
               576:{
                  centeredSlides: false,
               },
            },
            navigation: {
               nextEl: '.reviews__right',
               prevEl: '.reviews__left',
             },
         });
      
         const moreReviews = document.querySelectorAll('.review.collapsed');

         moreReviews.forEach((elem, i)=>{
            function showFullReview(e){
               
               elem.classList.toggle('show-full');
               

               if (elem.classList.contains('show-full')){
                  elem.parentElement.parentElement.classList.remove('col-sm-8',  'col-md-5', 'col-lg-4');
                  let url = window.location.href.toString();
                  if (url.includes('en')){
                     e.target.textContent = 'Collapse';
                  }else{
                     e.target.textContent = 'Crollo';
                  }
                  e.target.parentElement.height = ''; 
                  e.target.parentElement.parentElement.classList.add('swiper-slide-active'); 

                  e.target.parentElement.parentElement.parentElement.parentElement.style.height = '100%';
               }
               else{
                  elem.parentElement.parentElement.classList.add('col-sm-8',  'col-md-5', 'col-lg-4');
                  let url = window.location.href.toString();
                  if (url.includes('en')){
                     e.target.textContent = 'Read full';
                  }else{
                     e.target.textContent = 'Leggi per intero';
                  }
               }
             
               reviewsSwiper.update();
               reviewsSwiper.updateProgress();
               
               
            }
            elem.querySelector('.review__details').addEventListener('click', showFullReview);

         });
   }

   updateReviewsData();

   function createReview(reviewData){

      let rating = 'five';
      switch(reviewData.rating){
         case 1: rating = 'one'; break;
         case 2: rating = 'two'; break;
         case 3: rating = 'three'; break;
         case 4: rating = 'four'; break;
         default: rating = 'five';
      }

      let newReview = document.createElement('div');
      let url = window.location.href.toString();
      let fullBtn = '';

      if (url.includes('en')){
         fullBtn =  'Read full';
      }else{
         fullBtn =  'Leggi per intero';
      }
      newReview.classList.add('reviews__item','swiper-slide', 'col-10', 'col-sm-8',  'col-md-5', 'col-lg-4');
      newReview.innerHTML = `<div class="review__wrapper">
      <div class="review ">
            <div class="review__name">${reviewData.name}</div>
            <div class="review__rating">
               <div class="stars ${rating}">
                  <span class="stars__item one">★</span><span class="stars__item two">★</span><span class="stars__item three">★</span><span class="stars__item four">★</span><span class="stars__item five">★</span>
               </div>
               <span class="reccomend">${reviewData.recommend}</span>
            </div>
            <p class="review__text">
               ${reviewData.text}
            </p>
            <button class="review__details">${fullBtn}</button>
            <span class="review__date">${reviewData.date}</span>
      </div>   
   </div>`;

   return newReview;

   }

   window.addEventListener('resize', updateReviewsSwiper());
   window.addEventListener('deviceorientation ', updateReviewsSwiper());

});

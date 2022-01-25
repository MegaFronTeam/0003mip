(function() {

  $('#mainSliderPhotos').each(function (index) {
    particlesJS.load('particles-js-' + index, 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  })

  $('#mainSliderPhotos').slick({
    arrows: false,
    swipe: false,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: '#mainSliderNav'
  })

  $('#mainSliderNav').slick({
    arrows: false,
    swipe: false,
    asNavFor: '#mainSliderPhotos',
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })

  $('.mainSliderNav__arrow--prev').on('click', function () {
    let i = $('#mainSliderNav').slick('slickCurrentSlide')
    $('#mainSliderNav').slick('slickGoTo', i - 1)
  })

  $('.mainSliderNav__arrow--next').on('click', function () {
    let i = $('#mainSliderNav').slick('slickCurrentSlide')
    $('#mainSliderNav').slick('slickGoTo', i + 1)
  })

  $('#newsSlider').on('init', function(event, slick) {
    let dot = '<div class="newsSlider__dot"></div>'
    $('#newsSlider .newsSlider__slide').each(function (index) {
      $(this).find('.newsSlider__dots').html(dot.repeat(slick.slideCount))
      $(this).find('.newsSlider__dots').find('.newsSlider__dot').each(function (index) {
        $(this).click(function () {
          slick.slickGoTo(index)
        })
      })
    })
    highlightActiveDot(0, slick)
  })

  const highlightActiveDot = (currentSlide, slick) => {
    let i = currentSlide > slick.slideCount ? currentSlide - slick.slideCount : currentSlide
    $('#newsSlider').find('[data-slick-index="' + i + '"]').find('.newsSlider__dot').eq(i).addClass('newsSlider__dot--active')
  }

  $('#newsSlider').on('init reInit afterChange', function(event, slick, currentSlide){
    highlightActiveDot(currentSlide, slick)
  });

  $('#newsSlider').slick({
    arrows: true,
    nextArrow: $('#newsSliderNext'),
    prevArrow: $('#newsSliderPrev'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  })

  $('#partnersSlider').slick({
    arrows: true,
    slidesToShow: 4,
    nextArrow: $('#partnersSliderNext'),
    prevArrow: $('#partnersSliderPrev'),
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      }
    ]
  })

  $('.news__cards--js').slick({
    arrows: false,
    slidesToShow: 1,
    mobileFirst: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: 'unslick'
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  })

  $('.landingInfo__grid').slick({
    arrows: false,
    slidesToShow: 1,
    mobileFirst: true,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 620,
        settings: 'unslick'
      }
    ]
  })

  $('.landingInfo__textSubGrid').slick({
    arrows: false,
    slidesToShow: 2,
    variableWidth: true,
    mobileFirst: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  })

  $('.header__trigger').click(function () {
    $('.header').toggleClass('open')
    $('html').toggleClass('lock')
  })

  //waypoints
  let newsSliderWP = $('.newsSlider').waypoint({
    handler: function (dir) {
      $('.newsSlider').addClass('shown')
    },
    offset: '100%'
  })

  let landingInfoWP = $('.landingInfo').waypoint({
    handler: function (dir) {
      $('.landingInfo').addClass('shown')
    },
    offset: '90%'
  })



  let landingInfoTextWP = $('.landingInfo__textGrid').waypoint({
    handler: function (dir) {
      $('.landingInfo__textGrid').addClass('shown')
      const counters = document.querySelectorAll('.landingInfo__number');
      const time = 50;

      counters.forEach( counter => {
        const animate = () => {
          const value = +counter.getAttribute('data-number');
          const data = +counter.innerText;

          const increment = Math.ceil(value / time);

          if(data < value) {
            counter.innerText = Math.ceil(data + increment);
            setTimeout(animate, 1);
          } else {
            counter.innerText = value;
          }

        }
        animate();
      });
    },
    offset: '50%'
  })

  let promoWP = $('.promo').waypoint({
    handler: function (dir) {
      $('.promo').addClass('shown')
    },
    offset: '90%'
  })

  let landingInfoBgDesk = document.getElementsByClassName('landingInfo__bg--desktop')
  let landingInfoBgMob = document.getElementsByClassName('landingInfo__bg--mobile')
  let promoFg = document.getElementsByClassName('promo__imageFg')

  new simpleParallax(landingInfoBgDesk, {
    orientation: 'right',
    scale: 1.5
  })
  new simpleParallax(landingInfoBgMob, {
    orientation: 'right',
    scale: 1.5
  })
  new simpleParallax(promoFg, {
    delay: .6,
    scale: 1.6,
    transition: 'cubic-bezier(0,0,0,1)'
  })

})();

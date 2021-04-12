$(document).ready(function () {
    var viewPortWidth = $(window).width();
    // Content Load 
    $.ajax({url: "startuppitches.json", success: function(result){            
       
       // Common Var
        var common = result.webinar          
        var title = common.title
        document.title = title
        var tagLine = common.tagLine
        var date = common.date.slice(0, 10)
        var timeFrom = common.timeFrom
        var timeTo = common.timeTo
        var price = common.price
        var strikeThroughPrice = common.strikeThroughPrice
        var shortDescription = common.shortDescription 
        var description = common.description
        var whyThisWebinarContent = common.whyThisWebinarContent
        var additionalContentOneTitle = common.additionalContentOneTitle       
        var additionalContentOne = common.additionalContentOne
       // Mentor Var
       var mentorname = common.mentor.name
       var professionalTitle = common.mentor.professionalTitle
       var imageUrl = common.imageUrl
       var mentorimageUrl = common.mentor.imageUrl
       var mentorabout = common.mentor.about
       var mentorslug = common.mentor.slug
       // console.log(title);
        
         
        $("#content").html("<div class='product-sec'> <div class='product-left-block'> <div class='product-img'> <img class='w-100 border-radius' src='"+imageUrl+"'/> <div class='product-info box-shadow border-radius'> <div class='product-title'> <h1 class='heading1'>"+title+"</h1> <div class='price'><span class='old-price'>₹ "+strikeThroughPrice+"</span> <span class='new-price'>₹ "+price+"</span></div> </div> <div class='product-info-bottom'> <div class='product-info-bottom-left'> <ul class='labels'> <li><img src='dist/img/icon/user.svg'/>By "+mentorname+"</li> <li><img src='dist/img/icon/calendar.svg'/>"+date+"</li> <li><img src='dist/img/icon/clock.svg'/><span>"+timeFrom+"</span>AM to&nbsp;<span>"+timeTo+"</span> AM</li> </ul> </div> <div class='product-info-bottom-right'> <button class='btn theme-btn'>Book Now</button> </div> </div> </div> </div> <div class='description box-shadow border-radius'> <h3 class='heading1'>Brief Description</h3> <p>"+shortDescription+"</p> </div> </div> <div class='product-right-block'> <div class='user-profile box-shadow border-radius'> <a href='"+mentorslug+"'><img class='border-radius' src='"+mentorimageUrl+"'/></a> <h2 class='user-name'>"+mentorname+"</h2> <span>"+professionalTitle+"</span> <p> "+mentorabout+" </p> <ul> </ul> </div> </div> </div> <div class='overview-section'> <div class='overview-leftside'> <div class='box-shadow border-radius'> <h3 class='heading2'>Key Takeaways</h3> <ul> </ul> </div> </div> <div class='overview-rightside'> <div class='box-shadow border-radius'> <h3 class='heading2'>Course Overview</h3> <p>"+description+"</p> </div> </div> </div> <div class='video-section'> <div class='video-left-block'> <div class='box-shadow border-radius'> <img class='border-radius' src='"+imageUrl+"'/> <a class='videoBtn' onclick='togglePopup()'><img height='90' src='dist/img/icon/play.svg' /></a> <!-- div containing the popup --> <div class='content'> <div onclick='togglePopup()' class='close-btn'> × </div> <iframe height='500' src='https://www.youtube.com/embed/MxrYXeonfUM' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> </div> <div class='popup-overlay'></div> </div> </div> <div class='video-right-block'> <div class='box-shadow border-radius'> <h5 class='heading2'>Is this EMC for you?</h5> "+whyThisWebinarContent+" </div> </div> </div> <div class='about-section'> <div class='about-left'> <div class='border-radius box-shadow'> <h4 class='heading2'>"+additionalContentOneTitle+"</h4> <p> "+additionalContentOne+"</p> </div> </div> </div>");
       // Data of Key Takeaways content
        common.elaborateLearning.forEach(function(entry) {$(".overview-leftside ul").append("<li>"+entry+"</li>");});
        // Data of skills
        common.mentor.skills.forEach(function(entry) {$(".product-right-block ul").append("<li>"+entry+"</li>");});
       }});
    // Toggle Menu
    if (viewPortWidth < 1024) {
        $("#navbar-toggle").on('click', function (e) {
            $('.header-rightside').toggleClass('active');
            $('.menu-overlay').toggleClass('active');
            e.preventDefault();
        });
        $(".menu-overlay").on('click', function (e) {
            $('.header-rightside').toggleClass('active');
            $('.menu-overlay').toggleClass('active');
            e.preventDefault();
        });
        // Header Fixed
    
        var getHeaderHeight = $('header').outerHeight();
        var lastScrollPosition = 0;
        $('header').css('top', -getHeaderHeight);
        $(window).scroll(function () {
            var currentScrollPosition = $(window).scrollTop();
            if ($(window).scrollTop() > 1 * (getHeaderHeight)) {
                $('body').addClass('scrollActive').css('padding-top', getHeaderHeight);
                $('header').css('top', 0);
                if (currentScrollPosition < lastScrollPosition) {
                    $('header').css('top', -getHeaderHeight);
                }
                lastScrollPosition = currentScrollPosition;
            } else {
                $('body').removeClass('scrollActive').css('padding-top', 0);
            }
        });        
    }    
     // Rating
    $(".rating").on('click', function (e) {
        $(this).toggleClass('active');
        e.preventDefault();
    });

    // Menu    
    MainNav(); /* init Navigation */
    function MainNav() {
        $('.main_nav li a').on('click', function () {
            var thisAttr = $(this).attr('href');
            if ($(thisAttr).length) {
                var scrollPoint = $(thisAttr).offset().top - 10;
                $('body,html').animate({
                    scrollTop: scrollPoint
                }, 800);
            }
            return false;
        });
        /* One Page Active Class */
        var topLimit = 300,
            ultimateOffset = 200;

        $('.main_nav').each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                current = null,
                $findLinks = $this.find("a");

            function getHeader(top) {
                var last = $findLinks.first();
                if (top < topLimit) {
                    return last;
                }
                for (var i = 0; i < $findLinks.length; i++) {
                    var $link = $findLinks.eq(i),
                        href = $link.attr("href");

                    if (href.charAt(0) === "#" && href.length > 1) {
                        var $anchor = $(href).first();
                        if ($anchor.length > 0) {
                            var offset = $anchor.offset();
                            if (top < offset.top - ultimateOffset) {
                                return last;
                            }
                            last = $link;
                        }
                    }
                }
                return last;
            }

            $(window).on("scroll", function () {
                var top = window.scrollY,
                    height = $this.outerHeight(),
                    max_bottom = $parent.offset().top + $parent.outerHeight(),
                    bottom = top + height + ultimateOffset;

                var $current = getHeader(top);

                if (current !== $current) {
                    $this.find(".active").removeClass("active");
                    $current.addClass("active");
                    current = $current;
                }
            });
        });
    }
    // Owl Carousel Slider
    let slider = $('.coursesslide');
    slider.each(function () {
    $(this).owlCarousel({
    nav: false,
    loop:false,
    dots: false,
    pagination: false,
    margin: 25,
    autoHeight: false,
    stagePadding: 50,
    responsive:{
        0:{
            items: 1,
            margin: 30,
        },
        767:{
            items: 3,
        },
        1000:{
            items: 2,
        }
    }
    });
});  
});

 // Function to show and hide the popup
function togglePopup() {
    $(".content").toggle();
    $("#content").find('.popup-overlay').toggleClass('active');
}


$(document).ready(function(){ 
 

 pulse();

    /** Btn pulse animation **/
    function pulse() {
        $('.pulse').each(function () {
            var $this = $(this);
            var ink, d, x, y;

            setInterval(function () {
                if ($this.find(".ink").length === 0) {
                    $this.prepend("<span class='ink'></span>");
                }

                ink = $this.find(".ink");
                ink.removeClass("animate");

                if (!ink.height() && !ink.width()) {
                    d = Math.max($this.outerWidth(), $this.outerHeight());
                    ink.css({ height: d, width: d });
                }

                x = Math.round(Math.random() * ink.width() - ink.width() / 2);
                y = Math.round(Math.random() * ink.height() - ink.height() / 2);
                // y = 0;
                // x = e.pageX - $this.offset().left - ink.width()/2;
                // y = e.pageY - $this.offset().top - ink.height()/2;

                ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
            }, 1600);
        });
    };


$('.item-min__galery').owlCarousel({
    loop:true,
    margin: 10,
    nav:true,
  	items: 1,
  	navText: ['<i class="material-icons">keyboard_arrow_left</i>','<i class="material-icons">keyboard_arrow_right</i>']
})

$('.item__galery').owlCarousel({
    loop:true,
    nav:true,
    items: 1,
    autoWidth: true, 
    navText: ['<i class="material-icons">arrow_back</i>','<i class="material-icons">arrow_forward</i>']
})



$('.scroll').click( function(){
  var scroll_el = $(this).attr('href');
  if ($(scroll_el).length != 0) {
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
   }
  return false;
})


$('.item-min__list').on('click',function(e){
//  console.log($(this).data('parent'),$(this).data('target'));
  $parent = '#'+$(this).data('parent');
  $target = '.'+$(this).data('target');
  $title = '#'+$(this).data('title');
  $text   = $(this).text();

  $($title).text($text);
  $($parent).find('.item-min__text-item').removeClass('item-min__text-item--active');
  $($parent).find($target).addClass('item-min__text-item--active');

})


// Добавление товара в форму

$('.item-min__btn, .item__btn').on('click',function(e){
	$target = $(this).data('product');
	$price = $(this).data('pprice');
	$info = $target + " | " + $price +' руб.';
	$('.product_title').val($info); 
})


// Добавление товара в форму

$cur_product = '';
$ap_product = '';


$('.buy__btn').on('click',function(e){ 
   $target = $(this).data('product');
   $price = $(this).data('pprice');
   $cur_product = generateVal($target, $price);
   console.log($ap_product);
    console.log($cur_product)
})


// Добавление аксессуара

$('.ax__btn').on('click', function(e) {
  e.preventDefault();


  if($(this).hasClass('ax__btn--active')==false) {
    $(this).addClass('ax__btn--active');
    $(this).children('span').text('Добавлен');
    $(this).children('i').text('check')
  } else {
    $(this).removeClass('ax__btn--active');
    $(this).children('span').text('Добаить к заказу');
    $(this).children('i').text('add_shopping_cart')
  }

  $('.ax__btn').each(function( index ) { 
      $_n = '';
      if($(this).hasClass('ax__btn--active')){ 
        $target = $( this ).data('ax_name');
        $price = $( this ).data('ax_price'); 
        //console.log($target,$price)
        $_n += generateVal($target,$price);
        console.log($_n)
      }
    });
    
  console.log($('.product_title').val())
})

function generateVal($t, $p){
  return $t + " => " + $p + ' руб. |';
}


// WOW.JS
// new WOW().init();


/** START  Форма валидации*/



$("form").on("submit", function(e) {   
     var _def = false;
     var _email = false;
     var _full = false;
     var _phone = false;
 
     if($(this).hasClass('form__email')){  _email = true}
     if($(this).hasClass('form__phone')){  _phone = true}
     if($(this).hasClass('form__default')){  _def = true}
     if($(this).hasClass('form__full')){    _full = true}
      
     if(_def || _full || _phone){
        /* Проверка имени*/
      if(!_phone) {
        var er_msg = 'Укажите корректные ФИО.' 
      $("input[name=name]", this).val($.trim($("input[name=name]", this).val()));
        if (!$("input[name=name]", this).val()) {
            alert(er_msg);
            return false;
        } 
      }
   
    /* Проверка телефона*/
      var phone_val = $("input[name=phone]", this).val(); 
      var reg1 = new RegExp("[^0-9]*", "g"),
          reg2 = new RegExp("[^0-9-+ ()]", "g");
      var phone_txt = phone_val.replace(reg1, "");
      if (phone_val.search(reg2) != -1 || !phone_txt || phone_txt.length < 7) {
          var er_msg = 'Номер телефона может содержать только цифры, символы "+", "-", "(", ")" и пробелы.';
          var er_msg_2 ='В вашем телефоне слишком мало цифр.'

          alert(er_msg);
          alert(er_msg_2);
          return false;
      }else{
        return true;
      }

     }
  
     if(_email || _full){
  /* Проверка email*/
      var emailRegex = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$'; 
      var er_msg = 'Укажите корректный Email.';
      var email_val = $.trim($("input[name=email]", this).val()); 
      if (!email_val || !validateEmail(email_val)) {
          alert(er_msg);
          return false;
      }else{
        return true; 
      }
 
  }
 
  /*        
    */
    return false; 
});  


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/** валидация конец*/


});

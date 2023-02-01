// input에 focus가 in 됐을 때 
// 그것의 부모 .inputbox에게 .inputboxact 클래스를 준다. (border)
$("input").focusin(function(){
  $(this).parent('.inputbox').addClass('inputboxact');
})

// input에 focus가 out 됐을 때 
// 그것의 부모 .inputbox에게 .inputboxact 클래스를 없애준다. (border)
$("input").focusout(function(){
  // inputboxact 클래스를 remove
  $(this).parent('.inputbox').removeClass('inputboxact');
})

let idveri, pwveri, pwchkveri, nameveri, birthveri, genderveri, phoneveri, addressveri = false;
let mailveri = true;


// 아이디
// #userid input에서 focusout 됐을 때 그것의 글자수가 0이라면 (조건1)
// #userid .warn에 '필수 정보입니다.'라고 쓴다 (실행문1)

// len이 5보다 작거나 20보다 클 때 (조건2)  - 논리연산자 사용 or ||
// #userid .warn에 '5~20자의 영소문자만 사용 가능합니다.'라고 쓴다 (실행문1)
$("#userid input").focusout(function(){
  let len = $(this).val().length;
  idveri = false;
  if(len == 0) {
    $("#userid .warn").html('<span class="text-red">필수 정보입니다.</span>');
  } else if(len < 5 || len > 20) {
    $("#userid .warn").html('<span class="text-red">5~20자의 영소문자만 사용 가능합니다.</span>');
  } else {
    $("#userid .warn").html('<span class="text-green">멋진 아이디네요!</span>');
    idveri = true;
  }
})


// 비밀번호
// #userpw input에서 focusout 됐을 때 그것의 글자수가 0이라면 (조건1)
// #userpw .warn에 '필수 정보입니다.'라고 쓴다 (실행문1) .text-red 부여
$("#userpw input").focusout(function(){
  let len = $(this).val().length;
  pwveri = false;
  if(len == 0) {
    $("#userpw .warn").html('<span class="text-red">필수 정보입니다.</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_01.png");
    $("#userpw .inputbox span").empty();
  } else if(len < 8 || len > 16) {
    $("#userpw .warn").html('<span class="text-red">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>')
    $("#userpw .inputbox p").html('<span class="text-red">사용불가</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_10.png");
  } else {
    pwveri = true;
    // #userpw .warn안에 내용을 비운다 -> empty() 사용
    // #userpw .inputbox p 한테 '안전'이라는 글자를 보여준다
    // #userpw .inputbox img src 경로 -> images/m_icon_pw_step_04.png -> attr
    $("#userpw .warn").empty();
    $("#userpw .inputbox p").html('<span class="text-green">안전</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
  }
})

// 비밀번호 재확인
// #userpw-chk input 에서 focusout 됐을 때 value값의 length가 0이라면 (조건1)
// #userpw-chk .warn에 빨간 글씨로 "필수 정보입니다" (실행문1)
// #userpw-chk .inputbox img의 속성중에 src 경로 값을 변경 (실행문2)

// 그렇지 않다면 그것의 값과 #userpw input 안에 들어있는 값이 같은가? (조건2)
// pwchkveri 변수를 true로 변경 (실행문1)
// #userpw-chk .warn에 empty()로 비운다. (실행문2)
// #userpw-chk .inputbox img의 속성중에 src 값을 변경한다.->images/m_icon_pw_step_07.png

// 그렇지 않다면 else
// #userpw-chk .warn '비밀번호가 일치하지 않습니다.' (실행문1)
// #userpw-chk .inputbox img src -> images/m_icon_pw_step_02.png 변경
$("#userpw-chk input").focusout(function(){
  let userpwchk = $(this).val();
  pwchkveri = false;
  if(userpwchk.length == 0) {
    $("#userpw-chk .warn").html('<span class="text-red">필수 정보입니다.</span>');
    $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_02.png");
  } else if(userpwchk == $("#userpw input").val()) {
    pwchkveri = true;
    // remove / empty 
    // remove 요소 자체를 지우고 empty 요소 안 내용을 지운다.
    $("#userpw-chk .warn").empty();
    $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_07.png");
  } else {
    $("#userpw-chk .warn").html('<span class="text-red">비밀번호가 일치하지 않습니다.</span>');
    $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_02.png");
  }
})

// 이름
// #username input에서 focusout될 때
$("#username input").focusout(function(){
  let username = $("#username input").val();
  nameveri = false;
  // JS 정규 표현식 입력값을 체크
  // 형식 : /정규식/
  // 문자와 숫자가 아닌 것
  let reg = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;
  if (username.length == 0) {
    $("#username .warn").html('<span class="text-red">필수 정보입니다.</span>');
  } else if(reg.test(username)) {
    // 정규식을 만족하면 true 만족하지 않으면 false 반환
    $("#username .warn").html('<span class="text-red">한글과 영문 대 소문자를 사용하세요. (특수기호 사용 불가)</span>');
  } else {
    nameveri = true;
    $("#username .warn").empty();
  }
})

// 생년월일
// #year, #month, #date에서 focusout됐을 때 (실행할 함수)
// #year의 value length가 숫자 4가 아니라면(조건1)
// #birth .warn 빨간 글씨로 "태어난 년도 4자리를 정확하게 입력하세요"(실행문1)

// #month의 값이 비어있으면 (조건2)
// #birth .warn 빨간 글씨로 "태어난 월을 선택하세요."(실행문2)

// #date의 값이 비어있으면 (조건3)
// #birth .warn 빨간 글씨로 "태어난 일(날짜) 2자리를 정확하게 입력하세요"(실행문3)

// 만약 #year, #month, #date(연,월,일)의 값이 숫자가 아니라면(조건4) isNaN 사용
// #birth .warn 빨간 글씨로 "생년월일을 다시 확인해주세요"(실행문4)

// 올해 기준으로 나이가 100 초과라면 (조건5) 
// #birth .warn 빨간 글씨로 "정말이세요?"(실행문5)

// 매개변수(파라미터)사용
// 코드의 중복을 줄일 수 있다
function para(text) {
  $("#birth .warn").html('<span class="text-red">' + text + '</span>');
}

$("#year, #month, #date").focusout(function(){
  let year = $("#year").val();
  let month = $("#month").val();
  let date = $("#date").val();
  // 현재 날짜 및 시간
  let now = new Date();
  console.log(now);
  // Date 객체의 dateTime() 
  // 메서드 1970년 1월 1일 00시 00분 00초 UTC(세계표준시)를 기준으로 경과한 밀리초를 반환한다
  let nowstamp = now.getTime();
  // 현재 날짜 및 시간에서 현재 연도의 네 자릿값을 변수에 할당한다
  now = now.getFullYear();
  console.log(now);

  let birth = new Date(year, month, date);
  birth = birth.getTime();
  birthveri = false;

  // year.length가 4가 아닐때
  if(year.length != 4) {
    para("태어난 년도 4자리를 정확하게 입력하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 년도 4자리를 정확하게 입력하세요.</span>');
  } else if(month.length == 0) {
    para("태어난 월을 선택하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 월을 선택하세요.</span>');
  } else if(date.length == 0 || date >= 31 || date <= 0) {
    // #date 값이 비어있거나 date값이 31이상일 때 조건(조건3)
    // 논리연산자 사용(or) 두 조건 중 하나만 충족해도 실행문 실행
    para("태어난 일(날짜) 2자리를 정확하게 입력하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>');
  } else if(isNaN(year * month * date)) {
    para("생년월일을 다시 확인해주세요.");
    // $("#birth .warn").html('<span class="text-red">생년월일을 다시 확인해주세요.</span>');
  } else if(now - year > 100) {
    para("정말이세요?");
    // $("#birth .warn").html('<span class="text-red">정말이세요?</span>');
  } else if(nowstamp < birth) {
    para("미래에서 오셨군요^^");
    // $("#birth .warn").html('<span class="text-red">미래에서 오셨군요^^</span>');
  } else {
    birthveri = true;
    para();
    // $("#birth .warn").empty(); 
  }
})

// 성별
// #gender .inputbox를 클릭 했을때
$("#gender .inputbox").click(function(e) {
  // radio의 기본 클릭동작 해제
  e.preventDefault();
  $("#gender .inputbox").removeClass('btn-primary');
  $("#gender .inputbox").removeAttr('checked');
  // 내가 클릭하는 .inputbox한테 클래스, 속성 추가
  $(this).addClass('btn-primary');
  // 클릭된 .inputbox에게 자식 input 데려와
  $(this).children('input').attr('checked', 'checked');
  genderveri = true;
})

// 본인 확인 이메일(선택)
// #usermail input에서 focusout됐을 때
$("#usermail input").focusout(function(){
  let mail = $(this).val();
  let redExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  mailveri = true;
  if(mail.length == 0) {
    $("#usermail .warn").empty();
  } else if(!redExp.test(mail)) {
    $("#usermail .warn").html('<span class="text-red">이메일 주소를 다시 확인해주세요.</span>');
    mailveri = false;
  } else {
    $("#usermail .warn").empty();
  }
})

// 휴대전화
// #phonenum input에서 focusout 됐을 때
// 그것의 value.length가 0이라면(조건1)
// #phone .warn "필수 정보입니다."(실행문1)
$("#phonenum input").focusout(function(){
  if($(this).val().length == 0) {
    $("#phone .warn").html('<span class="text-red">필수 정보입니다.</span>');
  } else {
    $("#phone .warn").empty();
  }
})

// #veribtn을 클릭 했을 때
$("#veribtn").click(function(){
  let verifi = $("#phonenum input").val();
  // 숫자를 제외한 모든 문자 제거((/[^0-9]/g, '');)
  // 문자열 치환 replace
  verifi = verifi.replace(/[^0-9]/g, '');
  $("#phonenum input").val(verifi);

  let veri1;
  // #phonenum input value length가 10~11자리가 아니라면(조건1)
  if(verifi.length < 10 || verifi.length > 11) {
    veri1 = false;
  } else {
    veri1 = true;
  }

  let veri2;
  if(!isNaN(verifi)) {
    veri2 = true;
  } else {
    veri2 = false;
  }

  
  // 1. 전화번호를 형식에 맞게 입력하면 인증번호를 발급
  // 2. 인증번호를 발급 받으면 인증번호 입력칸을 활성화
  // 3. 전화번호를 형식에 맞지 않게 입력했을 경우 인증번호 입력칸 비활성화
  
  // veri1 && veri2 모두 true일 경우(조건1)
  // 인증번호를 보내고 .warn "인증번호가 발송 되었습니다."(실행문1)
  // 인증번호 입력칸을 활성화 (실행문2) css: disinput / attr : disabled
  // $()부터 disinput이라는 클래스 remove
  // $()부터 disabled라는 속성 remove
  if(veri1 && veri2) {
    $("#phone .warn").html('<span class="text-green">인증번호를 발송했습니다.(유효시간 30분)<br>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.<br>이미 가입된 번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.</span>');
    $('.inputbox').removeClass('disinput');
    $('#veritext').removeAttr('disabled');
  } else {
    // "#phone .warn" "형식에 맞지 않는 번호입니다." text-red (실행문1)
    // 인증번호 입력칸 비활성화
    $("#phone .warn").html('<span class="text-red">형식에 맞지 않는 번호입니다.</span>');
    $('#veritext').Attr('disabled', 'disabled');
    $('#veritext').parent('.inputbox').addClass('disinput');
  }
})


// #veritext에서 focusout됐을 때
// 그 값이 "1234"와 같다면(조건1)
// "인증되었습니다." text-green (실행문1)
$("#veritext").focusout(function(){
  phoneveri = false;
  if($(this).val() == "1234") {
    phoneveri = true;
    $("#phone .warn").html('<span class="text-green">인증되었습니다.</span>');
    $(this).next('div').empty();
  } else {
    // 불일치, X 아이콘
    $(this).next('div').html('<span class="text-red">불일치</span> <span class="disagree"></span>');
    $("#phone .warn").html('<span class="text-red">인증번호를 다시 확인해주세요</span>');
    $(this).parent('.inputbox').addClass('border-red');
  }
})
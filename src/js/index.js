//step 1 요구사항 구현을 위한 전략 
//TODO 메뉴 추가 
// - [1] 메뉴의 이름을 입력받고 엔터키 입력으로 추가 
// - [2] 메뉴의 이름을 입력받고 확인 버튼을 클릭하면 메뉴를 추가한다
// - [3] 추가되는 메뉴의 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [4] 총 메뉴 갯수를 COUNT 하여 상단에 보여줘 
// - [5] 메뉴가 추가되고 나면 INPUT은 빈 값으로 초기화
// - [6] 사용자 입력값이 빈 값이라면 추가되지 않는다

const $ = (selector)  => document.querySelector(selector);

function App () {
   // - [] 총 메뉴 갯수를 COUNT하여 상단에 보여준다 
   const updatemenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
     $(".menu-count").innerText = `${menuCount} 개`;
  }
  //TODO 메뉴 수정 
  $("#espresso-menu-list").addEventListener("click",(e) => {
    // -[] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창 뜬다 
    if(e.target.classList.contains("menu-edit-button")){
      const $menuName = e.target.closest("li").querySelector(".menu-name");
        // -[] 모달창이 신규 메뉴명을 입력받고, 확인버튼을 누르면 메뉴가 수정 
      const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
      $menuName.innerText = updatedMenuName;
    }
    //TODO 메뉴 삭제 

   // - [] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다 
  if(e.target.classList.contains("menu-remove-button")){
    // - [] 확인 버튼을 클릭하면 메뉴가 삭제 된다 
    if(confirm("정말 삭제하시겠습니까?")){
      console.log(e.target.closest("li"));
      e.target.closest("li").remove();
      updatemenuCount();
    }
    
  }
  });
  //form태그가 자동으로 전송되는것을 막아 
  $("#espresso-menu-form").addEventListener("submit",(e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    // - [6] 사용자 입력값이 빈 값이라면 추가되지 않는다
    if($("#espresso-menu-name").value === ""){
      alert("값을 입력해주세요");
      return;
    }
     const espressoMenuName = $("#espresso-menu-name").value;  
     const menuItemTemplate = (espressoMenuName) => {
       // - [3] 추가되는 메뉴의 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
       return `
       <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
     <button
       type="button"
       class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
     >
       수정
     </button>
     <button
       type="button"
       class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
     >
       삭제
     </button>
      </li>`;
     };
       // <!-- beforebegin -->
       // <p>
       // <!-- afterbegin -->
       // foo
       // <!-- beforeend -->
       // </p>
       // <!-- afterend -->
       $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
       // const 변수 = li갯수를 카운팅
       // - [4] 총 메뉴 갯수를 COUNT 하여 상단에 보여줘 
       updatemenuCount();
       // - [5] 메뉴가 추가되고 나면 INPUT은 빈 값으로 초기화
       $("#espresso-menu-name").value ="";
  }
  // - [2] 메뉴의 이름을 입력받고 확인 버튼을 클릭하면 메뉴를 추가 
  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addMenuName();
  });
  // - [1] 메뉴의 이름을 입력받고 엔터키 입력으로 추가 
  //메뉴의 이름을 입력받아 
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    // 엔터키가 아니면 그대로
    if(e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
  
  
}

App();
// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);
      if(status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status
// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search
// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// button-change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = `${path}/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End button-change-status
function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    //↓からがレスポンスがあった場合の処理
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    //↓コントローラーのアクションと重複した場合に
    e.preventDefault();
    //↑現在進行中の動作を中止するメソッど
    // eはイベント情報が格納されている
  });
}
window.addEventListener("load", memo);
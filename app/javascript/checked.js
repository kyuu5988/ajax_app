function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    //↓１秒毎に読み込まれるので重複追加を回避する記述
    if (post.getAttribute("data-load") != null) {
      return null;//2回目以降に読み込まれて属性があれば処理が停止
    }
    post.setAttribute("data-load", "true");//最初に要素に属性追加
    //ここまで
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      //ここまでがリクエスト送信の記述
      XHR.onload = () => {
        //↓レスポンスがエラーだった時の処理の記述
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          alert(`サーバー側でエラーが発生しました。管理者に連絡してください`)
          return null;  //この返り値の設定でエラー時にjsの処理を停止する        
        }
        //↑エラー対応　ここまで
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
        //ここまでレスポンスに対応する記述
      };
     });
   });
}
//↓これで１秒毎に読み込む設定
setInterval(check, 1000);
//↓前の設定
//window.addEventListener("load", check);
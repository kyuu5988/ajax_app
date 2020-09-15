class PostsController < ApplicationController

  def index
    #idをDESC（降順）で並び替える(新しいのが上にくる)
    @posts = Post.all.order(id: "DESC")
  end


  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked #(カラムの値がtrueかどうか)
      post.update(checked: false)
    else #falseならこっちを実行
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    #更新したレコードを取得
    render json: { post: item }
    #JSON形式のデータをchecked.jsに返却
  end
end

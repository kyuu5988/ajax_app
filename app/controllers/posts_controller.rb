class PostsController < ApplicationController

  def index
    #idをDESC（降順）で並び替える(新しいのが上にくる)
    @posts = Post.all.order(id: "DESC")
  end


  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end

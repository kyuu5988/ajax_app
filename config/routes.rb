Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  #↓渡す情報が一意の情報であればpathパラメーターの方が適している
  get 'posts/:id', to: 'posts#checked'
end

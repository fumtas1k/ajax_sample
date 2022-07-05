Rails.application.routes.draw do
  root "messages#index"
  resources :messages do
    collection do
      get :searches, defaults: {format: :json}
    end
  end
end

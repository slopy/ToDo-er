require 'spec_helper'

describe GoalsController do
    it { expect route(:get, '/goals').to(action: :index) }
    it { expect route(:get, '/goals/1').to(action: :show, id: 1) }
    it { expect route(:get, '/active_change/1').to(action: :toggleActive, id: 1) }
    it { expect route(:get, '/done_change/1').to(action: :toggleDone, id: 1) }


    let(:user) { FactoryGirl.build(:user) }
    let(:goal) { FactoryGirl.build(:goal) }
    let(:valid_params) { {'goal' => {'title' => 'Test Post', 'description' => 'description' } } }
    let(:invalid_params) { {'goal' => {'title' => 'Test Post', 'description' => 'description' } } }

    before do
      sign_in user
      controller.stub(:user_signed_in?).and_return(true)
      controller.stub(:current_user).and_return(user)
      controller.stub(:authenticate_user!).and_return(user)
      goal.user = user
    end

    describe "GET #index" do
        before { get :index, format: :json }
        it { expect(response.header['Content-Type']).to respond_with_content_type(:json) }
        it { expect(response).to be_success }
    end

    describe "POST #create with valid params" do
        before { post :create, valid_params, format: :json }

        it { expect(response.header['Content-Type']).to respond_with_content_type(:json) }
        it { expect(response).to be_success }
        it { expect(response).to change(Goal,:count).by(1) }
    end

    describe "POST #create with INvalid params" do
        before { post :create, valid_params, format: :json }

        it { expect(response).to be_success }
        it { expect(response).to change(Goal,:count).by(1) }
    end
end


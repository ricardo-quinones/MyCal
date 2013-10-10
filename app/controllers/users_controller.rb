class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json {
        render json: @user.as_json(
          except: [:password_digest, :token],
          include: {
            calendars: {
              include: {
                :events => {
                  methods: [:local_start_date, :local_end_date],
                  except: [:start_date, :end_date]
                },
                :users_shared_with => {
                  only: [:email]
                }
              }
            },
            calendar_shares: { except: [:user_id, :permissions] },
            manage_sharing_calendars: {
              include: {
                events: {
                  methods: [:local_start_date, :local_end_date],
                  except: [:start_date, :end_date]
                },
                users_shared_with: {
                  only: [:email]
                }
              },
              methods: [:owner_email, :owner_name]
            },
            make_event_changes_calendars: {
              include: {
                events: {
                  methods: [:local_start_date, :local_end_date],
                  except: [:start_date, :end_date]
                }
              },
              methods: [:owner_email, :owner_name],
              except: [:owner_id, :description, :title]
            },
            see_event_details_calendars: {
              include: {
                events: {
                  methods: [:local_start_date, :local_end_date],
                  except: [:start_date, :end_date, ]
                }
              },
              methods: [:owner_email, :owner_name],
              except: [:owner_id, :description, :title]
            }
          }
        )
      }
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      sign_in @user
      redirect_to root_url
    else
      render :new
    end
  end

  def update
    @user = User.find(params[:id])

    if params[:user][:password].blank?
      if @user.update_without_password(params[:user])
        render json: @user
      else
        render json: @user.errors.full_messages
      end
    else
      if @user.update_attributes(params[:user])
        render json: @user
      else
        render json: @user.errors.full_messages
      end
    end
  end
end

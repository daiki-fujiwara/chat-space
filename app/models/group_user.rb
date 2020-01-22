class GroupUser < ApplicationRecord
  belong_to :user
  belong_to :group
end

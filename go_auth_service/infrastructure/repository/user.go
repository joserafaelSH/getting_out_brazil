package repository

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/domain/model"
)

type UserRpositoryDb struct {
	Db *gorm.DB
}

func (d UserRpositoryDb) FindUserByEmail(email string) (*model.User, error) {
	var user model.User
	d.Db.First(&user, "email = ?", email)

	if user.ID == "" {
		return &user, fmt.Errorf("no account found")
	}
	return &user, nil
}

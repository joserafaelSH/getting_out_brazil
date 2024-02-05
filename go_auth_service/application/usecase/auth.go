package usecase

import (
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/infrastructure/repository"
	"golang.org/x/crypto/bcrypt"
)

type AuthUseCase struct {
	Db repository.UserRpositoryDb
}

func (a *AuthUseCase) Login(email string, password string) (bool, error) {
	user, err := a.Db.FindUserByEmail(email)
	if err != nil {
		return false, err
	}

	if user.ID == "" {
		return false, nil
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return false, nil
	}

	return true, nil
}

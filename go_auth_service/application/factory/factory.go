package factory

import (
	"github.com/jinzhu/gorm"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/application/usecase"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/infrastructure/repository"
)

func AuthUseCaseFactory(db *gorm.DB) usecase.AuthUseCase {

	authRepository := repository.UserRpositoryDb{Db: db}

	authUseCase := usecase.AuthUseCase{Db: authRepository}

	return authUseCase
}

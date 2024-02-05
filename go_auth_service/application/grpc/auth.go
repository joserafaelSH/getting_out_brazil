package grpc

import (
	"context"

	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/application/grpc/pb"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/application/usecase"
)

type AuthGrpcService struct {
	AuthUseCase usecase.AuthUseCase
	pb.UnimplementedAuthServiceServer
}

func (a *AuthGrpcService) AuthUser(ctx context.Context, in *pb.SendUserToAuth) (*pb.AuthResult, error) {

	auth, err := a.AuthUseCase.Login(in.Email, in.Password)

	if err != nil {

		return &pb.AuthResult{
			Result: false,
		}, nil
	}

	return &pb.AuthResult{
		Result: auth,
	}, nil
}

func NewAuthGrpcService(authUseCase usecase.AuthUseCase) *AuthGrpcService {
	return &AuthGrpcService{AuthUseCase: authUseCase}
}

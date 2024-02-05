package grpc

import (
	"fmt"
	"log"
	"net"

	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/application/grpc/pb"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/application/usecase"
	"github.com/joserafaelSH/getting_out_brazil/go_auth_service/infrastructure/repository"

	"github.com/jinzhu/gorm"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func StartGrpcServer(database *gorm.DB, port int) {
	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)

	userRepository := repository.UserRpositoryDb{Db: database}
	authUseCase := usecase.AuthUseCase{Db: userRepository}
	authGrpcService := NewAuthGrpcService(authUseCase)
	pb.RegisterAuthServiceServer(grpcServer, authGrpcService)

	address := fmt.Sprintf("0.0.0.0:%d", port)
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}

	log.Printf("gRPC server has been started on port %d", port)
	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}
}

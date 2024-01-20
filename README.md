

# Monorepo to test something about nestjs, prismaORM, Go and GORM integrations 


## Start Project 
```
docker-compose up -d
```

- Nest app run on port 3000 and expose 5555 to prisma studio
- Go app run on port 8080
- Postgresql run on port 5432

No networks has been created, then we need to use 
the  db service name in database connection URL


## To run a single service 
```
docker-compose up <service>
```

## To execute bash of container
```
docker exec -it <service> bash
```
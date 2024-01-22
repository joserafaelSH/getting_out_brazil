/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./user/domain/user_entity/user.entity"), { "UserEntity": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: Object } } }]] } };
};
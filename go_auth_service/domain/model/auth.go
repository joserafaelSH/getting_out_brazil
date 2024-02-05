package model

import (
	"encoding/json"
	"fmt"

	"github.com/go-playground/validator/v10"
)

type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u *Auth) isValid() error {
	v := validator.New()
	err := v.Struct(u)
	if err != nil {
		fmt.Errorf("Error during Transaction validation: %s", err.Error())
		return err
	}
	return nil
}

func (t *Auth) ParseJson(data []byte) error {
	err := json.Unmarshal(data, t)
	if err != nil {
		return err
	}

	err = t.isValid()
	if err != nil {
		return err
	}

	return nil
}

func (t *Auth) ToJson() ([]byte, error) {
	err := t.isValid()
	if err != nil {
		return nil, err
	}

	result, err := json.Marshal(t)
	if err != nil {
		return nil, nil
	}

	return result, nil
}

func NewAuth() *Auth {
	return &Auth{}
}

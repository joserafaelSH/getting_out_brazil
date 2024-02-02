package model

import (
	"encoding/json"
	"fmt"

	"github.com/go-playground/validator/v10"
)

// export type UserProps = {
// 	user_name: string;
// 	password: string;
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	last_login: Date | null;
// 	created_at?: Date;
//   };

type User struct {
	ID        string `json:"id" gorm:"primary_key"`
	UserName  string `json:"user_name" gorm:"type:varchar(255);unique_index"`
	Password  string `json:"password" gorm:"type:varchar(255)"`
	FirstName string `json:"first_name" gorm:"type:varchar(255)"`
	LastName  string `json:"last_name" gorm:"type:varchar(255)"`
	Email     string `json:"email" gorm:"type:varchar(255);unique_index"`
	LastLogin string `json:"last_login" gorm:"type:timestamp;default:null"`
	CreatedAt string `json:"created_at" gorm:"type:timestamp;default:current_timestamp"`
}

func (u *User) isValid() error {
	v := validator.New()
	err := v.Struct(u)
	if err != nil {
		fmt.Errorf("Error during Transaction validation: %s", err.Error())
		return err
	}
	return nil
}

func (t *User) ParseJson(data []byte) error {
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

func (t *User) ToJson() ([]byte, error) {
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

func NewUser() *User {
	return &User{}
}

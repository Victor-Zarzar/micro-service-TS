from typing import List, Optional
from sqlmodel import SQLModel, Field, Column, String, Relationship

class UserScopes(SQLModel, table=True):
    __tablename__ = "userscopes"

    user_id: Optional[int] = Field(default=None,
                                    foreign_key='user.id',
                                    primary_key=True)
    scope_id: Optional[int] = Field(default=None,
                                     foreign_key='scope.id',
                                     primary_key=True)

class User(SQLModel, table=True):
    __tablename__ = "user"

    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    email: str = Field(sa_column=Column('email',
                                  String(70),
                                  unique=True))
    password: str
    scopes: List["Scope"] = Relationship(back_populates="users",
                                         link_model=UserScopes)
    is_active: bool = Field(default=False)

class Scope(SQLModel, table=True):
    __tablename__ = "scope"

    id: Optional[int] = Field(primary_key=True, index=True)
    scope_name: str = Field(unique=True) 
    users: List["User"] = Relationship(back_populates="scopes",
                                       link_model=UserScopes)



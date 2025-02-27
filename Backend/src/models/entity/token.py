from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime, timezone

class Token(SQLModel, table=True):
    __tablename__ = "tokens"

    id: str = Field(primary_key=True, index=True)
    user_id: str = Field(foreign_key="user.id", nullable=False)
    token: str = Field(unique=True, nullable=False)
    type: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: Optional[datetime] = None

    user: Optional["User"] = Relationship(back_populates="tokens")

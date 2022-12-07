from sqlalchemy import (Column, Integer, String, DateTime, MetaData,
                        create_engine, Boolean)
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine(
    "postgresql+psycopg2://root:password@localhost:5432/postgres", echo=True)
Session = sessionmaker(bind=engine)

session = Session()
Base = declarative_base()


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    todo = Column(String, nullable=False)
    category = Column(String, nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    completed = Column(Boolean, nullable=False, default= False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


Base.metadata.create_all(engine)

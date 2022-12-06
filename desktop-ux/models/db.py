from sqlalchemy import (Column, Integer, String, DateTime, MetaData,
                        create_engine)
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine(
    "postgresql+psycopg2://root:password@localhost:5432/postgres")
Session = sessionmaker(bind=engine)

session = Session()
Base = declarative_base()


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    todo = Column(String)
    category = Column(String)
    date = Column(DateTime(timezone=True))
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


Base.metadata.create_all(engine)

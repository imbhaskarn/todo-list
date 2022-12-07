from fastapi import Request
from models.db import session, Todo
from fastapi import FastAPI
app = FastAPI()


@app.get('/')
def index():
    return {"message": "Hello from fastapi"}


@app.get('/todo')
def get_todo():
    data = session.query(Todo).all()
    data_list = [item.as_dict() for item in data]
    return data_list


@app.post('/todo')
async def new_todo(req: Request):
    args = await req.json()
    todo = Todo(todo=args['todo'],
                category=args['category'], date=args['date'])
    session.add(todo)
    session.commit()
    return todo.as_dict()


@app.put('/todo')
async def update_todo(req:  Request):
    args = await req.json()
    todo = session.query(Todo).get(int(args.get('id')))
    if todo is None:
        return {"message": "todo found".format(args["id"]), 'result': 'error'}

    todo.todo = args.get('todo')  # args.todo
    todo.category = args.get('category')  # args.type
    todo.date = "2022-12-06T13:39:06.852Z"
    todo.completed = args.get('completed', False)  # args.date
    session.commit()
    return {'message': "todo updated succefully"}


@app.delete('/todo')
def delete_todo(req:  Request):
    args = req.json()
    session.query(Todo).filter(Todo.id == int(args.get('id'))).delete()
    session.commit()
    return {'message': "todo deleted succefully"}

from app import app
from flask import request, jsonify
from models.db import session, Todo


@app.route('/')
def index():
    return '<h1 style="color: #171115; font-family: Tohama, sans-serif"> Hello from Flask! </h1>'


@app.route('/todo', methods=['GET', 'POST', 'PUT', 'DELETE'])
def todo():
    args = request.get_json()
    if args is None:
        return jsonify({"message": "Invalid arguments passed", 'result': 'error'}), 403
    if request.method == 'POST':
        todo = Todo(todo=args['todo'],
                    category=args['category'], date=args['date'])
        session.add(todo)
        session.commit()
        return (args)
    if request.method == 'GET':
        data = session.query(Todo).all()
        data_list = [item.as_dict() for item in data]
        return jsonify(data_list), 200
    if request.method == 'PUT':
        todo = session.query(Todo).get(int(args.get('id')))
        if todo is None:
            return jsonify({"message": "todo found".format(args["id"]), 'result': 'error'}), 403

        todo.todo = "a random todo update id 3"  # args.todo
        todo.type = 'office'  # args.type
        todo.date = "2022-12-06T13:39:06.852Z"  # args.date
        session.commit()
        return jsonify({'message': "todo updated succefully"})

    if request.method == 'DELETE':
        session.query(Todo).filter(Todo.id == int(args.get('id'))).delete()
        session.commit()
        return jsonify({'message': "todo deleted succefully"})

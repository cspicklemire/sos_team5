from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

database = Flask(__name__)
database.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
database.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(database)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email

@app.route('/api/listusers')
def listUsers():
    results = []
    for user in User.query.all():
        results.append({'id':user.id, 'username':user.username, 'email':user.email})

    return {'data':results}

@app.route('/api/createuser', methods=['POST'])
def createUser():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    result = "Done"
    if email:
        user = User(username=username, email=email)
        db.session.add(user)
        db.session.commit()
    else:
        result = "Ack!"
        
    return result
    
#if __name__=='__main__':
#    app.run(host='0.0.0.0', port=5000)

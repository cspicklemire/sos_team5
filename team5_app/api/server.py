import flask
import functools
import json
import os
from authlib.client import OAuth2Session
import google.oauth2.credentials
import googleapiclient.discovery
import secret
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit, join_room, leave_room
from dotenv import load_dotenv
load_dotenv('.prodenv')
load_dotenv('.flaskenv')


ACCESS_TOKEN_URI = 'https://www.googleapis.com/oauth2/v4/token'
AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent'

AUTHORIZATION_SCOPE ='openid email profile'

AUTH_REDIRECT_URI = os.environ.get("FN_AUTH_REDIRECT_URI", default=False)
BASE_URI = os.environ.get("FN_BASE_URI", default=False)
CLIENT_ID = os.environ.get("FN_CLIENT_ID", default=secret.FN_CLIENT_ID)
CLIENT_SECRET = os.environ.get("FN_CLIENT_SECRET", default=secret.FN_CLIENT_SECRET)

AUTH_TOKEN_KEY = 'auth_token'
AUTH_STATE_KEY = 'auth_state'


app = flask.Flask(__name__, static_folder='../build', static_url_path='/')
app.secret_key = os.environ.get("FN_FLASK_SECRET_KEY", default=secret.FN_FLASK_SECRET_KEY)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///userdata.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
socketio = SocketIO(app, manage_session=False, cors_allowed_origins='*')

def is_logged_in():
    return True if AUTH_TOKEN_KEY in flask.session else False

def build_credentials():
    if not is_logged_in():
        raise Exception('User must be logged in')

    oauth2_tokens = flask.session[AUTH_TOKEN_KEY]
    
    return google.oauth2.credentials.Credentials(
                oauth2_tokens['access_token'],
                refresh_token=oauth2_tokens['refresh_token'],
                client_id=CLIENT_ID,
                client_secret=CLIENT_SECRET,
                token_uri=ACCESS_TOKEN_URI)

def get_user_info():
    
    credentials = build_credentials()

    oauth2_client = googleapiclient.discovery.build(
                        'oauth2', 'v2',
                        credentials=credentials)
    return oauth2_client.userinfo().get().execute()


@app.route('/api/checkusername', methods=['POST'])
def checkUsernameAPI( ):
    try:
        posted = request.get_json()
        username = posted['username']
        if (len(username) < 3):
            result = {'available': False, 'message': 'Must have at least 3 characters'}
            return result
        if (len(username) > 20):
            result = {'available': False, 'message': 'Must have at most 20 characters'}
            return result
        print("username is " + username)
        duplicate = User.query.filter(User.username.ilike(username)).first()
        if duplicate:
            result = {'available': False, 'message': 'This username is taken'}
        else:
            result = {'available': True, 'message': 'This username is available!'}
    except:
        result = {'error': 'Invalid user'}

    return result


@app.route('/api/updateusername', methods=['POST'])
def updateUsernameAPI( ):
    try:
        posted = request.get_json()
        username = posted['username']
        print("username is " + username)
        data = {'email' : get_user_info().get("email")}
        email = data.get('email')
        current_user = User.query.filter_by(email = data['email']).first()
        current_user.username = username
        db.session.commit()
        result = {'username': current_user.username}
    except:
        result = {'error': 'Invalid user'}

    return result
    
    
@app.route('/api/updatestatus', methods=['POST'])
def updateStatusAPI( ):
    try:
        posted = request.get_json()
        status = posted['status']
        data = {'email' : get_user_info().get("email")}
        email = data.get('email')
        current_user = User.query.filter_by(email = data['email']).first()
        current_user.status = status
        db.session.commit()
        result = {'status': current_user.status}
    except:
        result = {'error': 'Invalid user'}

    return result


@app.route('/api/getuserinfo')
def getUserInfoAPI():
    try: 
        data = {'email' : get_user_info().get("email")}
        registered = User.query.filter_by(email = data['email']).first()
        if registered:
            data.update({'username' : registered.username})
            data.update({'status': registered.status}) 
            return data
        user = User(username = None, email=data['email'], status = "Standard")
        db.session.add(user)
        db.session.commit()
        data.update( {'username' : ''} )
    except:
        data = {'error' : 'user not logged in'}
        print("Error")
        
    return data 


def no_cache(view):
    @functools.wraps(view)
    def no_cache_impl(*args, **kwargs):
        response = flask.make_response(view(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response

    return functools.update_wrapper(no_cache_impl, view)


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('index.html')
    
@app.route('/google/login')
@no_cache
def login():
    session = OAuth2Session(CLIENT_ID, CLIENT_SECRET,
                            scope=AUTHORIZATION_SCOPE,
                            redirect_uri=AUTH_REDIRECT_URI)
  
    uri, state = session.create_authorization_url(AUTHORIZATION_URL)

    flask.session[AUTH_STATE_KEY] = state
    flask.session.permanent = True

    return flask.redirect(uri, code=302)

@app.route('/google/auth')
@no_cache
def google_auth_redirect():
    req_state = flask.request.args.get('state', default=None, type=None)
    if req_state != flask.session[AUTH_STATE_KEY]:
        response = flask.make_response('Invalid state parameter', 401)
        return response
    
    session = OAuth2Session(CLIENT_ID, CLIENT_SECRET,
        scope=AUTHORIZATION_SCOPE,
        state=flask.session[AUTH_STATE_KEY],
        redirect_uri=AUTH_REDIRECT_URI)
  
    
    


    oauth2_tokens = session.fetch_access_token(
                        ACCESS_TOKEN_URI,            
                        authorization_response=flask.request.url)

    flask.session[AUTH_TOKEN_KEY] = oauth2_tokens

    return flask.redirect(BASE_URI, code=302)

@app.route('/google/logout')
@no_cache
def logout():
    flask.session.pop(AUTH_TOKEN_KEY, None)
    flask.session.pop(AUTH_STATE_KEY, None)

    return flask.redirect(BASE_URI, code=302)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    status = db.Column(db.String(120), unique=False, nullable = True)

    def __repr__(self):
        return '<User: Email-%r Status-%r>' % self.email % self.status


@socketio.on('connect')
def test_connect():
    print("We got a connection.")
    emit('my_response', {'data': 'Connected'})
    
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    print(username + " has joined the " +room + "room")
    

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    print(username + " has left the " +room + "room")

@socketio.on('message')
def got_message(data):
    room = data['room']
    print("We got a message:" + str(data) + " sending back out to all subscribers")
    emit('message', data, room = room)

@socketio.on_error()
def chat_error_handler(e):
    print('An error has occurred on: ' + str(e))

@socketio.on_error_default
def error_handler(e):
    print('A general error has occurred: ' + str(e))
    
if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0', debug=True)
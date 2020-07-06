import flask
import functools
import json
import os
from authlib.client import OAuth2Session
import google.oauth2.credentials
import googleapiclient.discovery
import secret


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

def no_cache(view):
    @functools.wraps(view)
    def no_cache_impl(*args, **kwargs):
        response = flask.make_response(view(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response

    return functools.update_wrapper(no_cache_impl, view)

@app.route('/api/getuserinfo')
def getUserInfoAPI():
    try: 
        data = {'email' : get_user_info().get("email")}
    except:
        data = {'error' : 'user not logged in'}
    return data 



@app.route('/testlogin')
def testlogin():
    if is_logged_in():
        user_info = get_user_info()
        #Once we get database hooked up, this is where we add to database if no entry exists yet for this email
        return '<div>You are currently logged in as ' + user_info['given_name'] + '<div><pre>' + json.dumps(user_info, indent=4) + "</pre>" + '<br>' + '<a href="/google/logout">Click here to logout</a>'
    
    return 'You are not currently logged in.' + '<a href="/google/login">Click here to login to google</a>'

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
    print ('\nreq_state is ' + req_state + '\n')
    print ('\nflask session authkey is ' + flask.session[AUTH_STATE_KEY] + '\n')
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
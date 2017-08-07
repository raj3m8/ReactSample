import bottle
import requests
import json
from bottle import route, hook, run, template, response, get

api_key = "RGAPI-4e49445c-6556-48d5-98b9-c04de73729e6"

class EnableCors(object):
  def apply(self, fn, context):
      def _enable_cors(*args, **kwargs):
          # set CORS headers
          response.headers['Access-Control-Allow-Origin'] = '*'
          response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
          response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

          if bottle.request.method != 'OPTIONS':
              # actual request; reply with the actual response
              return fn(*args, **kwargs)

      return _enable_cors

app = bottle.app()


@route('/api/items')
def index():
  data = requests.get("https://na1.api.riotgames.com//lol/static-data/v3/items?itemListData=all&api_key="+api_key)
  return {'data': json.loads(data.text)}

@route('/api/summoner/<summoner>')
def index(summoner):
  data = requests.get("https://na1.api.riotgames.com//lol/summoner/v3/summoners/by-name/"+summoner+"?itemListData=all&api_key="+api_key)
  return {'data': json.loads(data.text)}

app.install(EnableCors())
app.run(port=8080)

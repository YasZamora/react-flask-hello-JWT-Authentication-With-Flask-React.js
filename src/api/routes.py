"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User(email=email, password=password)
    #len es una función que cuenta el largo de un array, y en el código de a continuación dice si el largo del array es mayor a 0 entonces error, porque ya existe un usuario con esos datos.
    if len(User.query.filter_by(email=email).all()) > 0:
        return jsonify({"Error": "Su usuario ya está registrado en plataforma"}), 400
    else:
        
        db.session.add(user)
        db.session.commit()
    
    return jsonify({"succes": "Ya se registró su email y password"}), 201
  

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User(email=email, password=password)
    if len(User.query.filter_by(email=email, password=password).all()) > 0:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)   
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    # access_token = create_access_token(identity=email)
    # return jsonify(access_token=access_token)    

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/validation", methods=["GET"])
@jwt_required()
def validation():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200    

# Endpoint for revoking the current users access token. Save the JWTs unique
# identifier (jti) in redis. Also set a Time to Live (TTL)  when storing the JWT
# so that it will automatically be cleared out of redis after the token expires.
@api.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    print("HOLA ALDO HAGAMOS EL PROYECTO DEJEMOS ESTE CODE")
    jti = get_jwt()["jti"]
    jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
    return jsonify(msg="Access token revoked")    
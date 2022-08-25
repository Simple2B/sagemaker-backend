import os
from flask_jwt_extended import JWTManager
from flask_openapi3 import OpenAPI
from flask_openapi3.models import Info
from flask_openapi3.models.security import HTTPBearer
from flask_cors import CORS


def create_app(environment="development"):

    from config import config

    # Instantiate app.
    info = Info(title='Skelet API', version='1.0.0')
    jwt = HTTPBearer(bearerFormat="JWT")
    securitySchemes = {"jwt": jwt}
    app = OpenAPI(__name__, securitySchemes=securitySchemes, info=info)

    CORS(app, resources={r"/*": {"origins": "*"}})  # TODO change to frontend only
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Set app config.
    env = os.environ.get("FLASK_ENV", environment)
    app.config.from_object(config[env])
    config[env].configure(app)
    app.config["VALIDATE_RESPONSE"] = True

    # Set up extensions.

    # Register bluerint
    from app.views import api_report
    app.register_api(api_report)

    jwt = JWTManager(app)

    return app

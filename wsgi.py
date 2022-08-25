#!/user/bin/env python
import os
import click
from dotenv import load_dotenv
from app import create_app, db, models

INIT_DB_CMD = (
    "poetry run flask db init",
    "poetry run flask db migrate",
    "poetry run flask db upgrade"
)

load_dotenv()

app = create_app()


# flask cli context setup
@app.shell_context_processor
def get_context():
    """Objects exposed here will be automatically available from the shell."""
    return dict(app=app, db=db, models=models)


@app.cli.command()
def create_db():
    """Create the configured database."""
    for cmd in INIT_DB_CMD:
        os.system(cmd)


@app.cli.command()
@click.confirmation_option(prompt="Drop all database tables?")
def drop_db():
    """Drop the current database."""
    db.drop_all()


if __name__ == "__main__":
    app.run()

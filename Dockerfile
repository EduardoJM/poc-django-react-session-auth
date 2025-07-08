FROM python:3.11
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3-dev \
    default-libmysqlclient-dev \
    software-properties-common

COPY ./pyproject.toml /app/pyproject.toml
RUN uv sync

COPY entrypoint.sh /app

COPY ./server /app

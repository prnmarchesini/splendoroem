# API Splendor O&M (FastAPI). Sobe no Coolify; variáveis no painel do Coolify.
FROM python:3.12-slim

# curl: o healthcheck do Coolify roda dentro do container (o -slim não traz).
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["/bin/sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips='*'"]

#!/usr/bin/env bash
set -euo pipefail

ENV_FILE=${1:-.env}

if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

DB_PATH=${DB_FILE:-./data/iniciamazon.sqlite}
mkdir -p "$(dirname "$DB_PATH")"

echo "[db] Usando arquivo: $DB_PATH"

if ! command -v sqlite3 >/dev/null 2>&1; then
  echo "[db] ERRO: sqlite3 nao encontrado. Instale o cliente SQLite (ex.: 'sudo apt-get install sqlite3') e tente novamente."
  exit 1
fi

sqlite3 "$DB_PATH" < "$(dirname "$0")/schema.sql"

echo "[db] Banco atualizado/criado com sucesso"

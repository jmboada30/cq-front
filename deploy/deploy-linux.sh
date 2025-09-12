#!/usr/bin/env bash
# --- Confirmación interactiva antes de ejecutar ---
read -p "¿Estás seguro de que quieres ejecutar el deploy? (Yes/no): " confirm
if [[ "$confirm" != "Yes" ]]; then
  echo "❌ Deploy cancelado por el usuario."
  exit 0
fi

# Nombre del script: deploy-linux.sh
# Uso: ./deploy-linux.sh
# Descripción: Script para generar el build de una aplicación Quasar y desplegarla a un servidor remoto.

# --- Configuración de Seguridad y Errores ---
# 'set -e': Termina el script inmediatamente si un comando falla.
# 'set -o pipefail': El código de salida de una tubería es el del último comando que falló.
set -e
set -o pipefail

# --- Carga Opcional de Variables Externas ---
# Define la ruta al archivo .env relativa a la ubicación del script
ENV_FILE_PATH="$(dirname "$0")/../.env" 

# Opción A: Cargar variables desde un archivo .env en la raíz del proyecto
if [ -f "$ENV_FILE_PATH" ]; then
  echo "ℹ️  Cargando variables desde $ENV_FILE_PATH..."
  set -a
  source "$ENV_FILE_PATH"
  set +a
  echo "✅ Variables desde $ENV_FILE_PATH cargadas."
elif [ -f ".env" ]; then # Intenta cargar desde .env en el directorio actual si el anterior no existe
  echo "ℹ️  Cargando variables desde .env (directorio actual)..."
  set -a
  source ".env"
  set +a
  echo "✅ Variables desde .env (directorio actual) cargadas."
else
    echo "⚠️  No se encontró el archivo .env. Asegúrate de que las variables de entorno estén definidas."
fi


# --- Definición y Validación de Variables de Configuración ---
# Las variables DEBEN ser definidas en un archivo .env o como variables de entorno.
# No se usan valores por defecto para forzar una configuración explícita.

# Asigna las variables desde el entorno (cargado desde .env o exportado manualmente).
LOCAL_DIST_SOURCE_REL="${FRONTEND_BUILD_DIR}"
REMOTE_SERVER_ALIAS="${DEPLOY_SSH_ALIAS}"
REMOTE_TARGET_DIR="${DEPLOY_REMOTE_PATH}"
BUILD_COMMAND="${FRONTEND_BUILD_COMMAND}"

# Función para validar que las variables requeridas no estén vacías
validate_variables() {
  local error_found=0
  if [ -z "${LOCAL_DIST_SOURCE_REL}" ]; then
    echo "❌ Error: La variable FRONTEND_BUILD_DIR no está definida. Por favor, añádela a tu archivo .env." >&2
    error_found=1
  fi
  if [ -z "${REMOTE_SERVER_ALIAS}" ]; then
    echo "❌ Error: La variable DEPLOY_SSH_ALIAS no está definida. Por favor, añádela a tu archivo .env." >&2
    error_found=1
  fi
  if [ -z "${REMOTE_TARGET_DIR}" ]; then
    echo "❌ Error: La variable DEPLOY_REMOTE_PATH no está definida. Por favor, añádela a tu archivo .env." >&2
    error_found=1
  fi
  if [ -z "${BUILD_COMMAND}" ]; then
    echo "❌ Error: La variable FRONTEND_BUILD_COMMAND no está definida. Por favor, añádela a tu archivo .env." >&2
    error_found=1
  fi

  if [ ${error_found} -ne 0 ]; then
    echo "👉 Abortando deploy. Por favor, define todas las variables requeridas y vuelve a intentarlo." >&2
    exit 1
  fi
}

# Llama a la función para validar las variables antes de continuar
validate_variables


# --- Rutas y Comprobaciones ---
# Obtener la ruta absoluta del directorio raíz del proyecto (asumiendo que el script está en una subcarpeta como 'deploy')
PROJECT_ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_DIST_ABSOLUTE="${PROJECT_ROOT_DIR}/${LOCAL_DIST_SOURCE_REL}"

# Asegurarse de que el directorio de origen para rsync termine con /
if [[ "${LOCAL_DIST_ABSOLUTE}" != */ ]]; then
  LOCAL_DIST_ABSOLUTE="${LOCAL_DIST_ABSOLUTE}/"
fi

echo "--- Configuración del Deploy ---"
echo "Directorio raíz del proyecto: ${PROJECT_ROOT_DIR}"
echo "Directorio local de build:    ${LOCAL_DIST_ABSOLUTE}"
echo "Servidor remoto (alias SSH):  ${REMOTE_SERVER_ALIAS}"
echo "Directorio remoto de destino: ${REMOTE_TARGET_DIR}"
echo "Comando de build:             ${BUILD_COMMAND}"
echo "---------------------------------"

# --- Lógica del Script ---

# 1. Verificar si el gestor de paquetes necesario está instalado
#    Extrae el primer comando (ej. 'pnpm' de 'pnpm build')
package_manager=$(echo "$BUILD_COMMAND" | cut -d' ' -f1)
if ! command -v "$package_manager" &> /dev/null; then
    echo "❌ El comando '${package_manager}' no fue encontrado. Por favor, instálalo o ajusta BUILD_COMMAND."
    exit 1
fi

# 2. Navegar a la raíz del proyecto para ejecutar el build
cd "${PROJECT_ROOT_DIR}"
echo "ℹ️  Cambiado al directorio: $(pwd)"

# 3. Generar el build de Quasar (o el comando especificado)
echo "🛠️  Ejecutando comando de build: ${BUILD_COMMAND}..."
if ! eval "${BUILD_COMMAND}"; then
    echo "❌ Error al ejecutar el comando de build '${BUILD_COMMAND}'. Abortando."
    exit 1
fi
echo "✅ Build generado exitosamente."

# 4. Verificar que el directorio LOCAL_DIST_ABSOLUTE existe después del build
if [ ! -d "${LOCAL_DIST_ABSOLUTE}" ]; then
    echo "❌ El directorio local de build '${LOCAL_DIST_ABSOLUTE}' no existe después del build."
    echo "   Verifica la variable FRONTEND_BUILD_DIR ('${LOCAL_DIST_SOURCE_REL}') y la salida del proceso de build."
    exit 1
fi

# 5. Borrar contenido remoto
echo "🗑️  Limpiando carpeta remota en ${REMOTE_SERVER_ALIAS}:${REMOTE_TARGET_DIR}/*..."
if ! ssh "${REMOTE_SERVER_ALIAS}" "rm -rf \"${REMOTE_TARGET_DIR}\"/*"; then
    echo "❌ Error al limpiar la carpeta remota. Verifica la conexión SSH (${REMOTE_SERVER_ALIAS}),"
    echo "   la ruta remota ('${REMOTE_TARGET_DIR}'), y los permisos."
    exit 1
fi
echo "✅ Carpeta remota limpiada."

# 6. Subir los archivos nuevos
echo "🚀 Subiendo nuevos archivos desde '${LOCAL_DIST_ABSOLUTE}' a ${REMOTE_SERVER_ALIAS}:${REMOTE_TARGET_DIR}..."
if ! rsync -avz --delete --checksum "${LOCAL_DIST_ABSOLUTE}" "${REMOTE_SERVER_ALIAS}:${REMOTE_TARGET_DIR}"; then
    echo "❌ Error al subir los archivos con rsync."
    exit 1
fi

echo "✅ Deploy completado exitosamente."

# ======================== DOCUMENTACIÓN ========================
# Pasos para usarlo:

# 1. Guarda este código en un archivo, por ejemplo deploy/deploy-linux.sh.

# 2. Dale permisos de ejecución:
#    chmod +x deploy/deploy-linux.sh

# 3. Configuración REQUERIDA:
#    Debes configurar las variables de entorno necesarias. Tienes dos opciones:
#    a) Archivo .env: Crea un archivo .env en la raíz de tu proyecto. El script lo cargará automáticamente.
#       Ejemplo de .env:
#       FRONTEND_BUILD_DIR="dist/spa"
#       DEPLOY_SSH_ALIAS="deploy-cq-front"
#       DEPLOY_REMOTE_PATH="/home/deploy/orgs/devtalles/cq/cq-back/public"
#       FRONTEND_BUILD_COMMAND="pnpm build"
#    b) Variables de Entorno: Exporta las variables en tu terminal antes de ejecutar el script.
#       export FRONTEND_BUILD_DIR="dist/spa"
#       ... y las demás ...

# 4. Configura tu alias SSH:
#    Asegúrate de que el alias SSH (ej. "deploy-cq-front") esté configurado en tu archivo ~/.ssh/config.

# 5. Ejecuta el script desde la raíz de tu proyecto:
#    ./deploy/deploy-linux.sh
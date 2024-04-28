#!/bin/bash

# Установка пакета lsb-release
apt-get update && apt-get install -y lsb-release

# Добавление репозитория Tesseract
echo "deb https://notesalexp.org/tesseract-ocr5/$(lsb_release -cs)/ $(lsb_release -cs) main" \
| tee /etc/apt/sources.list.d/notesalexp.list > /dev/null

# Обновление списка пакетов
apt-get update -oAcquire::AllowInsecureRepositories=true

# Установка ключей notesalexp-keyring
apt-get install -y --allow-unauthenticated notesalexp-keyring

# Обновление списка пакетов снова
apt-get update

# Установка Tesseract OCR
apt-get install -y tesseract-ocr

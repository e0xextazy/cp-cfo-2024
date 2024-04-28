# Используем базовый образ Python
FROM python:3.10

# Установка системных зависимостей, включая curl
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

# Копирование файлов Poetry
COPY poetry.lock pyproject.toml /app/

# Установка Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Добавление пути к Poetry в переменную окружения PATH
ENV PATH="/root/.local/bin:$PATH"

# Копирование скриптов установки в контейнер
COPY scripts/install /scripts/install

# Установка tesseract и ghostscript с использованием скриптов
RUN chmod +x /scripts/install/tesseract_5_install.sh \
    && chmod +x /scripts/install/ghostscript_install.sh \
    && /scripts/install/tesseract_5_install.sh \
    && /scripts/install/ghostscript_install.sh

# Установка дополнительных требований из apt-requirements.txt
RUN cat scripts/install/apt-requirements.txt | xargs apt-get install -y

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY . .

# Установка Python зависимостей с помощью Poetry
RUN poetry install


# Команда для запуска приложения
CMD ["poetry", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

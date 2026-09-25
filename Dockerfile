FROM composer:2.7 AS vendor

WORKDIR /app

# Copy dependency manifests first so Docker can cache Composer installation.
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    --no-scripts \
    --optimize-autoloader

FROM php:8.2-cli

# PDO SQLite and mbstring are required by this Laravel application.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev libonig-dev \
    && docker-php-ext-install pdo_sqlite mbstring \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Reuse the dependency layer from the Composer stage.
COPY --from=vendor /app/vendor ./vendor

# Copy application code after dependencies have been installed.
COPY . .

# The local .env is excluded by .dockerignore; the demo key is only for this
# containerized coursework environment. Use a secret in a real deployment.
ENV APP_KEY=base64:+ASu1B/0uB80JU6yRD2ig4ZsyumjK842fwuiVLVEztk=

RUN php artisan package:discover --ansi \
    && mkdir -p database \
    && touch database/database.sqlite \
    && php artisan migrate --force --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["sh", "-c", "php artisan migrate --force --no-interaction && php artisan serve --host=0.0.0.0 --port=8000"]

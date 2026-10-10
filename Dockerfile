# syntax=docker/dockerfile:1

# Build stage: Composer and PHP extensions used only while building the app.
FROM php:8.2-alpine AS app-build

RUN apk add --no-cache sqlite-dev oniguruma-dev \
    && docker-php-ext-install pdo_sqlite mbstring \
    && rm -rf /var/lib/apk/*

WORKDIR /app

# Keep these manifests separate so the dependency layer is cached.
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    --no-scripts \
    --optimize-autoloader

ENV APP_KEY=base64:+ASu1B/0uB80JU6yRD2ig4ZsyumjK842fwuiVLVEztk=

# Copy application code after dependencies have been installed.
COPY . .
RUN php artisan package:discover --ansi \
    && mkdir -p database \
    && touch database/database.sqlite \
    && php artisan migrate --force --no-interaction

# Runtime stage: only the runtime PHP image, libraries, app, and prod vendor.
FROM php:8.2-alpine AS runtime

RUN apk add --no-cache sqlite-libs \
    && addgroup -S app \
    && adduser -S app -G app

WORKDIR /var/www/html

COPY --from=app-build --chown=app:app /app ./

RUN chown -R app:app storage bootstrap/cache database

ENV APP_ENV=production \
    APP_DEBUG=false \
    DB_CONNECTION=sqlite \
    SESSION_DRIVER=database \
    QUEUE_CONNECTION=database \
    CACHE_STORE=database \
    APP_KEY=base64:+ASu1B/0uB80JU6yRD2ig4ZsyumjK842fwuiVLVEztk=

EXPOSE 8000

USER app

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget --quiet --spider http://127.0.0.1:8000/up || exit 1

CMD ["sh", "-c", "php artisan migrate --force --no-interaction && php artisan serve --host=0.0.0.0 --port=8000"]
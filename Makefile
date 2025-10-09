
DB_CONTAINER_NAME=sisters_art
DB_IMAGE=postgres:15
DB_NAME=sisters_art_db
DB_USER=user
DB_PASSWORD=password
DB_PORT=5555
DB_HOST=localhost

DATABASE_URL=postgresql://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=require


db-build:
	@echo "Building PostgreSQL Docker container..."
	@docker run --name $(DB_CONTAINER_NAME) \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-e POSTGRES_DB=$(DB_NAME) \
		-p $(DB_PORT):5432 \
		-d $(DB_IMAGE)
	@echo "PostgreSQL container $(DB_CONTAINER_NAME) running on port $(DB_PORT)."
	@echo "POSTGRES_USER=$(DB_USER)"
	@echo "POSTGRES_PASSWORD=$(DB_PASSWORD)"
	@echo "POSTGRES_HOST=$(DB_HOST)"
	@echo "DB_PORT $(DB_PORT):5432"
	@echo "DB_NAME=$(DB_NAME)"

db-start:
	@echo "Starting the container..."
	@docker start $(DB_CONTAINER_NAME) || true
	@echo "PostgreSQL container $(DB_CONTAINER_NAME) started."

db-stop:
	@echo "Stopping the container..."
	@docker stop $(DB_CONTAINER_NAME) || true
	@echo "PostgreSQL container $(DB_CONTAINER_NAME) stopped."

db-remove:
	@echo "Removing the container..."
	@docker rm $(DB_CONTAINER_NAME) || true
	@echo "PostgreSQL container $(DB_CONTAINER_NAME) removed."

db-url:
	@echo "Database url:"
	@echo ${DATABASE_URL}

build:
	tsc && \
	npx tailwindcss -i ./src/styles/input.css -o ./public/css/main.css 

run:
	npm run dev & \
	npx tailwindcss -i ./src/styles/input.css -o ./public/css/main.css --watch

test:
	@echo "Tests are not set up ..."
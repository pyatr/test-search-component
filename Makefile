up:
	docker compose --file=docker-compose.dev.yml up -d
down:
	docker compose --file=docker-compose.dev.yml down
restart:
	docker compose --file=docker-compose.dev.yml restart
build:
	docker compose --file=docker-compose.dev.yml build
logs:
	docker compose --file=docker-compose.dev.yml logs -f
shell:
	docker compose --file=docker-compose.dev.yml exec -it test-search-component /bin/sh

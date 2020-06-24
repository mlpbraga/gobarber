#!make
start-db:
	docker-compose build
	docker-compose up -d

stop-db:
	docker-compose down

rebuild-db:
	docker-compose down
	sudo rm -rf data
	docker-compose build

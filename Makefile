COMPOSE = docker-compose
DOCKER = docker


up:
	$(COMPOSE) up -d --build


down:
	$(COMPOSE) down


restart:
	$(COMPOSE) down && $(COMPOSE) up -d


run-backend:
	$(COMPOSE) run backend


run-frontend:
	$(COMPOSE) run frontend


logs:
	$(COMPOSE) logs -f


clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans
	$(DOCKER) system prune -f


rebuild:
	$(COMPOSE) up -d --build --no-cache

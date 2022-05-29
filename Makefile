.PHONY: local-up
local-up:
	docker-compose --env-file ./docker/etc/.env up -d
	if [ ! -e dist ]; then \
  		docker exec -it scaleo-angular npm install; \
  		docker exec -it scaleo-angular ng build; \
	else \
	  echo "Skip"; \
	fi

.PHONY: local-down
local-down:
	docker-compose --env-file ./docker/etc/.env down

.PHONY: local-build
local-build:
	docker-compose --env-file ./docker/etc/.env build --no-cache angular

.PHONY: local-build-dist
local-build-dist:
	docker exec -it scaleo-angular npm install --force
	docker exec -it scaleo-angular ng build --prod

.PHONY: local-serve
local-serve:
	docker exec -it scaleo-angular ng serve --host 0.0.0.0 --port 9999

.PHONY: help	
help:
	@echo Usage:
	@echo "  make [target]"
	@echo
	@echo Targets:
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
			printf "  %-30s %s\n", $$1, $$NF \
		 }' $(MAKEFILE_LIST)

.PHONY: compose-dev
compose-dev: ## build docker dev environment 
	@./scripts/compose.sh development up

.PHONY: rm-dev
rm-dev: ## teardown docker dev environment 
	@./scripts/compose.sh development down

.PHONY: compose-prod
compose-prod: ## build docker dev environment 
	@./scripts/compose.sh prod up

.PHONY: rm-prod
rm-prod: ## teardown docker dev environment 
	@./scripts/compose.sh prod down

.PHONY: probe-api
probe-api: ## run ansible automation for endpoint testing
	@cd tests/api && ansible-playbook --connection=local -i 127.0.0.1, main.yaml && cd ../..

.PHONY: prune
prune: ## Removes all docker objects and volumes
	@docker system prune -a --volumes;
# clean unwanted port bindings
clean-port:
	@echo "Cleaning port 3000..."
	@lsof -ti :3000 | xargs kill -9 || echo "Port 3000 is already free."



build-prod:
	@echo "Building prod image..."
	docker build -t runners-list-web .

run-prod: clean-port
	@echo "Running prod server..."
	docker run -p 3000:3000 runners-list-web

#developent commands
build-dev:
	@echo "Building dev image..."
	docker build -t runners-list-web:dev --target dev .

run-dev: clean-port
	@echo "Running dev server..."
	docker run -p 3000:3000 runners-list-web:dev

	
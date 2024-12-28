# to enter the container terminal 
clean-port:
	@echo "Cleaning port 3000..."
	@lsof -ti :3000 | xargs kill -9 || echo "Port 3000 is already free."


run-dev: clean-port
	docker run -p 3000:3000 runners-list-web
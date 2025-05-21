IMAGE_NAME=calisthenics-backend-dev
DOCKERFILE=Dockerfile.dev

docker-build:
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE) .

docker-run:
		docker run --rm -it -p 8000:8000 \
			-v $(PWD):/backend -w /backend \
			--env-file .env $(IMAGE_NAME)

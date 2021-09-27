help:
	@echo "				          __    _____.__           "
	@echo "				    _____/  |__/ ____\  | ______   "
	@echo "				   / ___\   __\   __\|  | \____ \  "
	@echo "				  / /_/  >  |  |  |  |  |_|  |_> > "
	@echo "				  \___  /|__|  |__|  |____/   __/  "
	@echo "				 /_____/                  |__|     "
	@echo "Usage: make [target]"
	@echo
	@echo "Available targets:"
	@echo "help : Display this help message"
	@echo
	@echo "update-static : Update the /cmd/gtflp/kodata folder with the www static files. "
	@echo 
	@echo "release : Build the release version with ko and update the release.yaml file"
	@echo
	@echo "debug : Build the static files and start gtflp with the kodata env variable eg:  KO_DATA_PATH=cmd/gtflp/kodata/ go run ./cmd/gtflp "
	@echo
	@echo "image : Releases a new image to the gcloud distro repo"

update-static:
	@cd cmd/gtflp && rm -rf kodata 
	@cd frontend && yarn install && npm run build && mv build kodata && mv kodata ../cmd/gtflp/kodata/

release:
	@make update-static
	@ko resolve -f config/ > release.yaml

debug:
	@make update-static
	
run:
	@KO_DATA_PATH=cmd/gtflp/kodata/ DEV=true go run ./cmd/gtflp

image:
	@gcloud builds submit --tag gcr.io/fit-stream-305821/gtflp
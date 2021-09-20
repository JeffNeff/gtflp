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
	@echo "debug : Start with the kodata env variable eg:  KO_DATA_PATH=cmd/gtflp/kodata/ go run ./cmd/gtflp "
	@echo

update-static:
	@cd cmd/gtflp && rm -rf kodata 
	@cd frontend && npm run build && mv build kodata && mv kodata ../cmd/gtflp/kodata/

release:
	@ko resolve -f config/ > release.yaml

debug:
	@KO_DATA_PATH=cmd/gtflp/kodata/ DEV=true go run ./cmd/gtflp

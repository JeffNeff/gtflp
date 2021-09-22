
                                         __    _____.__          
                                   _____/  |__/ ____\  | ______  
                                  / ___\   __\   __\|  | \____ \ 
                                 / /_/  >  |  |  |  |  |_|  |_> >
                                 \___  /|__|  |__|  |____/   __/ 
                                /_____/                  |__|    
[![Deploy and Release](https://github.com/JeffNeff/gtflp/actions/workflows/createrelease.yml/badge.svg)](https://github.com/JeffNeff/gtflp/actions/workflows/createrelease.yml) [![CD](https://github.com/JeffNeff/gtflp/actions/workflows/cd.yml/badge.svg)](https://github.com/JeffNeff/gtflp/actions/workflows/cd.yml)
## What it is

`gtfp` is a tool for debugging pods and testing cloudevents.

Capabilities:
* Logging : Stream the logs from pods in the same namespace as the `gtflp` deployment. Allowing you to monitor

pod logs in a single window. 

![](./img/log.png)

* View Cloudevents : View events that are sent directly to the `gtflp` deployment, or via configured triggers.

![](./img/event.png)

* Inject Cloudevents : Inject events directly into pods, or into brokers within the namespace. 

![](./img/injection.png)

## Prerequisites

### To deploy

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Kubernetes](https://kubernetes.io/)
* [Knative](https://knative.dev/)

### To develop

* [ko](https://github.com/google/ko) 

## How to use it

1. Download the `release.yaml` from the most current [releases](https://github.com/JeffNeff/gtflp/releases/tag/v0.1) 

1. Update line 43 of file `release.yaml` with the correct namespace

1. apply the manifest:

        kubectl -n <namespace> apply -f release.yaml
    
1. After applying the manifest, retreive the url with the following command:

        kubectl -n <namespace> get ksvc

1. It should return something similar to the following:

        NAME         URL                                          LATESTCREATED      LATESTREADY        READY   REASON
        gtflp        https://gtflp.demo.dev.triggermesh.io        gtflp-00002        gtflp-00002        True    
  
1. Open the url in your browser.


Note: The image located at gcr.io/fit-stream-305821/gtflp is kept up to date via Github Actions on each merge with master. If you want to deploy an image that gets regular updates. Use this one. 

## Development
### Frontend

    cd frontend
    yarn install
    yarn start

To build the frontend and update the static files located in `/cmd/gtflp/kodata`.

    make update-static

### Backend
    export CLUSTER_NAME=<cluster-name>
    KO_DATA_PATH=cmd/gtflp/kodata/ go run ./cmd/gtflp
or
    export CLUSTER_NAME=<cluster-name>
    make debug

### Releaseing

Update line 43 of file [gtflp.yaml](./config/gtflp.yaml ) with the correct namespace.

    make release

### Deploying to Kubernetes

    ko -n <ns> apply -f config/

**Note** If you leave the deployment name as `gtflp` then the logs will be hidden from the ui. 
If you want to show logs from the `gtflp` pod, then chagne the name of the deployment to something else. 


## Contributing

Please [open an issue](https://github.com/JeffNeff/gtflp/issues/new) if you have any questions or suggestions!
Or feel free to fork and PR!

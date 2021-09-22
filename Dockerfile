FROM golang:1.16-buster AS builder
ENV CGO_ENABLED 0
WORKDIR /project
COPY . ./
RUN cd /project/cmd/gtflp && go build -o /project/bin/ 

FROM registry.access.redhat.com/ubi8/ubi-minimal
EXPOSE 8080
ENV KO_DATA_PATH /kodata
COPY --from=builder /project/cmd/gtflp/kodata/ ${KO_DATA_PATH}/
COPY --from=builder /project/bin/gtflp /gtflp

ENTRYPOINT ["/gtflp"]


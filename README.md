[![Build Status](https://travis-ci.com/makinwab/microservice-project-udacity.svg?branch=master)](https://travis-ci.com/makinwab/microservice-project-udacity)

**Udacity Microservices Project**

In this repo, there are 4 services with containerization and kubernetes incorporated. 

They are:
- Frontend application
- Backend user service
- Backend feed service
- Reverse Proxy

*Travis CI Screenshot can be found [here](https://github.com/makinwab/microservice-project-udacity/blob/master/travis-ci.com_makinwab_microservice-project-udacity_builds_139042483.png)*

**Getting Started**

1. Clone the github project by running:

```
git clone git@github.com:makinwab/microservice-project-udacity.git
```

2. Update the following configuration files
- [aws-secret.yaml](https://github.com/makinwab/microservice-project-udacity/blob/master/udacity-c3-deployment/k8s/aws-secret.yaml)
- [env-configmap.yaml](https://github.com/makinwab/microservice-project-udacity/blob/master/udacity-c3-deployment/k8s/env-configmap.yaml)
- [env-secret.yml](https://github.com/makinwab/microservice-project-udacity/blob/master/udacity-c3-deployment/k8s/env-secret.yaml)


3. Update your .profile or .bash_profile with the values for the following environment variables
  - POSTGRESS_USERNAME 
  - POSTGRESS_PASSWORD
  - POSTGRESS_DB
  - POSTGRESS_HOST
  - URL=http://localhost:8100
  - AWS_REGION
  - AWS_PROFILE
  - AWS_BUCKET
  - JWT_SECRET
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY

**Running the application**

1. Change working directory to the application e.g. `cd udacity-restapi-feed`

2. Install the dependencies for each project  `npm install` 


****Using docker****

*NB*: The necessary docker images are available on [docker hub](https://hub.docker.com/u/makinwa37) under my profile.

1. Build the docker images

` docker-compose -f udacity-c3-deployment/docker/docker-compose-build.yaml build --parallel`

2. Run the container

`docker-compose up`

Access the frontend in the browser with url http://localhost:8100

Access the API via postman using http://localhost:8080/api/v0


**Using kubernetes**

1. Follow the instructions [here](https://github.com/weaveworks/eksctl) get set up with kubernetes and ensure `kubectl get nodes` works as expected

2. Apply each .yaml configuration file in the [k8s folder](https://github.com/makinwab/microservice-project-udacity/tree/master/udacity-c3-deployment/k8s)
   
`kubectl apply -f aws-secret.yaml`

`kubectl apply -f backend-feed-deployment.yaml`

Do the same for the rest ensuring the secret files are applied first then the backend and front end service and deployments followed by the reverse proxy service and deployment files

3. Start the reverseproxy service 

`kubectl port-forward service/reverseproxy 8080:8080`

4. Start the frontend service 

`kubectl port-forward service/frontend 8100:8100`

Access the frontend in the browser with url http://localhost:8100

Access the API via postman using http://localhost:8080/api/v0


**Scaling the application**

Scaling the app up/down can be done using

`kubectl scale deployment/backend-feed --replicas 1` 
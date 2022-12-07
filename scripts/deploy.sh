docker build -t martstech/invenr-api:latest -t martstech/invenr-api:$SHA -f ./packages/api/Dockerfile ./api

docker push martstech/invenr-api:latest

docker push martstech/invenr-api:$SHA

kubectl apply -f packages/k8s
kubectl set image deployments/api-deployment api=martstech/invenr-api:$SHA
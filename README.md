# Instructions (v1)

1. Create a kubernetes cluster (linode/aws/gcloud/etc)
2. Point a wildcard subdomain at it (single node/round-robin dns/loadbalancer)
3. Copy the kubeconfig into a github secret
4. (Make a read-packages PAT and copy that into a github secret) 
  a. https://github.com/settings/tokens
5. Fork the repo
6. Set the domain (dsx edit repo or github secret?)
7. Push and check
8. Switch to letsencrypt prod for real certs (letsencrypt-staging)
9. Push and check



# Scripts for devops related tasks

# Tutorial notes:
- Make sure user has github packages turned on (https://github.com/<user>?tab=packages)

## K8s dashboard: https://github.com/kubernetes/dashboard
- kl proxy
- chrome: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.

## Redis
- kl port-forward service/redis-master 7000:6379
- redis-cli -p 7000

## Github packages container support beta
- https://docs.github.com/en/free-pro-team@latest/packages/guides/enabling-improved-container-support
- https://docs.github.com/en/free-pro-team@latest/packages/guides/using-github-packages-with-github-actions

## TODO list
- [x] Private packages (with/without PAT)
- [ ] Switch ingress controllers
- [x] Make domain name easier to change
- [ ] Change random sleep to a kubernetes wait command (cert-manager/deploy)
- [ ] Make sure no edits remain in downloaded yamls

- [x] create repository
- [x] github workflows
- [x] build docker images (for static nginx site)
- [-] docker registry k8s yaml (using github registry for now)
- [x] push docker image to private registry
- [ ] run a pod that pulls from private registry
- [x] nginx ingress controller
- [ ] linode load balancer?
- [ ] DNS for *.k8s.zk.io -> loadbalancer
- [x] ingress controller + ingress resources for static site
- [x] let's encrypt ACME controller thing for ssl
- [x] redis rest service as a poc
- [x] k8s dashboard

- [ ] terraform
- [ ] linode terraform provider
- [ ] linode k8s provider


## For later ("the slightly harder way")
- [ ] terraform to spin up empty instances
- [ ] ansible to call kubeadm on instances to create cluster

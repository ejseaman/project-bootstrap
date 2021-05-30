# nginx-ingress controller
## (The one by nginx, not by the k8s community)

docs: https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/

decisions:
1) Install via manifests, copied from their repository into this one.
  (could instead git clone their repo as part of the process)

2) Run as a daemonset (so a copy runs on every single node)
  (could instead run as a deployment. Requires you to create a service using nodeport/loadbalancer)
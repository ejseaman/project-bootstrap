# Cert-manager

## Installation:
(https://cert-manager.io/docs/installation/kubernetes/)
Installation is done via cert-manager-v1.3.0.yml (downloaded from the above link)
This sets up a bunch of custom resource definitions, service accounts, cluster roles, etc. But also a few services/deployments that actually do the job of fetching certificates.

If you're curious you can do a regex search for `^kind:` to jump to all the various things that get set up.

If you want to update the version, download a new yaml file from the link.

## Configuration:
(https://cert-manager.io/docs/configuration/acme/)
The next step is to set up `issuers` that cert-manager will use to actually get the certificates.
We are going to be using let's encrypt to get our certificates and it uses ACME to do the challenge/response that proves you own the domain in question.

There are 2 options: HTTP01 and DNS01.
HTTP01 spins up a little server in the cluster automatically to respond to the challenge
DNS01 needs to actually update your dns records, so it's more tightly coupled to whatever dns provider you're using.

We will use HTTP01. It is probably worth updating this to DNS01 if you're doing something like review apps with many many subdomains so you can just cover it all with one wildcard cert.

Because let's encrypt has some pretty strict rate limiting (50 cert requests per week - https://letsencrypt.org/docs/rate-limits/) it's a VERY good idea to start off with their staging server to iron out any kinks.
You don't want to end up having to wait a week for your limit to reset.

To this end we will set up 2 issuers. One for let's encrypt proper, and one for let's encrypt staging.




apiVersion: apps/v1
kind: Deployment
metadata:
    name: moj-prototype
spec:
    replicas: 1
    selector:
        matchLabels:
            app: prototype
    template:
        metadata:
            labels:
                app: prototype
        spec:
            containers:
              - name: nginx
                image: 754256621582.dkr.ecr.eu-west-2.amazonaws.com/${ECR_NAME}:${IMAGE_TAG}
                env:
                  - name: USERNAME
                    valueFrom:
                        secretKeyRef:
                            name: basic-auth
                            key: username
                  - name: PASSWORD
                    valueFrom:
                        secretKeyRef:
                            name: basic-auth
                            key: password
                ports:
                  - containerPort: 3000

---

apiVersion: v1
kind: Service
metadata:
    name: nginx-service
    labels:
        app: nginx-service
spec:
    ports:
      - port: 3000
        name: http
        targetPort: 3000
    selector:
        app: prototype

---

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: prototype-ingress
    annotations:
        external-dns.alpha.kubernetes.io/set-identifier: prototype-ingress-makerecall-prototype-green
        external-dns.alpha.kubernetes.io/aws-weight: "100"
spec:
    ingressClassName: default
    tls:
      - hosts:
          - ${PROTOTYPE_NAME}.apps.live.cloud-platform.service.justice.gov.uk
    rules:
      - host: ${PROTOTYPE_NAME}.apps.live.cloud-platform.service.justice.gov.uk
        http:
            paths:
              - path: /
                pathType: ImplementationSpecific
                backend:
                    service:
                        name: nginx-service
                        port:
                            number: 3000

---


pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: docker
                image: docker:20.10.8
                command:
                - cat
                tty: true
                volumeMounts:
                - name: docker-socket
                  mountPath: /var/run/docker.sock
              - name: kubectl
                image: bitnami/kubectl:1.23.3
                command:
                - cat
                tty: true
            volumes:
            - name: docker-socket
              hostPath:
                path: /var/run/docker.sock
            '''
        }
    }
    parameters {
        string(name: 'VERSION', defaultValue: 'latest', description: 'Docker image version')
    }
    environment {
        REGISTRY = 'prasoonshrama25'
        IMAGE = 'k8s-deployment-dockerimage'
        TAG = "${params.VERSION}" // Use the version parameter for tagging
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        KUBE_CONFIG = credentials('kubeconfig')
        K8S_NAMESPACE = 'jenkins' // Set your desired namespace here
    }
    stages {
        stage('Build') {
            steps {
                container('docker') {
                    sh "docker build -t ${REGISTRY}/${IMAGE}:${params.VERSION} -f src/Dockerfile ."
                }
            }
        }
        stage('Push') {
            steps {
                container('docker') {
                    script {
                        withDockerRegistry([url: 'https://index.docker.io/v1/', credentialsId: DOCKER_CREDENTIALS_ID]) {
                            sh "docker push ${REGISTRY}/${IMAGE}:${params.VERSION}"
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                container('kubectl') {
                    script {
                        sh '''
                            echo Deploying to Kubernetes...

                            kubectl set image deployment/my-cronjob my-container=${REGISTRY}/${IMAGE}:${VERSION} --namespace=${K8S_NAMESPACE}
                            kubectl rollout status deployment/my-cronjob --namespace=${K8S_NAMESPACE}
                        '''
                    }
                }
            }
        }
    }
}

pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: 'latest', description: 'Docker image version')
    }
    environment {
        REGISTRY = 'prasoonshrama25'
        IMAGE = 'k8s-deployment-dockerimage'
        TAG = "${params.VERSION}" // Use the version parameter for tagging
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        KUBE_CONFIG = credentials('kubeconfig')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Build Docker image with the specified version
                    bat "docker build -t ${REGISTRY}/${IMAGE}:${params.VERSION} -f src/Dockerfile ."
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    // Push Docker image to the registry with the specified tag
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        bat "docker push ${REGISTRY}/${IMAGE}:${params.VERSION}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withKubeConfig([credentialsId: 'kubeconfig']) {
                        bat '''
                            echo Deploying to Kubernetes...

                            :: Set the Kubernetes deployment image
                            kubectl set image deployment/my-cronjob my-container=${REGISTRY}/${IMAGE}:${VERSION} --record

                            :: Rollout the deployment
                            kubectl rollout status deployment/my-cronjob
                        '''
                    }
                }
            }
        }
    }
}

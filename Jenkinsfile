pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: 'latest', description: 'Docker image version')
    }
    environment {
        REGISTRY = 'prasoonshrama25'
        IMAGE = 'k8s-deployment-dockerimage'
        TAG = '0.0.2'
        KUBE_CONFIG = credentials('kubeconfig')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("${REGISTRY}/${IMAGE}:${params.VERSION}", "-f src/Dockerfile .")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    // Push Docker image to the registry with the specified tag
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials-id') {
                        docker.image("${REGISTRY}/${IMAGE}:${params.VERSION}").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh "helm upgrade --install my-cronjob ./helm/my-cronjob --set image.tag=${params.VERSION}"
                }
            }
        }
    }
}

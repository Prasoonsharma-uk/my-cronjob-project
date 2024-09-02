pipeline {
    agent any
    parameters {
        string(name: 'VERSION', defaultValue: 'latest', description: 'Docker image version')
    }
    environment {
        REGISTRY = 'my-docker-registry'
        IMAGE = 'my-cron-job-app'
        KUBE_CONFIG = credentials('kubeconfig')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("${REGISTRY}/${IMAGE}:${params.VERSION}")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.image("${REGISTRY}/${IMAGE}:${params.VERSION}").push()
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

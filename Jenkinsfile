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
        stage('Install Helm') {
            steps {
                script {
                    bat '''
                        echo "Installing Helm..."

                        :: Download Helm installation script
                        curl -fsSL -o get_helm.bat https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

                        :: Make the script executable
                        chmod 700 get_helm.bat

                        :: Run the script to install Helm
                        get_helm.bat

                        :: Clean up the installation script
                        del get_helm.bat

                        :: Verify Helm installation
                        helm version
                    '''
                }
            }
        }
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
                    // Deploy to Kubernetes using Helm
                    withKubeConfig([credentialsId: 'kubeconfig']) {
                        bat "helm upgrade --install my-cronjob ./helm/my-cronjob --set image.tag=${params.VERSION}"
                    }
                }
            }
        }
    }
}

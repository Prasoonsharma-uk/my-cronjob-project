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
                    // Ensure you are in a directory where you can run the commands
                    sh '''
                        echo "Installing Helm..."

                        # Download Helm installation script
                        curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

                        # Make the script executable
                        chmod 700 get_helm.sh

                        # Run the script to install Helm
                        ./get_helm.sh

                        # Clean up the installation script
                        rm get_helm.sh

                        # Verify Helm installation
                        helm version
                    '''
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build Docker image with the specified version
                    docker.build("${REGISTRY}/${IMAGE}:${params.VERSION}", "-f src/Dockerfile .")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    // Push Docker image to the registry with the specified tag
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${REGISTRY}/${IMAGE}:${params.VERSION}").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy to Kubernetes using Helm
                    withKubeConfig([credentialsId: 'kubeconfig']) {
                        sh "helm upgrade --install my-cronjob ./helm/my-cronjob --set image.tag=${params.VERSION}"
                    }
                }
            }
        }
    }
}

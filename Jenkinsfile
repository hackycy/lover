pipeline {
    agent any
    environment {
      ALIYUN_DOCKER_REGISTRY_USERNAME: credentials('ALIYUN_DOCKER_REGISTRY_USERNAME')
      ALIYUN_DOCKER_REGISTRY_PASSWORD: credentials('ALIYUN_DOCKER_REGISTRY_PASSWORD')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
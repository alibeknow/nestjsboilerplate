pipeline {
    agent {
        node {
            label 'nodejs' 
        }
    }
    environment {
        registry = 'registry.k10.kaztoll.kz/kaztoll-enterprise-back'
    }
    stages {
        stage("Build Docker Image kaztoll-enterprise-back") {
            steps {
               script { 
                  dockerImageBuild = docker.build registry + ":latest"
               }
            }
        }
        stage("DEPLOY docker registry") {
            steps {
               sh "docker push registry.k10.kaztoll.kz/kaztoll-enterprise-back"
            }
        }
    }
}

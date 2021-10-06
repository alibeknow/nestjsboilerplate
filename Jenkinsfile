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
        stage("k10_registry kaztoll-enterprise-back image pull&push") {
            steps {
                ansiblePlaybook become: true, credentialsId: 'k10_node02_private_ssh_key', inventory: 'hosts.inv', playbook: 'docker_pull_push.yml'
            }
        }
    }
}

node {
    
    properties([
  pipelineTriggers([
   [$class: 'GenericTrigger',
    genericVariables: [
     [key: 'data', value: '$'],
     [key: 'TEAMS_INCOMING_WEBHOOK', defaultValue: ''],
     [key: 'TIMEZONE', defaultValue: '']
    ],
    token: 'percy_notification',
    tokenCredentialId: '',
    printContributedVariables: true,
    printPostContent: true,
    silentResponse: false
   ]
  ])
 ])

    stage('Pull repository from GitHub') {
        git url: 'https://github.com/abhi2810/percy-webhook-teams-jenkins.git'
    }

    stage('Send Notification') {
        withEnv(['data=' + env.data, 'TEAMS_INCOMING_WEBHOOK=' + env.TEAMS_INCOMING_WEBHOOK, 'TIMEZONE=' + env.TIMEZONE]) {
            echo "Data=${env.data}"
            sh label: 'Execute webhook command', script: 'node index.js'
        }
    }
}

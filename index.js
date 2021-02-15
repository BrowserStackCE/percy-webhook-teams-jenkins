const https = require('https')
var newBuildCard = require('./new_build_card.json')
var approvedCard = require('./approved_card.json')

var percyRequest = JSON.parse(process.env.data)
console.log(JSON.stringify(percyRequest))
var messageConfig = {}
var sendMessageFlag = false
var teamsIncomingWebhook = process.env.TEAMS_INCOMING_WEBHOOK
var timezone = process.env.TIMEZONE
switch (percyRequest.data.attributes.event) {
    case 'build_approved':
        messageConfig = approvedCard;
        var attributes = percyRequest['included'][0]['attributes']
        messageConfig['summary'] = 'Approved Percy Build'
        messageConfig['title'] = `Build #${attributes['build-number']} approved.`
        messageConfig['sections'][0]['activitySubtitle'] = new Date(attributes['approved-at']).toLocaleString("en-US", { timeZone: timezone })
        messageConfig['sections'][0]['activityTitle'] = `${attributes['total-snapshots']} visual changes approved.`
        messageConfig['sections'][0]['facts'][0]['value'] = attributes['branch']
        messageConfig['sections'][0]['facts'][1]['value'] = attributes['pull-request-title']
        messageConfig['potentialAction'][0]['targets'][0]['uri'] = attributes['web-url']
        messageConfig['potentialAction'][1]['targets'][0]['uri'] = attributes['pull-request-html-url']
        sendMessageFlag = true
        break

    case 'build_finished':
        messageConfig = newBuildCard;
        var attributes = percyRequest['included'][0]['attributes']
        messageConfig['summary'] = 'Finished Percy Build'
        messageConfig['title'] = `Build #${attributes['build-number']} finished.`
        messageConfig['sections'][0]['activitySubtitle'] = new Date(attributes['finished-at']).toLocaleString("en-US", { timeZone: timezone })
        messageConfig['sections'][0]['activityTitle'] = `${attributes['total-snapshots']} visual changes need review.`
        messageConfig['sections'][0]['facts'][0]['value'] = attributes['branch']
        messageConfig['sections'][0]['facts'][1]['value'] = attributes['pull-request-title']
        messageConfig['potentialAction'][0]['targets'][0]['uri'] = attributes['web-url']
        messageConfig['potentialAction'][1]['targets'][0]['uri'] = attributes['pull-request-html-url']
        sendMessageFlag = true
        break

    default:
        console.log('Message not configured.')
        break
}

if (sendMessageFlag) {
    const options = {
        hostname: 'abhidashingsinghgmailcom.webhook.office.com',
        path: '/webhookb2/9856d0b9-5a4f-46f7-9329-6cabc9c77de9@85ec472c-93bf-420a-b399-622a6dc9e77a/IncomingWebhook/d228a0821bed4275adba0fb7a4a10e8e/6a586f48-f693-417b-ae30-6215d23646fe',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': messageConfig.length
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(messageConfig)
    req.end()
}
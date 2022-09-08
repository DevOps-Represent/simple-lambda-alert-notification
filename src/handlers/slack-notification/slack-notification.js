const { IncomingWebhook } = require("@slack/webhook");

module.exports.handler = (snsEvent) => {
    const url = process.env.SLACK_WEBHOOK_URL;
    const webhook = new IncomingWebhook(url);

    (async () => {
        await webhook.send({
          blocks: [
            {
              type: "section",
              "text": {
                "type": "mrkdwn",
                "text": "Whoopsie!! Looks like your lambda had an error."
              },
              "accessory": {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click here to see logs"
                },
                "url": "https://console.aws.amazon.com/cloudwatch/home?region=ap-southeast-2#logEventViewer:group=/aws/lambda/simple-project-dev-slack-notifications"
              }
            }
          ]
        });
      })();
};

const core = require("@actions/core");
const Clockwork = require("clockwork");

const clockwork = new Clockwork({
  key: process.env.CLOCKWORK_API_KEY,
});

// Sends SMS
clockwork.sendSms({ To: core.getInput("to"), Content: core.getInput("content") }, function (error, response) {
  if (error) {
    return core.setFailed(error);
  }
});

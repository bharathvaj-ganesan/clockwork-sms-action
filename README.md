# Clockwork SMS Action

<img src="./docs/images/logo.svg" />

Send an SMS from [GitHub Actions](https://github.com/features/actions) using [Clockworksms](https://www.clockworksms.com/).

## Usage

```workflow
name: Push Notification Trigger
on:
  push:
    branches:
      - master
jobs:
  send-sms:
    name: Send SMS
    runs-on: ubuntu-latest
    steps:
    - name: Send SMS
      uses: bharathvaj1995/clockwork-sms-action@master
      env:
        CLOCKWORK_API_KEY: ${{ secrets.CLOCKWORK_API_KEY }}
      with:
        to: 447000000000
        content: "New push on ${{ github.repository }} from ${{ github.actor }}"
```

will send SMS `New push on org-name/repo-name from your_username` to `447000000000`.

## Secrets

This action uses the `CLOCKWORK_API_KEY` from secrets:

### Getting an api key

First, head over to clockwork and signup if you're not already signed up. Once signed up, log in to your clockwork account and add a new API Key (from the top menu choose Sending -> API Keys).

## Event Information

All of the information attached to an event is available in the `github.event` variable. To see the possible values, you can use the following step in your workflow:

```yaml
- run: echo '${{ toJson(github.event) }}'
```

You can use this information in both the inputs for your action and to run the action conditionally.

Here's an example of sending an SMS any time an issue is created with the urgent label:

```workflow
name: Issue Notification
on:
  issues:
    types: [labeled]
jobs:
  send-sms:
    name: Send SMS
    runs-on: ubuntu-latest
    steps:
    - name: Send SMS
      uses: bharathvaj1995/clockwork-sms-action@master
      env:
        CLOCKWORK_API_KEY: ${{ secrets.CLOCKWORK_API_KEY }}
      with:
        to: ${{ secrets.SECRET_NUMBER }}
        content: "This urgent issue needs your attention: ${{ github.event.issue.html_url }}"
      if: github.event.label.name == 'urgent'
```

---
title: npm failed me
date: "2016-04-06T16:42:03.284Z"
---

Last week, we deployed a major update to an application and after a couple days it finally fell on it's face. The server, hosted on AWS, randomly went into a red state and was unreachable from outside requests overnight. The servers were using an older version of Docker and Elastic Beanstalk commands were taking a long time to complete so we initially thought it was in our AWS setup. I know, noob mistake to jump at guessing the issue instead of looking at the logs.

After trying 15 different configurations, we took a look at the logs and noticed npm was throwing some errors. The errors were during the `npm install` and the JSON that was being returned would randomly fail to fully return causing issues when npm tried to parse the JSON. We then noticed that the install npm's version was 1.3 whereas what we were using locally would be v3. We installed v3 and that issue went away, however, we were not very happy.

The server is running Ubuntu 14.0.4 LTS. Normally vendors do a decent job adhering to the LTS standing but doing an `apt-get install -y npm` would install npm 1.3 but that version is not supported anymore. What npm should do is update what is installable in apt. To work around this, we installed Node v5:

```sh
apt-get update
apt-get install -y build-essential curl
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs
```

Now we have Node 5 and npm v3. So thanks npm!

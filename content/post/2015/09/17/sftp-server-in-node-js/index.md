---
title: SFTP server in Node.js
date: "2015-09-17T18:45:03.284Z"
---

I have a project that I want to start working on but first needed to create a quick proof-of-concept (POC) to make sure I can do what I wanted. I was about 99% sure what I want to do is possible, just that 1% is due to never doing it. So the POC was to create a SFTP server that saved public keys in a database like GitHub does. I know you can install an ssh server and use the [`AuthorizedKeysCommand`](http://linux.die.net/man/5/sshd_config) but if possible, I wanted to do everything within [Node.js](https://nodejs.org/en/), not install another server onto my server.

First thing most people do, off to search [npm](https://www.npmjs.com/). I quickly found the [ssh2](https://www.npmjs.com/package/ssh2) module which seemed to have active development still (GitHub repo started in August 2012 and still has commits from a couple days ago). After setting up example server and client scripts, I needed to get a file downloaded from the server. I did have a bit of trouble with this but [mscdex](https://github.com/mscdex) gave me a [boost](https://github.com/mscdex/ssh2/issues/322#issuecomment-140930439), much obliged! So I got a file downloading and even got it to authenticate based on private/public keys reading from my filesystem. Looking at the code, it's async so I knew I could do this by saving it in a MySQL database and it's was extremely easy.

I've setup a simple example GitHub [repo](https://github.com/mitchellsimoens/SFTPServer). The server is `server.js` and a test client script is in `client_test.js`. You'll have to change some configs in both scripts. You'll also need to setup the table I use, this is what I have:

    CREATE TABLE `user_public_keys` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `username` varchar(200) NOT NULL,
      `name` varchar(25) NOT NULL,
      `key` text NOT NULL,
      `added` datetime NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

Once you setup the MySQL connection details in `server.js` you'll be able to read from the table. You'll have to generate an RSA host key, check out `keys/README.md`, it's a simple command but pay attention to where it wants to save the file, I placed it at `keys/host_rsa`.

Not sure what other steps are needed but that should be it. Some configs in `server.js` and `client_test.js`, MySQL table, host key and of course the `npm install` command to install module dependencies. Should be able to start the server (`node server`) and then try the client script (`node client_test`) and it should download the file. The server will remain up and you should see some logs that show the OPEN, FSTAT, READ and CLOSE steps.

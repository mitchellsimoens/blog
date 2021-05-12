---
title: JsonP Explanation
date: "2013-12-07T16:33:03.284Z"
---

Talking to a lot of people, I get the sense that there are quite a lot of people who don't actually understand what JsonP is and how it works. In this blog post, I hope to provide some explanation behind JsonP as it's truly a very simple concept.

## Why would someone want to use JsonP?

JsonP is a means of transporting data from a client to a server across origins (different domains or ports). You can accomplish the same with an Xhr request and some headers from your server (I enjoy this site for help with CORS: <a href="http://enable-cors.org/" target="_blank">enable-cors.org</a>) but I've talked to many system admins and they don't like adding the headers. With JsonP, you do not need to have any additional server setup, you can handle it in your endpoint (using PHP, Java or whatever language you are using). I personally like enabling CORS on my server as you can specify what origins to accept cross origin requests from where JsonP doesn't have this security. Well, that's not entirely true, your server side language can check where the request came from. And to be 100% honest, you don't need a server admin to add a header to the server as a server side language can usually return a header (like the header() function in PHP) but I find that a bit awkward.

## In a nut shell, what is JsonP?

Like I said in the second sentence of this blog, JsonP is truly a very simple concept. It has 2 parts, a Javascript function used as a callback that you define on the client and a &#60;script&#60; element you have in your HTML page. The &#60;script&#62; element will handle the transport of data and the callback function handles the data when it has been loaded. That's it. In fact here is an example:

```html
<html>
    <head>
        <script type="text/javascript">
            window.MyCallback = function(data) {
                //handle the data returned here
            };
        </script>
        <script type="text/javascript" src="http://mydomain.com:8080/data.php?callback=MyCallback"></script>
    </head>
    <body></body>
</html>
```

Like I said, we have a Javascript function that is used as a callback, I've named mine MyCallback and you have a &#60;script&#62; element that does the actual loading. Pretty simple right? There is no smoke and mirrors, there is no Xhr request going on that you need to set up.

## So this is how Ext JS' Ext.data.JsonP works?

It's exactly how Ext.data.JsonP works. If you execute this code in Ext JS:

```js
Ext.data.JsonP.request({
    url : 'http://mydomain.com:8080/data.php'
});
```

All it's doing is creating the callback function (which it will append to the url you provided so no need to worry about that) and inserting that &#60;script&#62; into the &#60;head&#62; of your HTML document. It does other things like enables a timeout, keeps track of the requests, executes a success/failure function you can provide to the request method and cleans up the &#60;script&#62; after loading.

## How do I handle this on the server?

Like I said, this request no server setup, it's all handled in your server side language of choice. The request will have a callback request parameter and it's value should wrap your "Json" data which actually will execute the Javascript callback function that is supposed to be created in the client app. Let's use my first code that we used when describing JsonP in a nutshell. It's sending the callback parameter with a value of MyCallback so our "Json" needs to be wrapped in MyCallback so that we execute the MyCallback function. Here is an example of the response:

```js
MyCallback({
    "foo": "bar"
});
```

Looks exactly like Javascript doesn't it? That's because it is Javascript. Remember, the &#60;script&#62; does the loading which will expect Javascript. It's just like if you were loading a somefile.js with a &#60;script&#62; only it's Javascript returned from a server side language instead of some file on your server.

My server side language of choice is PHP. Here is a sample PHP script that would support JsonP:

```php
<?php

$isJsonP = isset($_REQUEST['callback']);
$data    = array('foo' => 'bar');

if ($isJsonP) {
    echo $_REQUEST['callback'] . '(';
}

echo json_encode($data);

if ($isJsonP) {
    echo ');';
}
?>
```

In this code, if there is a callback parameter the $isJsonP variable will be true which will wrap the json that is echoed out with the callback function and the needed parentheses. This will echo out the example JsonP response from above.

## Let's summarize this up

JsonP is a means of transporting data across different origins. All JsonP is is a Javascript function and a &#60;script&#62; element which makes JsonP compliant with any browser that can load Javascript files with absolutely zero setup.

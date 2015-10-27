##Back-end of A2Empowerment Auto Banking System

###How to deploy

1. `npm install` to install all dependencies

2. For unit testing, do `npm install -g mocha`, at the back-end folder level, just do `mocha` and the tests will run.

3. When deploying on Digital Ocean server, please remember to cd into /bin and ` NODE_ENV=test pm2 start www `. This way
we will not consume any public bandwidth.

I have stress tested and currently the performance should be stable. You can also find test cases in /test written in
chai-as-promised, a great language to learn. I also did some environment setting that way we don't have to manually switch
between localhost and IP in different environments.
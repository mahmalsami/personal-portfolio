# Personal portfolio

01. <a href="#readme">Readme</a>
02. <a href="#dependencies">Dependencies</a>
03. <a href="#quick-start">Quick Start</a>
04. <a href="#windows-user">Windows Users note</a>
05. <a href="#contributing">Contributing</a>
06. <a href="#vendors">Vendors</a>
07. <a href="#resolution">Resolution</a>

<h2 id="readme">Readme</h2>
Read the [Made Bootstrap readme](https://github.digitas.fr/html/docs/blob/master/globals/CONTRIBUTING.md) file.

<h2 id="dependencies">Dependencies</h2>

```bash
sudo npm i -g grunt-cli bower nodemon
```

<h2 id="quick-start">Quick Start</h2>

```bash
npm install && bower install
grunt start # grunts + runs the server + watches server files + watches assets files exluding vendors and media
```

<h2 id="windows-user">!Windows Users note</h2>

If you want to run "imagemin" on your project from windows:
- Download jpegtran.exe from [jpegclub.org](http://jpegclub.org/jpegtran/)
- Copy it to node-modules/grunt-contrib-imagemin/node_modules/jpegtran-bin/vendor

<h2 id="contributing">Contributing</h2>

- Read the project's [contribution guidelines](https://github.digitas.fr/html/docs/blob/master/globals/CONTRIBUTING.md)
- Read our front-end [code standards](https://github.digitas.fr/html/code-standards)

<h2 id="vendors">Vendors</h2>
Know which tools are available to you, check out the forked vendors in `app/assets/vendor`

<h2 id="resolution">Resolution</h2>
The Website's width must fit within `1024px`

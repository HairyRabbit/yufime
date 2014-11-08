ember-cli是用来构建emberjs项目的工具，他是基于之前的一个项目EAK (ember app kit)开发而成。那么问题来了，ember-cli 具体能做些什么事呢？

这片文章内所用到的IDE是Sublime Text 3，操作系统为Windows 8.1，浏览器使用的是Mozilla Firefox 33.0.2，并且假设你对emberjs的基础有一定的了解。

ember-cli 简介
---------------
总的来说，使用ember-cli开发ember项目可以大大简化开发过程，不必再写那些麻烦的继承对象，也不用再新建一堆js文件，这些ember-cli都替你实现，你只需要熟悉一些shell命令就可以了，比如说：

使用ember-cli可以快速生成新项目：

`$ ember new someapp`

![new](img\ember-cli_intro\new.png)

使用ember-cli可以使预览自动化：（修改代码之后自动更改）

`$ ember serve`

![serve](img\ember-cli_intro\serve.png)

使用 ember-cli 可是自动创建模板，不需要再自己写繁琐的 
*var obj = Ember.object.extend()* ：

`$ ember generate route index`

![generate](img\ember-cli_intro\generate.png)

使用ember-cli可以使单元测试自动化：

`$ ember test`

![test](img\ember-cli_intro\test.png)

使用ember-cli可以方便打包发布代码：

`$ ember build`

![build](img\ember-cli_intro\build.png)

安装 ember-cli
----------------
ember-cli工具的安装是通过npm包管理器去安装的，所以在之前我们首先要安装node环境和npm包管理器。本文假设你已经安装了node和npm，并且node的版本为0.10.X。（如果想熟悉nodejs和npm，那就期待我以后的文章吧^ ^）

接下来就是安装ember-cli的命令：

`$ npm install -g --save-dev ember-cli`

-g表示全局安装，--save-dev表示最新发布版本。由于ember-cli是通过bower来管理js库的，所以还要安装bower：

`$ npm install -g --save-dev bower`

**注意：如果你已经在全局安装了bower，那可以省略这些。**

同样把bower安装在全局方便使用。这两个命令可以写在一起：

`$ npm install -g --save-dev ember-cli bower`

安装之后可以查看ember-cli工具的版本号：

`$ ember version`

![version](img\ember-cli_intro\version.png)

可以看到当前版本是0.1.2(2014-10-31)。使用help可以查看帮助：

`$ ember help`

![help](img\ember-cli_intro\help.png)

使用 ember new 创建新项目
--------------
就像之前介绍中提到的，可以使用**ember new**来创建新的项目：

![new](img\ember-cli_intro\new.png)

这个命令会自动执行下面俩条命令安装依赖：

`$ npm install`

`$ bower install`

**注意：如果命令没有成功执行，可能是有一些依赖挂在google服务器造成的，由于国内把google的服务器墙掉了，所以你可能需要一个翻墙软件或挂vpn**

执行命令之后我们生成了一些目录和文件，这就是ember的工作目录：

![lists](img\ember-cli_intro\lists.png)

app目录：这个目录是我们存放代码的地方；

config目录：里面有一个文件environment.js，他是用来对存放一些ember变量；

public目录：这个目录存放一些常用的配置文件，比如robots.txt；

tests目录：这个目录存放单元测试js文件；

vendor目录：这个目录用来放你自己的文件，比如图片和字体；

dist目录：这个目录是用来存放broccoli生成好的文件；

tmp目录：他用来存放broccoli生成的临时文件；

node_modules目录：存放npm安装的依赖；

bower_components目录：存放bower安装的依赖；

bower.json, package.json：这俩个文件是npm和bower安装依赖所需的文件；

Brocfile.js：用来配置broccoli， 这个文件相当于Grunt的Gruntfile.js，后边会详细说；

.ember-cli：看名字就知道是用来配置ember-cli的，默认情况下我们并不需要修改他； 

.bowerrc：用来配置bower的文件，默认不需要修改，否则broccoli会找不到之前通过bower安装的依赖；

剩下的一些文件是我们常用到的一些配置，想了解功能的话可以在下边留言。

其中比较重要的就是app目录和Brocfile.js文件，因为这俩个文件我们修改的最多。

**注意：使用ember new会生成一个新文件夹，如果想在一个已有的文件夹里面构建项目可以使用ember init这个命令**

使用 ember serve 启动项目
-------------
启动项目时使用ember serve命令：

`$ ember serve`

![serve](img\ember-cli_intro\serve.png)

就像图中所示，项目会默认使用 localhost 本机启动，端口是 4200 。如果不想使用默认的地址和端口，可以在启动时指定：

`$ ember serve --port=8088`

其他选项可以使用 ember help 来查看。

我们在浏览器中输入 http://localhost:4200/ ，可以看到我们的项目成功启动了，同时在页面中可以看到Welcome to Ember.js：

![welcome](img\ember-cli_intro\welcome.png)

我们查看网页的源代码：

里面只有很少的东西，并没有看到Welcome to Ember.js这些字样也没有看到熟悉的Ember.Application.create()，那这些东西在哪里放着呢？回想一下ember中的模板，显然，Welcome to Ember.js应该放在一对script标签中，类似这个样子：
	
	<script type="text/x-handlebars">
	  Welcome to Ember.js
	  {{outlet}}
	</script>

搜索一下我们发现了Welcome to Ember.js的所在，他在someapp.js里面，同时被处理成了字符串。所以说项目启动时broccoli会将所有模板内的内容变成字符串。

那么这个模板放在哪里呢？我们在app/templates中看到了application.hbs文件，打开之后我们看到了：

	<h2 id='title'>Welcome to Ember.js</h2>
	{{outlet}}

在修改保存之后，我们看到shell中的变化：

![servechange](img\ember-cli_intro\servechange.png)

同时我们看到浏览器中也相应产生了变化。这个功能是用websocket支持的，所以在开发过程尽量选用支持websocket的浏览器，比如firefox、chrome，ie8不支持websocket所以会报错，但这并不是说ember不支持ie8。

这个过程中broccoli会自动的组合编译文件，所以你会看到tmp文件夹中的变化，最后如果生成成功，shell中会显示绿色的

`$ Build successful - 8077ms. `

并且会显示一个简单的表格说明每个任务用时多少，由于broccoli的使用超过本文讨论的范围，所以只是简单说明一下（参考我介绍broccoli和grunt的文章）。

值得一提的是，你的每个文件变化保存之后都会使broccoli重新编译合并文件，比如增（added）删（deleted）改（changed）了一个文件之后，所以每次Ctrl+S之后都会看到shell中的变化。

使用 ember generate 快速开发项目
--------------
现在就做一个简单的列表展示来说明ember-cli generate的强大功能。
我们知道ember会自动创建一个路由，那就是index，对应的路径是根目录/。现在我们使用generate来新建一个index模板，在shell中输入：

`$ ember generate template index`

![templateindex](img\ember-cli_intro\templateindex.png)

**注意：并不需要在执行ember serve那个shell中执行这条命令，这样会先关掉服务之后还要再启动。可以新打开一个shell执行他**

我们看到提示说创建了一个文件在app/templates/index.hbs，找到并打开它。里面是空的，我们加些东西进去：

![templateindexcontent](img\ember-cli_intro\templateindexcontent.png)	

保存片刻之后，我们看到浏览器有了我们刚刚输入的表格：

![ffindex](img\ember-cli_intro\ffindex.png)	

现在我们新建一个用户的模型，名称是user：

`$ ember generate model user`

**注意：ember中模型的单数复数关系，这里定义模型应该用单数user，不是users**

![modeluser](img\ember-cli_intro\modeluser.png)	

可以看到，除了新生成的文件还创建了一个文件在tests文件夹下，这个文件是编写单元测试用的。

在app/models文件夹中找他，我们看到：

	import DS from 'ember-data';

	export default DS.Model.extend({
		
	});

如果熟悉node或者requireJS的同学应该了解一些，import和export是ES6的模块管理。但是现在ES6 harmony还没有正式被浏览器所支持，所以broccoli会将他转换成AMD方式，也就是用requireJS实现模块管理，那么每个文件都将是一个独立模块。因为定义模型用到了ember-data，所以我们看到首先将ember-data导入了进来。下面我们把字段添上：

	import DS from 'ember-data';

	export default DS.Model.extend({
	  name: DS.attr('string'),
	  sex: DS.attr('number'),
	  age: DS.attr('number')
	});

确认之后我们要在路由中使用这个模型，下面我们新生成一个index的route：

`$ ember generate route index`

![routeindex](img\ember-cli_intro\routeindex.png)

这里他会询问你是否要重写index.hbs模板，因为这个我们已经之前修改好了，所以现在输入n，表示否。

**注意：如果这里选择y，他会重写这个模板。这通常是已经存在同样名称的模板造成的，如果我们之前没有index.hbs这个文件，那么生成路由的时候会在templates下自动创建一个同名的模板。**

所以创建路由的时候会新创建3个文件，同时如果路由名称不是index的话还会自动修改router.js文件。

我们在app/routes中找到他，把model钩子填好：

	import Ember from 'ember';

	export default Ember.Route.extend({
	  model: function() {
	    return this.store.find('user');
	  }
	});

保存之后我们看到浏览器中报错了：

![routeerror](img\ember-cli_intro\routeerror.png)

这里向服务器/users请求数据却报了404的错，当然，我们还没有写这部分逻辑。下面我们添加一个server：

`$ ember generate http-mock users`

**注意：这个api换过很多次了，之前使用的是api-stub。**

![mockusers](img\ember-cli_intro\mockusers.png)

我们在server/mocks找到他，在这里我们先手写几条静态数据：

	var users = [
	  {
	    "id": 1,
	    "name": "小明",
	    "sex": 0,
	    "age": 22
	  },
	  {
	    "id": 2,
	    "name": "小红",
	    "sex": 1,
	    "age": 18
	  },
	  {
	    "id": 3,
	    "name": "小白",
	    "sex": 0,
	    "age": 60
	  }
	]

	module.exports = function(app) {
	  var express = require('express');
	  var usersRouter = express.Router();
	  usersRouter.get('/', function(req, res) {
	    res.send({ "users": users });
	  });
	  app.use('/api/users', usersRouter);
	};

这个服务器框架使用的是express，版本号为4.x。这里我们需要重新启动项目了。Ctrl+C之后再重新用ember serve启动。

**注意：修改除app外的文件都需要重新启动项目。**

这里我们看到还是在报错，为什么呢？我们查看server/mocks/users.js后发现了这一行：

`app.use('/api/users', usersRouter);`

原来这个地址并不是/users，而是/api/users，所以还是没找到资源。虽然这里可以简单的通过把/api/删掉来解决问题，但我并不想这么做。在ember中可以指定服务器api的根目录，这里我们新建一个adapter来解决这个问题：

`$ ember generate adapter application`

ApplicationAdapter相当于全局adapter，这里我们看到在app/中新生成一个文件夹。我们在app/adapters中找到刚才新建的文件做以下修改：

	import DS from 'ember-data';

	export default DS.RESTAdapter.extend({
	  namespace: 'api'
	});

保存之后看到浏览器中不再报错了。接下来应该修改一下index.hbs模板，把表格里边的数据替换成模型中的：

	<table>
	  <thead>
	    <tr>
	      <th>姓名</th>
	      <th>性别</th>
	      <th>年龄</th>
	    </tr>
	  </thead>
	  <tbody>
	    {{#each model}}
	    <tr>
	      <td>{{name}}</td>
	      <td>{{sex}}</td>
	      <td>{{age}}</td>
	    </tr>
	    {{/each}}
	  </tbody>
	</table>

报错之后我们看到浏览器中已经替换成功了。但是年龄这里并不是我们想要显示的结果，所以我们需要一个helper：

`$ ember generate helper sex-fmt`

在app/helpers里面找到他，我们发现这里的内容和以往的有些不同，不过不用在意这些细节。我们修改一下这个方法：

	import Ember from 'ember';

	export function sexFmt(input) {
	  return input ? "女" : "男";
	};

	export default Ember.Handlebars.makeBoundHelper(sexFmt);

同时我们把刚才的helper应用在index.hbs中：

	{{#each model}}
	<tr>
	  <td>{{name}}</td>
	  <td>{{sex-fmt sex}}</td>
	  <td>{{age}}</td>
	</tr>
	{{/each}}

可以在浏览器中看到性别已经变成我们想要的了。

以上的简单例子就是使用ember generate的最常用的一些，但ember generate可远远不止这些功能，在shell中键入下面命令来查看关于generate的更多帮助：

`$ ember help generate`

下面有一些是在使用过程中可能会遇到的问题：

有些命令在使用的时候有可选参数，比如控制器：

`$ ember generate controller index --type=object`

这样会生成一个ObjectController, 可选的值还有array、base

生成mixin的时候要注意，编写完成之后并不能直接使用，需要用import导入，比如：

`$ ember generate mixin alert`

生成mixin之后，想在某处中使用，需要下面这样去导入：

`import mixinAlert from '../mixins/alert';`

视图生成之后如果要使用，需要注意路径问题：

`ember generate view some/someview`

在项目中使用：

`{{view 'some/someview'}}`

使用 bower broccoli 添加依赖
--------------
刚才的表格看起来是不是太丑了，我想使用bootstrap去美化一下应该怎么样做呢？

首先我们应该使用bower安装bootstrap，在shell中输入：

`$ bower install --save bootstrap`

完成之后bootstrap安装在了bower_components文件夹下面，接下来我们需要导入bootstrap的依赖。

我们知道预览的时候项目broccoli已经打包好了，现在要做的就是让broccoli把bootstrap也一并打包在样式表文件里。打开Brocfile.js在里边加入一句话：

`app.import('bower_components/bootstrap/dist/css/bootstrap.min.css')`

添加之后需要重新启动项目，同时把index.hbs里面给table加好样式：

`<table class="table">`

保存之后浏览器里应该已经看到了效果。

使用app.import可以导入很多东西，比如css、js、图片、字体等等，还可以在导入的同时指定路径：

`app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', { destDir: '/fonts' })`

这样等待broccoli编译完成之后可以在dist/文件中看到glyphicons-halflings-regular.ttf被放在了fonts/下面

但是我们知道像字体这种东西是有很多个，比如bootstrap的字体有4个格式：

* glyphicons-halflings-regular.eot
* glyphicons-halflings-regular.svg
* glyphicons-halflings-regular.ttf
* glyphicons-halflings-regular.woff

通常需要全部导入，写4条app.import是不是太麻烦了。这时我们需要借助一个broccoli插件：

`npm install --save-dev broccoli-static-compiler`

安装完成之后我们在Brocfile.js中使用它：

`var pickFiles = require('broccoli-static-compiler');`

这样我们把4个字体文件一并打包：

	var bootstrapFonts = pickFiles('bower_components/bootstrap/dist/fonts', {
	  srcDir: '/',
	  destDir: '/fonts',
	});

	module.exports = app.toTree(bootstrapFonts);

完成之后重启项目，发现dist/fonts文件夹下导入了我们需要的字体文件。那么问题来了，我还需要导入一个图片文件夹要怎么做呢，显然之前的方法只能解决一个文件夹的问题。这时我们还需要安装一个broccoli插件：

`npm install --save-dev broccoli-merge-trees`

完成之后我们修改Brocfile.js：

	var pickFiles = require('broccoli-static-compiler');
	var mergeTrees = require('broccoli-merge-trees');

	var imgs = pickFiles('vendor/img', {
	  srcDir: '/',
	  files: [**/*.png],
	  destDir: '/img',
	});

	var bootstrapFonts = pickFiles('bower_components/bootstrap/dist/fonts', {
	  srcDir: '/',
	  destDir: '/fonts',
	});

	var tree = [bootstrapFonts, imgs];

	module.exports = app.toTree(mergeTrees(tree));

重启项目后发现需要的东西都按照要求导入到指定位置。

使用 npm 安装插件
-------------
有些时候习惯用预编译器（sass less coffeescript）的同学一定希望ember-cli支持这些预编译器，那显然是没有问题。

下面列举的是一些常用预编译器的安装：

css篇：

sass：

`$ npm install --save-dev broccoli-sass`

less：

`$ npm install --save-dev ember-cli-less`

Compass：

`$ npm install --save-dev ember-cli-compass-compiler`

Stylus：

`$ npm install --save-dev ember-cli-stylus`

安装之后需要你修改app/styles中对应的文件，比如你安装了sass，那应该把app/styles/app.css修改成app/styles/app.scss，剩下的类似，否则在项目启动的时候会报错，提示你找不到指定文件。

js篇：

CoffeeScript：

`$ npm install --save-dev ember-cli-coffeescript`

EmberScript：

`$ npm install --save-dev broccoli-ember-script`

安装之后要求你修改所有的app文件夹下所有的js文件，都要改成对应的格式。安装之后ember-cli生成的不再是js文件，而是对应的模板文件，比如index.coffee

html篇：

Emblem：

`$ npm install --save-dev broccoli-emblem-compiler`

同样要求你修改对应的hbs文件。

使用 ember build 发布项目
-----------------
项目在做好只好要求重新整理发布，这时就要用到ember build这个命令：

`$ ember build`

成功之后会在shell提示打包成功，导出到dist/文件夹中

`$ Build project successfully. Stored in "dist/"`

打开dist/文件夹看到导出的index.html和assets/文件夹就是我们需要的文件。

那么问题来了，把这些放在我们的项目中可以直接使用么？答案是不能……

拿tomcat举例，把index.html和assets/中的东西拖到tomcat中，如果tomcat不是以根目录启动的，那么浏览器中会报错说地址错了。这时需要找到config/environment.js。打开后看到：

	var ENV = {
	  modulePrefix: 'someapp',
	  environment: environment,
	  baseURL: '/',
	  locationType: 'auto',
	  EmberENV: {
	    FEATURES: {
		  // Here you can enable experimental features on an ember canary build
		  // e.g. 'with-controller': true
	    }
	  },
	  APP: {
	    // Here you can pass flags/options to your application instance
	    // when it is created
	  }
	};

这里的baseURL应该改成tomcat里项目的根目录，比如localhost:8080/aaa，就应该把baseURL也改成/aaa

有些时候会出现一个问题，主页打开没问题，其他页面如果把url复制后直接在地址栏打开会报404的错误，但是在开发ember项目的时候就不会，这是怎么回事呢？

原因是如果直接访问url实际上访问的是服务器配置的url地址，但是往往项目只配了跟目录'/'，所以访问除'/'以外的地址就会报404说未找到。但是我们实际上想访问的是由ember跳转的地址。我们知道router有个location属性是用来配置url显示方式的，他有4个值：hash（默认）、history、auto、none。我们项目中是怎么写的呢，打开app/router.js我们看到：

	import config from './config/environment';

	var Router = Ember.Router.extend({
	  location: config.locationType
	});

这里的location放在了config/environment中。在config/environment.js中我们看到他的值是auto，那需要把这里改成hash。重新发布之后上面的问题解决了。

那么问题又来了，如果我们的ember项目还要继续开发，还需要来回修改这两个值么？

显然是不用的。我们发现config/environment.js下面有一些if条件判断，那么只要把我们需要的配置写在产品模式下面就可以了：

	if (environment === 'production') {
	  ENV["baseURL"] = "/aaa";
	  ENV["locationType"] = "hash";
	}

在使用ember help查看帮助之后我们看到ember build有好多参数，所以要把这个参数加上：

`$ ember build --environment=production`

这样就按照产品模式发布了。

提高 broccoli 效率
----------------
拿Sublime Text 3为例，在开发过程中我们发现tmp文件夹中的内容在不停的替换，同时cpu一路飘红。这说明st3在来回切换tmp中的内容很消耗资源，所以我们要让st3忽略tmp文件夹中的文件，打开设置Preferences -> Settings - User，在这个json中加入下面的东西：

`"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS", "tmp/*"]`

这样就忽略tmp中的所有内容。


Summary
---------------
这个简单的教程就这样完结了，ember-cli东西还有很多，甚至还有专门的ember-cli插件。之后我会专门开文章讨论这些东东。

最后祝大家在ember的旅途中玩的开心。^ ^